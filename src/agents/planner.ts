/**
 * GOD-SWARM ULTRA — Planner Agent
 * Decomposes complex tasks into executable subtasks
 */

import type { AgentExecutionContext } from './base.js';
import type { TaskOutput } from '../swarm/types.js';
import { BaseAgent } from './base.js';
import { SwarmPlanner } from '../swarm/planner.js';

export class PlannerAgent extends BaseAgent {
  private planner = new SwarmPlanner();

  constructor() {
    super('planner', 'Planner Agent', {
      tools: ['task-decompose', 'dependency-resolver', 'timeline-estimator'],
      models: ['gpt-4o', 'claude-3-5-sonnet-20241022', 'o1-mini'],
      maxConcurrentTasks: 5,
    });
  }

  async execute(context: AgentExecutionContext): Promise<TaskOutput> {
    this.setStatus('running');
    const logs: string[] = [];

    try {
      const prompt = context.task.input.prompt ?? context.task.description;
      logs.push(`[PlannerAgent] Decomposing goal: ${prompt}`);

      const plan = this.planner.plan({
        goal: prompt,
        context: context.task.input.context,
        constraints: { maxTasks: 10 },
      });

      logs.push(`[PlannerAgent] Generated ${plan.steps.length} steps`);
      for (const step of plan.steps) {
        logs.push(`  → [${step.agentType}] ${step.name}`);
      }

      const workflow = this.planner.planToWorkflow(plan);

      this.setStatus('idle');
      return this.buildOutput(
        {
          plan,
          workflow,
          summary: `Decomposed into ${plan.steps.length} tasks`,
          estimatedDurationMs: plan.estimatedTotalDurationMs,
        },
        logs
      );
    } catch (err) {
      this.setStatus('error');
      return {
        error: err instanceof Error ? err.message : String(err),
        logs,
        metrics: { startTime: new Date(), endTime: new Date() },
      };
    }
  }
}
