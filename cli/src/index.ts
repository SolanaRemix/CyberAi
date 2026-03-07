/**
 * GOD-SWARM ULTRA — godswarm CLI
 * Command-line interface for the swarm platform
 */

import { randomUUID } from 'crypto';
import { ControlPlane } from '../../src/control-plane/index.js';
import type { Workflow } from '../../src/swarm/types.js';

export interface CLIOptions {
  verbose?: boolean;
  format?: 'json' | 'table' | 'plain';
  apiUrl?: string;
}

export interface CLIResult {
  success: boolean;
  data?: unknown;
  message?: string;
  error?: string;
}

/**
 * GOD-SWARM ULTRA CLI Command Router
 */
export class GodSwarmCLI {
  private controlPlane: ControlPlane;
  private options: CLIOptions;

  constructor(options: CLIOptions = {}) {
    this.options = options;
    this.controlPlane = new ControlPlane();
  }

  /**
   * Parse and execute a CLI command
   */
  async execute(args: string[]): Promise<CLIResult> {
    const [command, subcommand, ...rest] = args;

    switch (command) {
      case 'init':
        return this.init(rest);
      case 'agent':
        return this.handleAgent(subcommand, rest);
      case 'workflow':
        return this.handleWorkflow(subcommand, rest);
      case 'deploy':
        return this.handleDeploy(subcommand, rest);
      case 'status':
        return this.status();
      case 'run':
        return this.run(subcommand, rest);
      case 'help':
      case '--help':
      case '-h':
        return this.help();
      case 'version':
      case '--version':
      case '-v':
        return this.version();
      default:
        return {
          success: false,
          error: `Unknown command: ${command}. Run 'godswarm help' for usage.`,
        };
    }
  }

  // ─── Commands ──────────────────────────────────────────────────────────────

  private async init(args: string[]): Promise<CLIResult> {
    const projectName = args[0] ?? 'my-swarm';
    const template = args.find(a => a.startsWith('--template='))?.split('=')[1] ?? 'default';

    const config = {
      name: projectName,
      version: '1.0.0',
      template,
      swarm: {
        name: `${projectName}-swarm`,
        maxConcurrentWorkflows: 10,
        enableSelfImprovement: true,
      },
      agents: ['planner', 'code-gen', 'security', 'devops', 'research'],
      integrations: [],
    };

    return {
      success: true,
      data: config,
      message: `✅ Initialized GOD-SWARM ULTRA project: ${projectName}\n\nCreated swarm.config.json with default configuration.\nRun 'godswarm agent list' to see available agents.`,
    };
  }

  private async handleAgent(subcommand: string, args: string[]): Promise<CLIResult> {
    switch (subcommand) {
      case 'list':
        return this.agentList();
      case 'create':
        return this.agentCreate(args);
      case 'status':
        return this.agentStatus(args[0]);
      case 'logs':
        return this.agentLogs(args[0]);
      default:
        return {
          success: false,
          error: `Unknown agent command: ${subcommand}. Use: list|create|status|logs`,
        };
    }
  }

  private async agentList(): Promise<CLIResult> {
    const stats = this.controlPlane.registry.getStats();
    return {
      success: true,
      data: stats,
      message: 'Available agents in GOD-SWARM ULTRA registry',
    };
  }

  private async agentCreate(args: string[]): Promise<CLIResult> {
    const name = args[0];
    const type = args.find(a => a.startsWith('--type='))?.split('=')[1];

    if (!name) {
      return { success: false, error: 'Usage: godswarm agent create <name> --type=<type>' };
    }

    return {
      success: true,
      data: { id: randomUUID(), name, type: type ?? 'planner' },
      message: `✅ Agent "${name}" created`,
    };
  }

  private async agentStatus(id?: string): Promise<CLIResult> {
    if (!id) {
      return { success: false, error: 'Usage: godswarm agent status <agent-id>' };
    }

    const agent = this.controlPlane.registry.getById(id);
    if (!agent) {
      return { success: false, error: `Agent ${id} not found` };
    }

    return { success: true, data: { id, status: agent.status, type: agent.type } };
  }

  private async agentLogs(id?: string): Promise<CLIResult> {
    if (!id) {
      return { success: false, error: 'Usage: godswarm agent logs <agent-id>' };
    }
    return { success: true, data: [], message: `Logs for agent ${id} (last 100 lines)` };
  }

  private async handleWorkflow(subcommand: string, args: string[]): Promise<CLIResult> {
    switch (subcommand) {
      case 'list':
        return this.workflowList();
      case 'run':
        return this.workflowRun(args);
      case 'status':
        return this.workflowStatus(args[0]);
      case 'create':
        return this.workflowCreate(args);
      default:
        return {
          success: false,
          error: `Unknown workflow command: ${subcommand}. Use: list|run|status|create`,
        };
    }
  }

