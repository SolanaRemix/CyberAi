/**
 * GOD-SWARM ULTRA — Swarm Engine
 * Central orchestration hub: ties together planner, router, task graph, and intelligence
 */

import { randomUUID } from 'crypto';
import { SwarmPlanner } from './planner.js';
import { ModelRouter } from './model-router.js';
import { TaskGraphGenerator } from './task-graph.js';
import { SwarmIntelligenceEngine, SelfImprovementLoop } from './intelligence.js';
import type {
  SwarmAgent,
  Task,
  Workflow,
  WorkflowRun,
  SwarmEvent,
  SwarmEventType,
  Runner,
} from './types.js';

export type EventHandler = (event: SwarmEvent) => void;

export interface SwarmConfig {
  name: string;
  version: string;
  maxConcurrentWorkflows: number;
  defaultTimeout: number; // ms
  enableSelfImprovement: boolean;
}

const DEFAULT_CONFIG: SwarmConfig = {
  name: 'GOD-SWARM ULTRA',
  version: '1.0.0',
  maxConcurrentWorkflows: 10,
  defaultTimeout: 300000, // 5 min
  enableSelfImprovement: true,
};

export class SwarmEngine {
  readonly config: SwarmConfig;
  readonly planner: SwarmPlanner;
  readonly modelRouter: ModelRouter;
  readonly taskGraphGenerator: TaskGraphGenerator;
  readonly intelligence: SwarmIntelligenceEngine;
  readonly selfImprovement: SelfImprovementLoop;

  private agents = new Map<string, SwarmAgent>();
  private runners = new Map<string, Runner>();
  private workflows = new Map<string, Workflow>();
  private workflowRuns = new Map<string, WorkflowRun>();
  private tasks = new Map<string, Task>();
  private eventHandlers = new Map<SwarmEventType, EventHandler[]>();

  constructor(config: Partial<SwarmConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.planner = new SwarmPlanner();
    this.modelRouter = new ModelRouter();
    this.taskGraphGenerator = new TaskGraphGenerator();
    this.intelligence = new SwarmIntelligenceEngine();
    this.selfImprovement = new SelfImprovementLoop();
  }

  // ─── Agent Management ──────────────────────────────────────────────────────

  registerAgent(agent: SwarmAgent): void {
    this.agents.set(agent.identity.id, agent);
    this.emit('agent.created', { agentId: agent.identity.id, type: agent.identity.type });
  }

  getAgent(id: string): SwarmAgent | undefined {
    return this.agents.get(id);
  }

  listAgents(): SwarmAgent[] {
    return Array.from(this.agents.values());
  }

  updateAgentStatus(id: string, status: SwarmAgent['status']): void {
    const agent = this.agents.get(id);
    if (agent) {
      agent.status = status;
      agent.identity.updatedAt = new Date();
    }
  }

  // ─── Runner Management ─────────────────────────────────────────────────────

  registerRunner(runner: Runner): void {
    this.runners.set(runner.id, runner);
    this.emit('runner.connected', { runnerId: runner.id });
  }

  getRunner(id: string): Runner | undefined {
    return this.runners.get(id);
  }

  listRunners(): Runner[] {
    return Array.from(this.runners.values());
  }

  getAvailableRunner(): Runner | null {
    for (const runner of this.runners.values()) {
      if (
        runner.status === 'available' &&
        runner.capacity.currentJobs < runner.capacity.maxConcurrentJobs
      ) {
        return runner;
      }
    }
    return null;
  }

  // ─── Workflow Management ───────────────────────────────────────────────────

  registerWorkflow(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
  }

  getWorkflow(id: string): Workflow | undefined {
    return this.workflows.get(id);
  }

  listWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  async startWorkflow(workflowId: string, triggeredBy?: string): Promise<WorkflowRun> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    // Enforce maximum concurrent workflows if configured
    const maxConcurrent = this.config.maxConcurrentWorkflows;
    if (typeof maxConcurrent === 'number' && maxConcurrent > 0) {
      let runningCount = 0;
      for (const run of this.workflowRuns.values()) {
        if (run.status === 'running') {
          runningCount += 1;
          if (runningCount >= maxConcurrent) {
            throw new Error(`Maximum concurrent workflows limit (${maxConcurrent}) reached`);
          }
        }
      }
    }
    const taskGraph = this.taskGraphGenerator.generate(workflowId, workflow.steps);

    const run: WorkflowRun = {
      id: randomUUID(),
      workflowId,
      status: 'running',
      taskGraph,
      startedAt: new Date(),
      triggeredBy,
    };

    this.workflowRuns.set(run.id, run);
    this.emit('workflow.started', { runId: run.id, workflowId });

    // Store tasks
    for (const [, node] of taskGraph.nodes) {
      this.tasks.set(node.task.id, node.task);
    }

    return run;
  }

  getWorkflowRun(id: string): WorkflowRun | undefined {
    return this.workflowRuns.get(id);
  }

  listWorkflowRuns(): WorkflowRun[] {
    return Array.from(this.workflowRuns.values());
  }

  // ─── Task Management ───────────────────────────────────────────────────────

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  listTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  updateTaskStatus(taskId: string, status: Task['status'], output?: Task['output']): void {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = status;
    task.updatedAt = new Date();
    if (output) {
      task.output = output;
    }

    let eventType: SwarmEventType;
    switch (status) {
      case 'completed':
        eventType = 'task.completed';
        break;
      case 'failed':
        eventType = 'task.failed';
        break;
      case 'queued':
        eventType = 'task.queued';
        break;
      case 'running':
        eventType = 'task.started';
        break;
      case 'cancelled':
        eventType = 'task.cancelled';
        break;
      case 'retrying':
        eventType = 'task.retrying';
        break;
      default:
        eventType = 'task.updated';
        break;
    }

    this.emit(eventType, { taskId, status });
  }

  // ─── Natural Language Interface ────────────────────────────────────────────

  /**
   * Accept a natural language goal and orchestrate execution
   */
  async processGoal(goal: string, userId?: string): Promise<WorkflowRun> {
    // Plan the goal
    const plan = this.planner.plan({ goal });
    const workflow = this.planner.planToWorkflow(plan);

    // Register and start workflow
    this.registerWorkflow(workflow);
    return this.startWorkflow(workflow.id, userId);
  }

  // ─── Metrics ───────────────────────────────────────────────────────────────

  getMetrics(): Record<string, number> {
    const tasks = Array.from(this.tasks.values());
    return {
      totalAgents: this.agents.size,
      activeAgents: Array.from(this.agents.values()).filter(a => a.status === 'running').length,
      totalRunners: this.runners.size,
      availableRunners: Array.from(this.runners.values()).filter(r => r.status === 'available')
        .length,
      totalWorkflows: this.workflows.size,
      activeWorkflowRuns: Array.from(this.workflowRuns.values()).filter(r => r.status === 'running')
        .length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      failedTasks: tasks.filter(t => t.status === 'failed').length,
    };
  }

  // ─── Event System ──────────────────────────────────────────────────────────

  on(type: SwarmEventType, handler: EventHandler): void {
    const handlers = this.eventHandlers.get(type) ?? [];
    handlers.push(handler);
    this.eventHandlers.set(type, handlers);
  }

  off(type: SwarmEventType, handler: EventHandler): void {
    const handlers = this.eventHandlers.get(type) ?? [];
    this.eventHandlers.set(
      type,
      handlers.filter(h => h !== handler)
    );
  }

  private emit(type: SwarmEventType, payload: unknown): void {
    const event: SwarmEvent = {
      id: randomUUID(),
      type,
      payload,
      timestamp: new Date(),
      source: 'swarm-engine',
    };

    const handlers = this.eventHandlers.get(type) ?? [];
    for (const handler of handlers) {
      try {
        handler(event);
      } catch {
        // Handlers must not crash the engine
      }
    }
  }
}
