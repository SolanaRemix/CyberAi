/**
 * GOD-SWARM ULTRA — Agent System
 * Manages AI agents for the swarm platform
 */

// Legacy CyberAi agent types (preserved for backward compatibility)
export interface Agent {
  id: string;
  name: string;
  type: 'security' | 'analysis' | 'automation';
  capabilities: string[];
}

export class AgentManager {
  private agents: Map<string, Agent> = new Map();

  register(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  listAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
}

// GOD-SWARM ULTRA agent implementations
export * from './base.js';
export * from './planner.js';
export * from './code-gen.js';
export * from './security.js';
export * from './devops.js';
export * from './research.js';
export * from './trading.js';
export * from './repair.js';
export * from './registry.js';