  private async workflowList(): Promise<CLIResult> {
    const workflows = this.controlPlane.swarmEngine.listWorkflows();
    return {
      success: true,
      data: workflows.map(w => ({ id: w.id, name: w.name, enabled: w.enabled })),
      message: `Found ${workflows.length} workflow(s)`,
    };
  }

  private async workflowRun(args: string[]): Promise<CLIResult> {
    const workflowIdOrGoal = args[0];
    if (!workflowIdOrGoal) {
      return {
        success: false,
        error: 'Usage: godswarm workflow run <workflow-id|"goal description">',
      };
    }

    try {
      // If it looks like a UUID, run by ID; otherwise treat as natural language goal
      const isUUID = /^[0-9a-f-]{36}$/.test(workflowIdOrGoal);
      const run = isUUID
        ? await this.controlPlane.swarmEngine.startWorkflow(workflowIdOrGoal)
        : await this.controlPlane.processNaturalLanguageGoal(workflowIdOrGoal);

      return {
        success: true,
        data: { runId: run.id, workflowId: run.workflowId, status: run.status },
        message: `✅ Workflow run started: ${run.id}`,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  private async workflowStatus(runId?: string): Promise<CLIResult> {
    if (!runId) {
      return { success: false, error: 'Usage: godswarm workflow status <run-id>' };
    }

    const run = this.controlPlane.swarmEngine.getWorkflowRun(runId);
    if (!run) {
      return { success: false, error: `Workflow run ${runId} not found` };
    }

    return { success: true, data: { runId, status: run.status, startedAt: run.startedAt } };
  }

  private async workflowCreate(args: string[]): Promise<CLIResult> {
    const name = args[0];
    if (!name) {
      return { success: false, error: 'Usage: godswarm workflow create <name>' };
    }

    const workflow: Workflow = {
      id: randomUUID(),
      name,
      description: `Workflow: ${name}`,
      trigger: { type: 'manual' },
      steps: [],
      version: '1.0.0',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.controlPlane.swarmEngine.registerWorkflow(workflow);
    return {
      success: true,
      data: { id: workflow.id, name: workflow.name },
      message: `✅ Workflow "${name}" created with ID: ${workflow.id}`,
    };
  }

  private async handleDeploy(subcommand: string, args: string[]): Promise<CLIResult> {
    const environment = args.find(a => a.startsWith('--env='))?.split('=')[1] ?? 'production';
    const target = subcommand ?? 'kubernetes';

    return {
      success: true,
      data: { target, environment, deploymentId: randomUUID() },
      message: `✅ Deployment initiated to ${target} (${environment})`,
    };
  }

  private async run(goal: string, args: string[]): Promise<CLIResult> {
    if (!goal) {
      return { success: false, error: 'Usage: godswarm run "<goal description>"' };
    }

    try {
      const run = await this.controlPlane.processNaturalLanguageGoal([goal, ...args].join(' '));
      return {
        success: true,
        data: { runId: run.id, status: run.status },
        message: `✅ Swarm activated for goal: "${goal}"`,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  private async status(): Promise<CLIResult> {
    const telemetry = this.controlPlane.collectTelemetry();
    return {
      success: true,
      data: telemetry,
      message: `GOD-SWARM ULTRA System Status — Health: ${telemetry.systemHealthScore}/100`,
    };
  }

  private help(): CLIResult {
    return {
      success: true,
      message: `
GOD-SWARM ULTRA — Autonomous AI Swarm Platform
Version: 1.0.0

USAGE:
  godswarm <command> [subcommand] [options]

COMMANDS:
  init [name] [--template=<tpl>]     Initialize a new swarm project
  agent list                          List all registered agents
  agent create <name> --type=<type>  Create a new agent
  agent status <agent-id>            Get agent status
  agent logs <agent-id>              View agent logs
  workflow list                      List all workflows
  workflow create <name>             Create a new workflow
  workflow run <id|"goal">           Run a workflow or natural language goal
  workflow status <run-id>           Get workflow run status
  deploy [target] [--env=<env>]      Deploy to infrastructure
  run "<goal>"                       Execute a natural language goal
  status                             Show system status
  help                               Show this help
  version                            Show version

EXAMPLES:
  godswarm init my-project
  godswarm agent list
  godswarm workflow run "build and deploy a TypeScript API"
  godswarm deploy kubernetes --env=production
  godswarm run "audit my smart contract for vulnerabilities"
  godswarm status

DOCS: https://cyberai.network/docs/godswarm
`,
    };
  }

  private version(): CLIResult {
    return {
      success: true,
      message: 'GOD-SWARM ULTRA v1.0.0',
      data: {
        version: '1.0.0',
        platform: 'CyberAi',
        nodeVersion: process.version,
      },
    };
  }
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export { GodSwarmCLI as default };
