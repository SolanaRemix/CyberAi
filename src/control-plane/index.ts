/**
 * GOD-SWARM ULTRA — Control Plane
 * Central orchestration and lifecycle management
 */

import { SwarmEngine } from '../swarm/engine.js';
import { AgentRegistry } from '../agents/registry.js';
import type { Workflow, WorkflowRun, Task, Runner } from '../swarm/types.js';
import { Role, type RoleType } from '../security/roles.js';
import { hasPermission, type Action } from '../security/permissions.js';

export interface ControlPlaneConfig {
  maxActiveWorkflows: number;
  taskTimeoutMs: number;
  heartbeatIntervalMs: number;
  enableTelemetry: boolean;
}

const DEFAULT_CONFIG: ControlPlaneConfig = {
  maxActiveWorkflows: 50,
  taskTimeoutMs: 300000,
  heartbeatIntervalMs: 30000,
  enableTelemetry: true,
};

export interface TelemetrySnapshot {
  timestamp: Date;
  activeWorkflows: number;
  queuedTasks: number;
  runningTasks: number;
  failedTasks: number;
  availableRunners: number;
  registeredAgents: number;
  systemHealthScore: number; // 0-100
}

export class ControlPlane {
  readonly config: ControlPlaneConfig;
  private engine: SwarmEngine;
  private agentRegistry: AgentRegistry;
  private telemetryHistory: TelemetrySnapshot[] = [];

  constructor(
    config: Partial<ControlPlaneConfig> = {},
    engine?: SwarmEngine,
    agentRegistry?: AgentRegistry
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.engine = engine ?? new SwarmEngine();
    this.agentRegistry = agentRegistry ?? new AgentRegistry();

    // Register all agents from the registry with the engine
    for (const agent of this.agentRegistry.listAll()) {
      this.engine.registerAgent(agent.info);
    }
  }

  get swarmEngine(): SwarmEngine {
    return this.engine;
  }

  get registry(): AgentRegistry {
    return this.agentRegistry;
  }

  // ─── Workflow Lifecycle ────────────────────────────────────────────────────

  async submitWorkflow(workflow: Workflow, triggeredBy?: string): Promise<WorkflowRun> {
    const activeRuns = this.engine.listWorkflowRuns().filter(r => r.status === 'running');

    if (activeRuns.length >= this.config.maxActiveWorkflows) {
      throw new Error(`Max concurrent workflows (${this.config.maxActiveWorkflows}) reached`);
    }

    this.engine.registerWorkflow(workflow);
    return this.engine.startWorkflow(workflow.id, triggeredBy);
  }

  async processNaturalLanguageGoal(goal: string, userId?: string): Promise<WorkflowRun> {
    const activeRuns = this.engine.listWorkflowRuns().filter(r => r.status === 'running');

    if (activeRuns.length >= this.config.maxActiveWorkflows) {
      throw new Error(`Max concurrent workflows (${this.config.maxActiveWorkflows}) reached`);
    }

    return this.engine.processGoal(goal, userId);
  }

  // ─── Task Scheduling ──────────────────────────────────────────────────────

  getNextReadyTasks(runId: string): Task[] {
    const run = this.engine.getWorkflowRun(runId);
    if (!run?.taskGraph) return [];
    return this.engine.taskGraphGenerator.getReadyTasks(run.taskGraph);
  }

  scheduleTask(task: Task): void {
    const runner = this.engine.getAvailableRunner();
    if (!runner) {
      throw new Error('No available runners for task scheduling');
    }

    // Assign task to runner
    this.engine.updateTaskStatus(task.id, 'queued');

    // In a real system, this would dispatch to the runner over the network
  }

  // ─── Runner Lifecycle ─────────────────────────────────────────────────────

  registerRunner(runner: Runner): void {
    this.engine.registerRunner(runner);
  }

  heartbeat(runnerId: string): void {
    const runner = this.engine.getRunner(runnerId);
    if (runner) {
      runner.lastHeartbeat = new Date();
    }
  }

  detectOfflineRunners(): Runner[] {
    const now = Date.now();
    const timeout = this.config.heartbeatIntervalMs * 3; // 3 missed heartbeats

    return this.engine.listRunners().filter(r => {
      const lastBeat = new Date(r.lastHeartbeat).getTime();
      return now - lastBeat > timeout;
    });
  }

