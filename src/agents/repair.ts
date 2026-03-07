/**
 * GOD-SWARM ULTRA — Repair Agent
 * Automatically diagnoses and fixes system failures
 */

import type { AgentExecutionContext } from './base.js';
import type { TaskOutput, Artifact } from '../swarm/types.js';
import { BaseAgent } from './base.js';

export type FailureType =
  | 'build-failure'
  | 'test-failure'
  | 'runtime-error'
  | 'dependency-issue'
  | 'config-error'
  | 'memory-leak'
  | 'network-failure'
  | 'data-corruption'
  | 'unknown';

export interface SystemFailure {
  id: string;
  type: FailureType;
  component: string;
  errorMessage: string;
  stackTrace?: string;
  context?: Record<string, unknown>;
  timestamp: Date;
}

export interface RepairAction {
  id: string;
  type:
    | 'fix-code'
    | 'restart-service'
    | 'rollback'
    | 'update-config'
    | 'clear-cache'
    | 'reinstall-deps';
  description: string;
  command?: string;
  patch?: string;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
}

export interface RepairPlan {
  failureId: string;
  rootCause: string;
  actions: RepairAction[];
  estimatedDowntimeMin: number;
  rollbackStrategy: string;
  autoApplicable: boolean;
}

// Common error patterns and their fixes
const ERROR_PATTERNS: Array<{
  pattern: RegExp;
  failureType: FailureType;
  repairType: RepairAction['type'];
  fix: string;
  command?: string;
}> = [
  {
    pattern: /Cannot find module|Module not found/,
    failureType: 'dependency-issue',
    repairType: 'reinstall-deps',
    fix: 'Reinstall missing npm/pip packages',
    command: 'npm install',
  },
  {
    pattern: /EADDRINUSE|port.*in use/i,
    failureType: 'runtime-error',
    repairType: 'restart-service',
    fix: 'Kill conflicting process on the port',
    command: 'fuser -k <PORT>/tcp',
  },
  {
    pattern: /heap out of memory|JavaScript heap|OOM/i,
    failureType: 'memory-leak',
    repairType: 'restart-service',
    fix: 'Restart service and increase memory limit',
    command: 'node --max-old-space-size=4096',
  },
  {
    pattern: /SyntaxError|Unexpected token|Cannot read prop/,
    failureType: 'build-failure',
    repairType: 'fix-code',
    fix: 'Fix syntax error in source code',
  },
  {
    pattern: /ECONNREFUSED|connection refused/i,
    failureType: 'network-failure',
    repairType: 'restart-service',
    fix: 'Restart the target service',
  },
  {
    pattern: /config.*not found|configuration.*missing/i,
    failureType: 'config-error',
    repairType: 'update-config',
    fix: 'Create or update missing configuration file',
  },
];

export class RepairAgent extends BaseAgent {
  constructor() {
    super('repair', 'Repair Agent', {
      tools: [
        'system-diagnostics',
        'log-analyzer',
        'process-manager',
        'file-system',
        'git-operations',
        'dependency-manager',
      ],
      models: ['gpt-4o', 'claude-3-5-sonnet-20241022'],
      maxConcurrentTasks: 3,
    });
  }

  async execute(context: AgentExecutionContext): Promise<TaskOutput> {
    this.setStatus('running');
    const logs: string[] = [];

    try {
      const prompt = context.task.input.prompt ?? context.task.description;
      logs.push(`[RepairAgent] Starting diagnosis for: ${prompt}`);

      const taskCtx = context.task.input.context ?? {};
      const errorMessage = (taskCtx['error'] as string) ?? prompt;
      const component = (taskCtx['component'] as string) ?? 'unknown';

      // Diagnose the failure
      const failure = this.diagnose(errorMessage, component);
      logs.push(`[RepairAgent] Diagnosed failure type: ${failure.type}`);

      // Generate repair plan
      const repairPlan = this.generateRepairPlan(failure);
      logs.push(`[RepairAgent] Generated ${repairPlan.actions.length} repair actions`);
      logs.push(`[RepairAgent] Root cause: ${repairPlan.rootCause}`);

      repairPlan.actions.forEach((action, i) => {
        logs.push(`  ${i + 1}. [${action.risk.toUpperCase()} RISK] ${action.description}`);
        if (action.command) {
          logs.push(`     Command: ${action.command}`);
        }
      });

      const report = this.generateRepairReport(failure, repairPlan);
      const artifacts: Artifact[] = [
        {
          id: `repair-report-${Date.now()}`,
          type: 'report',
          name: 'repair-plan.md',
          content: report,
          mimeType: 'text/markdown',
        },
      ];

      this.setStatus('idle');
      return {
        result: { failure, repairPlan },
        artifacts,
        logs,
        metrics: { startTime: new Date(), endTime: new Date() },
      };
    } catch (err) {
      this.setStatus('error');
      return {
        error: err instanceof Error ? err.message : String(err),
        logs,
        metrics: { startTime: new Date(), endTime: new Date() },
      };
    }
  }

