/**
 * GOD-SWARM ULTRA — Agent Registry
 * Central registry for all swarm agents
 */

import { PlannerAgent } from './planner.js';
import { CodeGenAgent } from './code-gen.js';
import { SecurityAgent } from './security.js';
import { DevOpsAgent } from './devops.js';
import { ResearchAgent } from './research.js';
import { TradingAgent } from './trading.js';
import { RepairAgent } from './repair.js';
import type { BaseAgent } from './base.js';
import type { AgentType } from '../swarm/types.js';

export class AgentRegistry {
  private agents = new Map<string, BaseAgent>();

  constructor() {
    // Register default agents
    this.registerDefaultAgents();
  }

  private registerDefaultAgents(): void {
    const defaults: BaseAgent[] = [
      new PlannerAgent(),
      new CodeGenAgent(),
      new SecurityAgent(),
      new DevOpsAgent(),
      new ResearchAgent(),
      new TradingAgent(),
      new RepairAgent(),
    ];

    for (const agent of defaults) {
      this.register(agent);
    }
  }

  register(agent: BaseAgent): void {
    this.agents.set(agent.id, agent);
  }

  getById(id: string): BaseAgent | undefined {
    return this.agents.get(id);
  }

  getByType(type: AgentType): BaseAgent[] {
    return Array.from(this.agents.values()).filter(a => a.type === type);
  }

  getAvailableByType(type: AgentType): BaseAgent | null {
    return (
      Array.from(this.agents.values()).find(a => a.type === type && a.status === 'idle') ?? null
    );
  }

  listAll(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  getStats(): Record<AgentType, { total: number; idle: number; running: number }> {
    const stats: Partial<Record<AgentType, { total: number; idle: number; running: number }>> = {};
    const types: AgentType[] = [
      'planner',
      'code-gen',
      'security',
      'devops',
      'research',
      'trading',
      'repair',
    ];

    for (const type of types) {
      const typeAgents = this.getByType(type);
      stats[type] = {
        total: typeAgents.length,
        idle: typeAgents.filter(a => a.status === 'idle').length,
        running: typeAgents.filter(a => a.status === 'running').length,
      };
    }

    return stats as Record<AgentType, { total: number; idle: number; running: number }>;
  }
}
