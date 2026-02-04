/**
 * CyberAi Agent System
 * Manages AI agents for security auditing, code analysis, and automation
 */

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
