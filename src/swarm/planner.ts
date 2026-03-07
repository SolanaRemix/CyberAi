/**
 * GOD-SWARM ULTRA — Swarm Planner
 * Decomposes complex goals into executable task graphs
 */

import { randomUUID } from 'crypto';
import type { AgentType, TaskPriority, WorkflowStep, Workflow } from './types.js';

export interface PlanRequest {
  goal: string;
  context?: Record<string, unknown>;
  constraints?: {
    maxTasks?: number;
    allowedAgentTypes?: AgentType[];
    deadline?: Date;
  };
}

export interface PlanStep {
  name: string;
  description: string;
  agentType: AgentType;
  priority: TaskPriority;
  estimatedDurationMs?: number;
  dependsOn?: string[];
}

export interface Plan {
  id: string;
  goal: string;
  steps: PlanStep[];
  estimatedTotalDurationMs?: number;
  createdAt: Date;
}

/**
 * Heuristic planner that decomposes goals into agent tasks
 */
export class SwarmPlanner {
  /**
   * Decompose a high-level goal into a plan
   */
  plan(request: PlanRequest): Plan {
    const steps = this.decomposeGoal(request.goal, request.constraints?.allowedAgentTypes);

    // Respect maxTasks constraint
    const cappedSteps = request.constraints?.maxTasks
      ? steps.slice(0, request.constraints.maxTasks)
      : steps;

    return {
      id: randomUUID(),
      goal: request.goal,
      steps: cappedSteps,
      estimatedTotalDurationMs: cappedSteps.reduce(
        (sum, s) => sum + (s.estimatedDurationMs ?? 5000),
        0
      ),
      createdAt: new Date(),
    };
  }

  /**
   * Convert a plan into a workflow
   */
  planToWorkflow(plan: Plan): Workflow {
    const steps: WorkflowStep[] = plan.steps.map((s, i) => ({
      id: `step-${i}`,
      name: s.name,
      agentType: s.agentType,
      input: { prompt: s.description },
      dependsOn: s.dependsOn
        ? s.dependsOn.map(dep => {
            const idx = plan.steps.findIndex(ps => ps.name === dep);
            return idx >= 0 ? `step-${idx}` : dep;
          })
        : i > 0
          ? [`step-${i - 1}`]
          : undefined,
    }));

    return {
      id: randomUUID(),
      name: `Plan: ${plan.goal.slice(0, 60)}`,
      description: plan.goal,
      trigger: { type: 'manual' },
      steps,
      version: '1.0.0',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Heuristic goal decomposition based on keywords
   */
  private decomposeGoal(goal: string, allowedTypes?: AgentType[]): PlanStep[] {
    const lower = goal.toLowerCase();
    const steps: PlanStep[] = [];

    const allowed = (type: AgentType) => !allowedTypes || allowedTypes.includes(type);

    // Research phase for any goal
    if (allowed('research')) {
      steps.push({
        name: 'Research & Analysis',
        description: `Research and analyze the requirements for: ${goal}`,
        agentType: 'research',
        priority: 'high',
        estimatedDurationMs: 10000,
      });
    }

    // Planning phase
    if (allowed('planner')) {
      steps.push({
        name: 'Task Planning',
        description: `Break down the goal into subtasks: ${goal}`,
        agentType: 'planner',
        priority: 'high',
        estimatedDurationMs: 5000,
        dependsOn: steps.length > 0 ? [steps[steps.length - 1].name] : undefined,
      });
    }

    // Code generation for software tasks
    if (
      allowed('code-gen') &&
      (lower.includes('code') ||
        lower.includes('build') ||
        lower.includes('implement') ||
        lower.includes('develop') ||
        lower.includes('create') ||
        lower.includes('write'))
    ) {
      steps.push({
        name: 'Code Generation',
        description: `Generate production code for: ${goal}`,
        agentType: 'code-gen',
        priority: 'normal',
        estimatedDurationMs: 30000,
        dependsOn: steps.length > 0 ? [steps[steps.length - 1].name] : undefined,
      });
    }

    // Security audit for any code
    if (
      allowed('security') &&
      (lower.includes('secure') ||
        lower.includes('audit') ||
        lower.includes('security') ||
        lower.includes('vulnerability') ||
        steps.some(s => s.agentType === 'code-gen'))
    ) {
      steps.push({
        name: 'Security Audit',
        description: 'Perform security audit and vulnerability scanning',
        agentType: 'security',
        priority: 'high',
        estimatedDurationMs: 15000,
        dependsOn: steps.length > 0 ? [steps[steps.length - 1].name] : undefined,
      });
    }

    // DevOps for deployment tasks
    if (
      allowed('devops') &&
      (lower.includes('deploy') ||
        lower.includes('infrastructure') ||
        lower.includes('docker') ||
        lower.includes('kubernetes') ||
        lower.includes('ci/cd'))
    ) {
      steps.push({
        name: 'Infrastructure Deployment',
        description: `Deploy and configure infrastructure for: ${goal}`,
        agentType: 'devops',
        priority: 'normal',
        estimatedDurationMs: 20000,
        dependsOn: steps.length > 0 ? [steps[steps.length - 1].name] : undefined,
      });
    }

    // Trading for blockchain/financial tasks
    if (
      allowed('trading') &&
      (lower.includes('trade') ||
        lower.includes('blockchain') ||
        lower.includes('defi') ||
        lower.includes('token') ||
        lower.includes('solana') ||
        lower.includes('ethereum'))
    ) {
      steps.push({
        name: 'Blockchain Strategy Execution',
        description: `Execute blockchain strategy for: ${goal}`,
        agentType: 'trading',
        priority: 'critical',
        estimatedDurationMs: 5000,
        dependsOn: steps.length > 0 ? [steps[steps.length - 1].name] : undefined,
      });
    }

    // Repair agent for fix/heal tasks
    if (
      allowed('repair') &&
      (lower.includes('fix') ||
        lower.includes('repair') ||
        lower.includes('heal') ||
        lower.includes('bug') ||
        lower.includes('error') ||
        lower.includes('failure'))
    ) {
      steps.push({
        name: 'System Repair',
        description: `Diagnose and repair issues for: ${goal}`,
        agentType: 'repair',
        priority: 'critical',
        estimatedDurationMs: 10000,
        dependsOn: steps.length > 0 ? [steps[steps.length - 1].name] : undefined,
      });
    }

    // Fallback: add a generic research + planner task
    if (steps.length === 0) {
      if (allowed('research')) {
        steps.push({
          name: 'Goal Analysis',
          description: `Analyze and execute: ${goal}`,
          agentType: 'research',
          priority: 'normal',
          estimatedDurationMs: 10000,
        });
      } else if (allowed('planner')) {
        steps.push({
          name: 'Task Execution',
          description: `Execute: ${goal}`,
          agentType: 'planner',
          priority: 'normal',
          estimatedDurationMs: 5000,
        });
      }
    }

    return steps;
  }
}
