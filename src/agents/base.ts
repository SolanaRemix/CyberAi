/**
 * GOD-SWARM ULTRA — Base Agent
 * Abstract base class for all swarm agents
 */

import { randomUUID } from 'crypto';
import type {
  SwarmAgent,
  AgentType,
  AgentStatus,
  Task,
  TaskOutput,
  AgentCapabilities,
} from '../swarm/types.js';

export interface AgentExecutionContext {
  task: Task;
  tools: Map<string, ToolFunction>;
  memory: MemoryInterface;
  emit: (event: string, data: unknown) => void;
}

export type ToolFunction = (args: Record<string, unknown>) => Promise<unknown>;

export interface MemoryInterface {
  store(key: string, value: unknown): Promise<void>;
  retrieve(key: string): Promise<unknown>;
  search(
    query: string,
    topK?: number
  ): Promise<Array<{ key: string; value: unknown; score: number }>>;
}

export abstract class BaseAgent {
  protected swarmAgent: SwarmAgent;

  constructor(type: AgentType, name: string, capabilities: Partial<AgentCapabilities> = {}) {
    this.swarmAgent = {
      identity: {
        id: randomUUID(),
        name,
        type,
        version: '1.0.0',
        description: `${name} agent for GOD-SWARM ULTRA`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      capabilities: {
        tools: capabilities.tools ?? [],
        models: capabilities.models ?? ['gpt-4o'],
        maxConcurrentTasks: capabilities.maxConcurrentTasks ?? 3,
        supportedLanguages: capabilities.supportedLanguages,
      },
      memoryNamespace: `agent:${type}:${randomUUID().slice(0, 8)}`,
      executionStrategy: 'sequential',
      learningPolicy: {
        enabled: true,
        evaluationInterval: 3600000,
        minSamplesForUpdate: 10,
        improvementThreshold: 0.1,
      },
      status: 'idle',
      metadata: {},
    };
  }

  get id(): string {
    return this.swarmAgent.identity.id;
  }

  get type(): AgentType {
    return this.swarmAgent.identity.type;
  }

  get status(): AgentStatus {
    return this.swarmAgent.status;
  }

  get info(): SwarmAgent {
    return this.swarmAgent;
  }

  /**
   * Execute a task — implemented by each agent subclass
   */
  abstract execute(context: AgentExecutionContext): Promise<TaskOutput>;

  /**
   * Check if this agent can handle the given task
   */
  canHandle(task: Task): boolean {
    return task.type === this.swarmAgent.identity.type;
  }

  protected setStatus(status: AgentStatus): void {
    this.swarmAgent.status = status;
    this.swarmAgent.identity.updatedAt = new Date();
  }

  protected buildOutput(result: unknown, logs?: string[]): TaskOutput {
    return {
      result,
      logs: logs ?? [],
      metrics: {
        startTime: new Date(),
        endTime: new Date(),
      },
    };
  }
}
