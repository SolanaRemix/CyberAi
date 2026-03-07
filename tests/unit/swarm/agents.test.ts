/**
 * Unit tests for GOD-SWARM ULTRA — Agents
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PlannerAgent } from '../../../src/agents/planner.js';
import { CodeGenAgent } from '../../../src/agents/code-gen.js';
import { SecurityAgent } from '../../../src/agents/security.js';
import { DevOpsAgent } from '../../../src/agents/devops.js';
import { ResearchAgent } from '../../../src/agents/research.js';
import { TradingAgent } from '../../../src/agents/trading.js';
import { RepairAgent } from '../../../src/agents/repair.js';
import { AgentRegistry } from '../../../src/agents/registry.js';
import type { AgentExecutionContext, MemoryInterface } from '../../../src/agents/base.js';
import type { Task } from '../../../src/swarm/types.js';

// ─── Test Helpers ──────────────────────────────────────────────────────────────

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'test-task-1',
    title: 'Test Task',
    description: 'A test task',
    type: 'planner',
    priority: 'normal',
    status: 'running',
    input: { prompt: 'Test prompt' },
    retryCount: 0,
    maxRetries: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

const mockMemory: MemoryInterface = {
  store: async () => {},
  retrieve: async () => null,
  search: async () => [],
};

function makeContext(task: Task): AgentExecutionContext {
  return {
    task,
    tools: new Map(),
    memory: mockMemory,
    emit: () => {},
  };
}

// ─── PlannerAgent ─────────────────────────────────────────────────────────────

describe('PlannerAgent', () => {
  let agent: PlannerAgent;

  beforeEach(() => {
    agent = new PlannerAgent();
  });

  it('should have correct type', () => {
    expect(agent.type).toBe('planner');
  });

  it('should start idle', () => {
    expect(agent.status).toBe('idle');
  });

  it('should execute and return a plan', async () => {
    const context = makeContext(
      makeTask({ type: 'planner', input: { prompt: 'Build a TypeScript API' } })
    );
    const output = await agent.execute(context);

    expect(output.error).toBeUndefined();
    expect(output.result).toBeDefined();
    const result = output.result as { plan: { steps: unknown[] } };
    expect(result.plan.steps.length).toBeGreaterThan(0);
  });

  it('should return to idle after execution', async () => {
    const context = makeContext(makeTask({ type: 'planner' }));
    await agent.execute(context);
    expect(agent.status).toBe('idle');
  });

  it('should can handle planner tasks', () => {
    expect(agent.canHandle(makeTask({ type: 'planner' }))).toBe(true);
    expect(agent.canHandle(makeTask({ type: 'security' }))).toBe(false);
  });

  it('should include logs in output', async () => {
    const context = makeContext(makeTask({ type: 'planner' }));
    const output = await agent.execute(context);

    expect(output.logs).toBeDefined();
    expect(output.logs!.length).toBeGreaterThan(0);
  });
});

// ─── CodeGenAgent ─────────────────────────────────────────────────────────────

describe('CodeGenAgent', () => {
  let agent: CodeGenAgent;

  beforeEach(() => {
    agent = new CodeGenAgent();
  });

  it('should have correct type', () => {
    expect(agent.type).toBe('code-gen');
  });

  it('should generate TypeScript code', async () => {
    const context = makeContext(
      makeTask({
        type: 'code-gen',
        input: {
          prompt: 'Create an API endpoint',
          context: { language: 'TypeScript' },
        },
      })
    );

    const output = await agent.execute(context);
    expect(output.error).toBeUndefined();
    expect(output.artifacts).toBeDefined();
    expect(output.artifacts!.length).toBeGreaterThan(0);
  });

  it('should generate Python code', async () => {
    const context = makeContext(
      makeTask({
        type: 'code-gen',
        input: {
          prompt: 'Create a data processor',
          context: { language: 'Python' },
        },
      })
    );

    const output = await agent.execute(context);
    expect(output.artifacts!.some(a => a.name.endsWith('.py'))).toBe(true);
  });

  it('should generate Solidity code', async () => {
    const context = makeContext(
      makeTask({
        type: 'code-gen',
        input: {
          prompt: 'Create a token contract',
          context: { language: 'Solidity' },
        },
      })
    );

    const output = await agent.execute(context);
    expect(output.artifacts!.some(a => a.name.endsWith('.sol'))).toBe(true);
  });

  it('should include code artifacts with type=code', async () => {
    const context = makeContext(makeTask({ type: 'code-gen' }));
    const output = await agent.execute(context);

    expect(output.artifacts!.every(a => a.type === 'code')).toBe(true);
  });
});

// ─── SecurityAgent ────────────────────────────────────────────────────────────

describe('SecurityAgent', () => {
  let agent: SecurityAgent;

  beforeEach(() => {
    agent = new SecurityAgent();
  });

  it('should have correct type', () => {
    expect(agent.type).toBe('security');
  });

  it('should detect eval vulnerability', async () => {
    const context = makeContext(
      makeTask({
        type: 'security',
        input: {
          prompt: 'Audit this code',
          data: 'const result = eval(userInput);',
        },
      })
    );

    const output = await agent.execute(context);
    const result = output.result as { findings: Array<{ severity: string }> };
    expect(result.findings.some(f => f.severity === 'critical')).toBe(true);
  });

  it('should detect innerHTML XSS vulnerability', async () => {
    const context = makeContext(
      makeTask({
        type: 'security',
        input: {
          prompt: 'Audit',
          data: 'element.innerHTML = userInput;',
        },
      })
    );

    const output = await agent.execute(context);
    const result = output.result as { findings: Array<{ severity: string }> };
    expect(result.findings.some(f => f.severity === 'high')).toBe(true);
  });

  it('should detect hardcoded password', async () => {
    const context = makeContext(
      makeTask({
        type: 'security',
        input: {
          prompt: 'Audit',
          data: 'const password = "supersecret123";',
        },
      })
    );

    const output = await agent.execute(context);
    const result = output.result as { findings: Array<{ severity: string }>; passed: boolean };
    expect(result.findings.some(f => f.severity === 'critical')).toBe(true);
    expect(result.passed).toBe(false);
  });

  it('should generate security report artifact', async () => {
    const context = makeContext(makeTask({ type: 'security' }));
    const output = await agent.execute(context);

    expect(output.artifacts).toBeDefined();
    expect(output.artifacts!.some(a => a.type === 'report')).toBe(true);
  });

  it('should pass clean code', async () => {
    const context = makeContext(
      makeTask({
        type: 'security',
        input: {
          prompt: 'Audit',
          data: 'export const greeting = (name: string) => `Hello, ${name}!`;',
        },
      })
    );

    const output = await agent.execute(context);
    const result = output.result as { passed: boolean; riskScore: number };
    expect(result.passed).toBe(true);
    expect(result.riskScore).toBeLessThan(50);
  });
});

// ─── DevOpsAgent ──────────────────────────────────────────────────────────────

describe('DevOpsAgent', () => {
  let agent: DevOpsAgent;

  beforeEach(() => {
    agent = new DevOpsAgent();
  });

  it('should have correct type', () => {
    expect(agent.type).toBe('devops');
  });

  it('should generate Kubernetes manifests', async () => {
    const context = makeContext(
      makeTask({
        type: 'devops',
        input: {
          prompt: 'Deploy to Kubernetes',
          context: { type: 'kubernetes', environment: 'production' },
        },
      })
    );

    const output = await agent.execute(context);
    expect(output.error).toBeUndefined();
    expect(output.artifacts!.some(a => a.name.endsWith('.yaml'))).toBe(true);
  });

  it('should generate Docker Compose manifests', async () => {
    const context = makeContext(
      makeTask({
        type: 'devops',
        input: {
          prompt: 'Deploy with Docker',
          context: { type: 'docker', environment: 'development' },
        },
      })
    );

    const output = await agent.execute(context);
    expect(output.artifacts!.some(a => a.name.includes('docker-compose'))).toBe(true);
  });

  it('should include deployment plan in result', async () => {
    const context = makeContext(makeTask({ type: 'devops' }));
    const output = await agent.execute(context);
    const result = output.result as { deploymentPlan: string[] };
    expect(result.deploymentPlan.length).toBeGreaterThan(0);
  });
});

// ─── ResearchAgent ────────────────────────────────────────────────────────────

describe('ResearchAgent', () => {
  let agent: ResearchAgent;

  beforeEach(() => {
    agent = new ResearchAgent();
  });

  it('should have correct type', () => {
    expect(agent.type).toBe('research');
  });

  it('should return research results', async () => {
    const context = makeContext(
      makeTask({
        type: 'research',
        input: { prompt: 'Latest developments in AI' },
      })
    );

    const output = await agent.execute(context);
    expect(output.error).toBeUndefined();
    const result = output.result as { keyFindings: string[] };
    expect(result.keyFindings.length).toBeGreaterThan(0);
  });

  it('should generate a research report artifact', async () => {
    const context = makeContext(makeTask({ type: 'research' }));
    const output = await agent.execute(context);

    expect(output.artifacts!.some(a => a.type === 'report')).toBe(true);
  });

  it('should respect depth parameter', async () => {
    const shallowContext = makeContext(
      makeTask({ type: 'research', input: { prompt: 'Topic', context: { depth: 'shallow' } } })
    );
    const deepContext = makeContext(
      makeTask({ type: 'research', input: { prompt: 'Topic', context: { depth: 'deep' } } })
    );

    const shallowOutput = await agent.execute(shallowContext);
    const deepOutput = await agent.execute(deepContext);

    const shallowResult = shallowOutput.result as { keyFindings: string[] };
    const deepResult = deepOutput.result as { keyFindings: string[] };

    expect(deepResult.keyFindings.length).toBeGreaterThan(shallowResult.keyFindings.length);
  });
});

// ─── TradingAgent ─────────────────────────────────────────────────────────────

describe('TradingAgent', () => {
  let agent: TradingAgent;

  beforeEach(() => {
    agent = new TradingAgent();
  });

  it('should have correct type', () => {
    expect(agent.type).toBe('trading');
  });

  it('should return trading signals', async () => {
    const context = makeContext(
      makeTask({
        type: 'trading',
        input: {
          prompt: 'Analyze Solana market',
          context: { network: 'solana', strategy: 'dca' },
        },
      })
    );

    const output = await agent.execute(context);
    expect(output.error).toBeUndefined();
    const result = output.result as { signals: Array<{ action: string }> };
    expect(result.signals.length).toBeGreaterThan(0);
  });

  it('should include risk warnings', async () => {
    const context = makeContext(makeTask({ type: 'trading' }));
    const output = await agent.execute(context);

    const result = output.result as { riskWarnings: string[] };
    expect(result.riskWarnings.length).toBeGreaterThan(0);
    expect(result.riskWarnings[0]).toContain('informational');
  });

  it('should generate trading report', async () => {
    const context = makeContext(makeTask({ type: 'trading' }));
    const output = await agent.execute(context);

    expect(output.artifacts!.some(a => a.type === 'report')).toBe(true);
  });
});

// ─── RepairAgent ──────────────────────────────────────────────────────────────

describe('RepairAgent', () => {
  let agent: RepairAgent;

  beforeEach(() => {
    agent = new RepairAgent();
  });

  it('should have correct type', () => {
    expect(agent.type).toBe('repair');
  });

  it('should diagnose dependency issue', async () => {
    const context = makeContext(
      makeTask({
        type: 'repair',
        input: {
          prompt: 'Fix build failure',
          context: { error: 'Cannot find module express', component: 'api' },
        },
      })
    );

    const output = await agent.execute(context);
    expect(output.error).toBeUndefined();
    const result = output.result as {
      failure: { type: string };
      repairPlan: { actions: unknown[] };
    };
    expect(result.failure.type).toBe('dependency-issue');
    expect(result.repairPlan.actions.length).toBeGreaterThan(0);
  });

  it('should generate repair plan with rollback', async () => {
    const context = makeContext(makeTask({ type: 'repair' }));
    const output = await agent.execute(context);

    const result = output.result as { repairPlan: { rollbackStrategy: string } };
    expect(result.repairPlan.rollbackStrategy).toBeDefined();
  });

  it('should generate repair plan report', async () => {
    const context = makeContext(makeTask({ type: 'repair' }));
    const output = await agent.execute(context);

    expect(output.artifacts!.some(a => a.name.includes('repair'))).toBe(true);
  });

  it('should detect memory leak', async () => {
    const context = makeContext(
      makeTask({
        type: 'repair',
        input: {
          prompt: 'Fix memory issue',
          context: { error: 'JavaScript heap out of memory', component: 'worker' },
        },
      })
    );

    const output = await agent.execute(context);
    const result = output.result as { failure: { type: string } };
    expect(result.failure.type).toBe('memory-leak');
  });
});

// ─── AgentRegistry ────────────────────────────────────────────────────────────

describe('AgentRegistry', () => {
  let registry: AgentRegistry;

  beforeEach(() => {
    registry = new AgentRegistry();
  });

  it('should have all default agent types registered', () => {
    const stats = registry.getStats();
    const types = Object.keys(stats) as Array<keyof typeof stats>;

    for (const type of types) {
      expect(stats[type].total).toBeGreaterThan(0);
    }
  });

  it('should get agent by type', () => {
    const planners = registry.getByType('planner');
    expect(planners.length).toBeGreaterThan(0);
    expect(planners[0].type).toBe('planner');
  });

  it('should get available agent by type', () => {
    const agent = registry.getAvailableByType('planner');
    expect(agent).not.toBeNull();
    expect(agent?.status).toBe('idle');
  });

  it('should list all agents', () => {
    const agents = registry.listAll();
    expect(agents.length).toBeGreaterThan(0);
  });

  it('should return stats for all agent types', () => {
    const stats = registry.getStats();
    expect(stats.planner).toBeDefined();
    expect(stats['code-gen']).toBeDefined();
    expect(stats.security).toBeDefined();
  });
});