  // ─── Permissions ──────────────────────────────────────────────────────────

  /**
   * Check if a swarm-specific action is permitted for a given role.
   * Delegates to the canonical CyberAi RBAC system (`hasPermission` from
   * `src/security/permissions.ts`), mapping swarm actions to the canonical
   * `Action` type so that permission decisions stay consistent across the
   * codebase and are governed by `src/security/role-permissions.json`.
   *
   * Swarm → canonical action mapping:
   *  - submit-workflow  → manage:workflows
   *  - manage-agents    → admin:all
   *  - view-telemetry   → view:logs
   *  - admin            → admin:all
   */
  checkPermission(
    role: RoleType,
    action: 'submit-workflow' | 'manage-agents' | 'view-telemetry' | 'admin'
  ): boolean {
    const actionMap: Record<typeof action, Action> = {
      'submit-workflow': 'manage:workflows',
      'manage-agents': 'admin:all',
      'view-telemetry': 'view:logs',
      admin: 'admin:all',
    };

    const roleMap: Record<RoleType, Role> = {
      admin: Role.Admin,
      operator: Role.Operator,
      user: Role.User,
      guest: Role.Guest,
    };

    return hasPermission(roleMap[role], actionMap[action]);
  }

  // ─── Telemetry ────────────────────────────────────────────────────────────

  collectTelemetry(): TelemetrySnapshot {
    const metrics = this.engine.getMetrics();
    const snapshot: TelemetrySnapshot = {
      timestamp: new Date(),
      activeWorkflows: metrics['activeWorkflowRuns'] ?? 0,
      queuedTasks:
        (metrics['totalTasks'] ?? 0) -
        (metrics['completedTasks'] ?? 0) -
        (metrics['failedTasks'] ?? 0),
      runningTasks: 0,
      failedTasks: metrics['failedTasks'] ?? 0,
      availableRunners: metrics['availableRunners'] ?? 0,
      registeredAgents: metrics['totalAgents'] ?? 0,
      systemHealthScore: this.calculateHealthScore(metrics),
    };

    if (this.config.enableTelemetry) {
      this.telemetryHistory.push(snapshot);
      // Keep last 1000 snapshots
      if (this.telemetryHistory.length > 1000) {
        this.telemetryHistory.shift();
      }
    }

    return snapshot;
  }

  getTelemetryHistory(): TelemetrySnapshot[] {
    return [...this.telemetryHistory];
  }

  private calculateHealthScore(metrics: Record<string, number>): number {
    let score = 100;

    // Deduct for failed tasks
    const totalTasks = metrics['totalTasks'] ?? 0;
    const failedTasks = metrics['failedTasks'] ?? 0;
    if (totalTasks > 0) {
      const failRate = failedTasks / totalTasks;
      score -= failRate * 40;
    }

    // Deduct for no available runners
    if ((metrics['totalRunners'] ?? 0) > 0 && (metrics['availableRunners'] ?? 0) === 0) {
      score -= 20;
    }

    // Deduct for no active agents
    if ((metrics['totalAgents'] ?? 0) === 0) {
      score -= 30;
    }

    return Math.max(0, Math.round(score));
  }

  // ─── Intent Parsing ───────────────────────────────────────────────────────

  parseIntent(userInput: string): {
    intent: 'run-workflow' | 'create-agent' | 'check-status' | 'query' | 'unknown';
    confidence: number;
    parameters: Record<string, unknown>;
  } {
    const lower = userInput.toLowerCase();

    if (/run|execute|start|trigger|deploy/.test(lower)) {
      return { intent: 'run-workflow', confidence: 0.9, parameters: { goal: userInput } };
    }
    if (/create|build|make|add|register/.test(lower) && /agent|bot/.test(lower)) {
      return { intent: 'create-agent', confidence: 0.85, parameters: { spec: userInput } };
    }
    if (/status|how is|health|metrics|running/.test(lower)) {
      return { intent: 'check-status', confidence: 0.9, parameters: {} };
    }
    if (/what|how|explain|list|show/.test(lower)) {
      return { intent: 'query', confidence: 0.8, parameters: { query: userInput } };
    }

    return { intent: 'unknown', confidence: 0.3, parameters: {} };
  }
}