  private diagnose(errorMessage: string, component: string): SystemFailure {
    let failureType: FailureType = 'unknown';

    for (const { pattern, failureType: ft } of ERROR_PATTERNS) {
      if (pattern.test(errorMessage)) {
        failureType = ft;
        break;
      }
    }

    return {
      id: `failure-${Date.now()}`,
      type: failureType,
      component,
      errorMessage,
      timestamp: new Date(),
    };
  }

  generateRepairPlan(failure: SystemFailure): RepairPlan {
    const actions: RepairAction[] = [];
    let rootCause = 'Unknown root cause';
    let autoApplicable = false;
    let estimatedDowntimeMin = 5;

    for (const { pattern, failureType, repairType, fix, command } of ERROR_PATTERNS) {
      if (failure.type === failureType || pattern.test(failure.errorMessage)) {
        actions.push({
          id: `action-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          type: repairType,
          description: fix,
          command,
          confidence: 0.8,
          risk: repairType === 'rollback' ? 'high' : repairType === 'fix-code' ? 'medium' : 'low',
        });
        rootCause = `Pattern match: ${pattern.source}`;
        autoApplicable = repairType !== 'fix-code';
        break;
      }
    }

    // Always add a diagnostic step first
    actions.unshift({
      id: `action-diag-${Date.now()}`,
      type: 'fix-code',
      description: `Collect detailed diagnostics for ${failure.component}`,
      confidence: 1.0,
      risk: 'low',
    });

    // Add rollback as safety net
    actions.push({
      id: `action-rollback-${Date.now()}`,
      type: 'rollback',
      description: 'Rollback to last known good state if other actions fail',
      command: 'git revert HEAD --no-edit',
      confidence: 0.9,
      risk: 'high',
    });

    if (failure.type === 'build-failure') {
      estimatedDowntimeMin = 15;
    } else if (failure.type === 'data-corruption') {
      estimatedDowntimeMin = 60;
      autoApplicable = false;
    }

    return {
      failureId: failure.id,
      rootCause,
      actions,
      estimatedDowntimeMin,
      rollbackStrategy: 'Git revert to previous commit or redeploy last stable container image',
      autoApplicable,
    };
  }

  private generateRepairReport(failure: SystemFailure, plan: RepairPlan): string {
    return `# System Repair Report
Generated: ${new Date().toISOString()}

## Failure Analysis
- **Component**: ${failure.component}
- **Type**: ${failure.type}
- **Time**: ${failure.timestamp.toISOString()}
- **Error**: \`${failure.errorMessage.slice(0, 200)}\`

## Root Cause
${plan.rootCause}

## Repair Plan
**Estimated downtime**: ~${plan.estimatedDowntimeMin} minutes  
**Auto-applicable**: ${plan.autoApplicable ? '✅ Yes' : '❌ Requires manual review'}

### Actions
${plan.actions
  .map(
    (
      a,
      i
    ) => `${i + 1}. **${a.description}** _(${a.risk} risk, ${(a.confidence * 100).toFixed(0)}% confidence)_
   ${a.command ? `\`\`\`bash\n   ${a.command}\n   \`\`\`` : ''}`
  )
  .join('\n\n')}

## Rollback Strategy
${plan.rollbackStrategy}

---
*Generated by GOD-SWARM ULTRA Repair Agent v1.0.0*
`;
  }
}
