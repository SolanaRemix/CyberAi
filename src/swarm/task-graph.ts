/**
 * GOD-SWARM ULTRA — Task Graph Generator
 * Builds directed acyclic graphs of tasks for parallel execution
 */

import { randomUUID } from 'crypto';
import type { Task, TaskGraph, TaskNode, WorkflowStep, AgentType, TaskPriority } from './types.js';

export class TaskGraphGenerator {
  /**
   * Generate a task graph from workflow steps
   */
  generate(workflowId: string, steps: WorkflowStep[]): TaskGraph {
    const nodes = new Map<string, TaskNode>();
    const stepIdToTaskId = new Map<string, string>();

    // First pass: create tasks for all steps
    for (const step of steps) {
      const task: Task = {
        id: randomUUID(),
        workflowId,
        title: step.name,
        description: `Execute step: ${step.name}`,
        type: step.agentType,
        priority: step.priority ?? 'normal',
        status: 'pending',
        input: step.input,
        retryCount: 0,
        maxRetries: step.retryPolicy?.maxRetries ?? 3,
        timeoutMs: step.timeoutMs,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      stepIdToTaskId.set(step.id, task.id);
      nodes.set(task.id, {
        task,
        dependencies: [],
        dependents: [],
      });
    }

    // Second pass: wire dependencies
    for (const step of steps) {
      const taskId = stepIdToTaskId.get(step.id)!;
      const node = nodes.get(taskId)!;

      if (step.dependsOn) {
        for (const depStepId of step.dependsOn) {
          const depTaskId = stepIdToTaskId.get(depStepId);
          if (depTaskId) {
            node.dependencies.push(depTaskId);
            const depNode = nodes.get(depTaskId);
            if (depNode) {
              depNode.dependents.push(taskId);
            }
          }
        }
      }
    }

    // Find root tasks (no dependencies)
    const rootTaskIds = Array.from(nodes.entries())
      .filter(([, node]) => node.dependencies.length === 0)
      .map(([id]) => id);

    return {
      id: randomUUID(),
      workflowId,
      nodes,
      rootTaskIds,
      status: 'ready',
      createdAt: new Date(),
    };
  }

  /**
   * Generate a task graph from a natural language plan
   */
  generateFromPlan(
    workflowId: string,
    planSteps: Array<{ name: string; type: AgentType; priority?: TaskPriority }>
  ): TaskGraph {
    const steps: WorkflowStep[] = planSteps.map((s, i) => ({
      id: `step-${i}`,
      name: s.name,
      agentType: s.type,
      input: { prompt: s.name },
      dependsOn: i > 0 ? [`step-${i - 1}`] : undefined,
    }));
    return this.generate(workflowId, steps);
  }

  /**
   * Get the next batch of tasks that are ready to execute
   * (all dependencies completed)
   */
  getReadyTasks(graph: TaskGraph): Task[] {
    const ready: Task[] = [];
    for (const [, node] of graph.nodes) {
      if (node.task.status !== 'pending') continue;
      const allDepsCompleted = node.dependencies.every(depId => {
        const dep = graph.nodes.get(depId);
        return dep?.task.status === 'completed';
      });
      if (allDepsCompleted) {
        ready.push(node.task);
      }
    }
    return ready;
  }

  /**
   * Check if the task graph is complete
   */
  isComplete(graph: TaskGraph): boolean {
    for (const [, node] of graph.nodes) {
      if (!['completed', 'failed', 'cancelled'].includes(node.task.status)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if the task graph has failed (any critical task failed)
   */
  hasFailed(graph: TaskGraph): boolean {
    for (const [, node] of graph.nodes) {
      if (node.task.status === 'failed' && node.task.priority === 'critical') {
        return true;
      }
    }
    return false;
  }

  /**
   * Serialize graph for storage/transmission
   */
  serialize(graph: TaskGraph): Record<string, unknown> {
    return {
      id: graph.id,
      workflowId: graph.workflowId,
      nodes: Array.from(graph.nodes.entries()).map(([id, node]) => ({
        id,
        task: node.task,
        dependencies: node.dependencies,
        dependents: node.dependents,
      })),
      rootTaskIds: graph.rootTaskIds,
      status: graph.status,
      createdAt: graph.createdAt,
    };
  }

  /**
   * Deserialize graph from storage
   */
  deserialize(data: Record<string, unknown>): TaskGraph {
    const nodes = new Map<string, TaskNode>();
    const rawNodes = data['nodes'] as Array<{
      id: string;
      task: Record<string, unknown>;
      dependencies: string[];
      dependents: string[];
    }>;

    for (const rawNode of rawNodes) {
      // Revive Date fields that become strings after JSON round-trip
      const task = {
        ...rawNode.task,
        createdAt: new Date(rawNode.task['createdAt'] as string),
        updatedAt: new Date(rawNode.task['updatedAt'] as string),
      } as Task;
      nodes.set(rawNode.id, {
        task,
        dependencies: rawNode.dependencies,
        dependents: rawNode.dependents,
      });
    }

    return {
      id: data['id'] as string,
      workflowId: data['workflowId'] as string,
      nodes,
      rootTaskIds: data['rootTaskIds'] as string[],
      status: data['status'] as TaskGraph['status'],
      createdAt: new Date(data['createdAt'] as string),
    };
  }
}
