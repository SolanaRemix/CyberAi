/**
 * Unit tests for GOD-SWARM ULTRA — Control Plane, Runners, Memory, Tools, Marketplace
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ControlPlane } from '../../../src/control-plane/index.js';
import { SwarmRunner, RunnerPool } from '../../../src/runners/index.js';
import { VectorMemoryStore, AgentMemory, EpisodicMemory } from '../../../src/memory/index.js';
import { ToolRegistry, createDefaultToolRegistry } from '../../../src/tools/index.js';
import { Marketplace, SUBSCRIPTION_PLANS } from '../../../src/marketplace/index.js';
import type { Task } from '../../../src/swarm/types.js';

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

// ─── ControlPlane ─────────────────────────────────────────────────────────────

describe('ControlPlane', () => {
  let cp: ControlPlane;

  beforeEach(() => {
    cp = new ControlPlane();
  });

  it('should initialize with default config', () => {
    expect(cp.config.maxActiveWorkflows).toBeGreaterThan(0);
    expect(cp.config.enableTelemetry).toBe(true);
  });

  it('should have agents registered from registry', () => {
    const agents = cp.swarmEngine.listAgents();
    expect(agents.length).toBeGreaterThan(0);
  });

  it('should process natural language goal', async () => {
    const run = await cp.processNaturalLanguageGoal('Build a TypeScript API');
    expect(run.id).toBeDefined();
    expect(run.status).toBe('running');
  });

  it('should enforce max workflow limit', async () => {
    const tightCp = new ControlPlane({ maxActiveWorkflows: 1 });
    await tightCp.processNaturalLanguageGoal('Goal 1');

    await expect(tightCp.processNaturalLanguageGoal('Goal 2')).rejects.toThrow(/max/i);
  });

  it('should collect telemetry', () => {
    const snapshot = cp.collectTelemetry();
    expect(snapshot.timestamp).toBeDefined();
    expect(typeof snapshot.systemHealthScore).toBe('number');
    expect(snapshot.systemHealthScore).toBeGreaterThanOrEqual(0);
    expect(snapshot.systemHealthScore).toBeLessThanOrEqual(100);
  });

  describe('Permission checks', () => {
    it('should allow admin all actions', () => {
      expect(cp.checkPermission('admin', 'admin')).toBe(true);
      expect(cp.checkPermission('admin', 'manage-agents')).toBe(true);
      expect(cp.checkPermission('admin', 'submit-workflow')).toBe(true);
    });

    it('should allow operator to submit workflows', () => {
      expect(cp.checkPermission('operator', 'submit-workflow')).toBe(true);
    });

    it('should deny operator admin access', () => {
      expect(cp.checkPermission('operator', 'admin')).toBe(false);
      expect(cp.checkPermission('operator', 'manage-agents')).toBe(false);
    });

    it('should deny guest all actions', () => {
      expect(cp.checkPermission('guest', 'submit-workflow')).toBe(false);
      expect(cp.checkPermission('guest', 'admin')).toBe(false);
    });
  });

  describe('Intent parsing', () => {
    it('should parse run intent', () => {
      const { intent } = cp.parseIntent('run a security audit on my code');
      expect(intent).toBe('run-workflow');
    });

    it('should parse agent creation intent', () => {
      const { intent } = cp.parseIntent('create a new agent for trading');
      expect(intent).toBe('create-agent');
    });

    it('should parse status check intent', () => {
      const { intent } = cp.parseIntent('what is the system status');
      expect(intent).toBe('check-status');
    });

    it('should parse query intent', () => {
      const { intent } = cp.parseIntent('what agents are available');
      expect(intent).toBe('query');
    });

    it('should return unknown for ambiguous input', () => {
      const { intent, confidence } = cp.parseIntent('hello');
      expect(intent).toBe('unknown');
      expect(confidence).toBeLessThan(0.5);
    });
  });
});

// ─── SwarmRunner ──────────────────────────────────────────────────────────────

describe('SwarmRunner', () => {
  let runner: SwarmRunner;

  beforeEach(() => {
    runner = new SwarmRunner('test-runner', ['test']);
  });

  it('should initialize as available', () => {
    expect(runner.info.status).toBe('available');
  });

  it('should execute a task and return output', async () => {
    const task = makeTask();
    const output = await runner.execute(task);

    expect(output.result).toBeDefined();
    expect(output.metrics?.startTime).toBeDefined();
  });

  it('should use registered handler', async () => {
    runner.registerHandler('planner', async task => ({
      result: { custom: true, taskId: task.id },
      logs: ['Custom handler'],
      metrics: { startTime: new Date(), endTime: new Date() },
    }));

    const output = await runner.execute(makeTask({ type: 'planner' }));
    const result = output.result as { custom: boolean };
    expect(result.custom).toBe(true);
  });

  it('should track completed jobs', async () => {
    await runner.execute(makeTask());
    expect(runner.getCompletedJobs().length).toBe(1);
  });

  it('should update capacity during execution', async () => {
    const executionPromise = runner.execute(makeTask());
    // After execution completes, jobs should be 0
    await executionPromise;
    expect(runner.info.capacity.currentJobs).toBe(0);
  });

  it('should return back to available after job', async () => {
    await runner.execute(makeTask());
    expect(runner.info.status).toBe('available');
  });

  it('should reject tasks when at capacity', async () => {
    const capacityRunner = new SwarmRunner('capacity-runner', []);
    // Set to max capacity by overriding internal capacity
    (
      capacityRunner as unknown as {
        runner: { capacity: { maxConcurrentJobs: number; currentJobs: number } };
      }
    ).runner.capacity.maxConcurrentJobs = 1;
    (
      capacityRunner as unknown as {
        runner: { capacity: { maxConcurrentJobs: number; currentJobs: number } };
      }
    ).runner.capacity.currentJobs = 1;

    await expect(capacityRunner.execute(makeTask())).rejects.toThrow(/capacity/i);
  });

  it('should provide metrics', async () => {
    await runner.execute(makeTask());
    const metrics = runner.getMetrics();

    expect(metrics.totalJobsExecuted).toBe(1);
    expect(metrics.successRate).toBe(1);
    expect(metrics.avgDurationMs).toBeGreaterThanOrEqual(0);
  });
});

describe('RunnerPool', () => {
  let pool: RunnerPool;

  beforeEach(() => {
    pool = new RunnerPool();
    pool.add(new SwarmRunner('runner-1', ['prod']));
    pool.add(new SwarmRunner('runner-2', ['prod']));
  });

  it('should list all runners', () => {
    expect(pool.listRunners().length).toBe(2);
  });

  it('should execute tasks using an available runner', async () => {
    const output = await pool.execute(makeTask());
    expect(output.result).toBeDefined();
  });

  it('should provide pool metrics', () => {
    const metrics = pool.getPoolMetrics();
    expect(metrics['totalRunners']).toBe(2);
  });

  it('should throw when no runners available', async () => {
    const emptyPool = new RunnerPool();
    await expect(emptyPool.execute(makeTask())).rejects.toThrow(/no available/i);
  });
});

// ─── VectorMemoryStore ────────────────────────────────────────────────────────

describe('VectorMemoryStore', () => {
  let store: VectorMemoryStore;

  beforeEach(() => {
    store = new VectorMemoryStore();
  });

  it('should store and retrieve an entry', async () => {
    const stored = await store.store('test-ns', 'TypeScript development best practices');
    const retrieved = await store.retrieve(stored.id);

    expect(retrieved).not.toBeNull();
    expect(retrieved?.content).toBe('TypeScript development best practices');
  });

  it('should search entries by query', async () => {
    await store.store('test-ns', 'TypeScript best practices for large-scale apps');
    await store.store('test-ns', 'Python data science libraries comparison');
    await store.store('test-ns', 'TypeScript generics and advanced types');

    const results = await store.search('test-ns', 'TypeScript');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].entry.content).toContain('TypeScript');
  });

  it('should filter by namespace', async () => {
    await store.store('ns-a', 'Content for A');
    await store.store('ns-b', 'Content for B');

    const results = await store.search('ns-a', 'Content');
    expect(results.every(r => r.entry.namespace === 'ns-a')).toBe(true);
  });

  it('should return null for non-existent entry', async () => {
    const result = await store.retrieve('nonexistent-id');
    expect(result).toBeNull();
  });

  it('should delete entries', async () => {
    const entry = await store.store('test-ns', 'To be deleted');
    const deleted = await store.delete(entry.id);

    expect(deleted).toBe(true);
    expect(await store.retrieve(entry.id)).toBeNull();
  });

  it('should delete by namespace', async () => {
    await store.store('del-ns', 'Entry 1');
    await store.store('del-ns', 'Entry 2');

    const count = await store.deleteByNamespace('del-ns');
    expect(count).toBe(2);

    const results = await store.search('del-ns', 'Entry');
    expect(results.length).toBe(0);
  });

  it('should report stats', async () => {
    await store.store('stats-ns', 'Some content');
    const stats = store.getStats();

    expect(stats.totalEntries).toBeGreaterThan(0);
    expect(stats.namespaces).toContain('stats-ns');
  });

  it('should expire entries', async () => {
    const stored = await store.store('test-ns', 'Expiring soon', {}, 1); // 1ms TTL

    await new Promise(resolve => setTimeout(resolve, 10));

    const retrieved = await store.retrieve(stored.id);
    expect(retrieved).toBeNull();
  });
});

describe('AgentMemory', () => {
  let memory: AgentMemory;

  beforeEach(() => {
    memory = new AgentMemory(new VectorMemoryStore(), 'agent:planner:test');
  });

  it('should remember and recall', async () => {
    await memory.remember('The user prefers TypeScript over JavaScript');
    const results = await memory.recall('TypeScript preferences');

    expect(results.length).toBeGreaterThan(0);
  });

  it('should forget an entry', async () => {
    const entry = await memory.remember('Temporary memory');
    await memory.forget(entry.id);

    const results = await memory.recall('Temporary');
    // After forgetting, it should not appear (or score 0)
    expect(results.filter(r => r.entry.id === entry.id)).toHaveLength(0);
  });

  it('should clear all entries', async () => {
    await memory.remember('Entry 1');
    await memory.remember('Entry 2');
    const count = await memory.clearAll();

    expect(count).toBe(2);
  });
});

describe('EpisodicMemory', () => {
  let episodic: EpisodicMemory;

  beforeEach(() => {
    episodic = new EpisodicMemory();
  });

  it('should record and retrieve episodes', () => {
    episodic.record({
      agentId: 'agent-1',
      taskId: 'task-1',
      taskDescription: 'Build TypeScript API',
      actions: ['plan', 'code', 'test'],
      outcome: 'success',
      qualityScore: 0.9,
      lessons: ['Always add tests', 'Use strict TypeScript'],
    });

    const episodes = episodic.getByAgent('agent-1');
    expect(episodes.length).toBe(1);
  });

  it('should retrieve lessons for task', () => {
    episodic.record({
      agentId: 'a1',
      taskId: 't1',
      taskDescription: 'Security audit of smart contract',
      actions: [],
      outcome: 'success',
      qualityScore: 0.95,
      lessons: ['Check for reentrancy', 'Validate all inputs'],
    });

    const lessons = episodic.getLessonsForTask('smart contract security');
    expect(lessons.length).toBeGreaterThan(0);
  });

  it('should calculate success rate', () => {
    for (let i = 0; i < 8; i++) {
      episodic.record({
        agentId: 'a1',
        taskId: `t${i}`,
        taskDescription: 'Task',
        actions: [],
        outcome: 'success',
        qualityScore: 1,
        lessons: [],
      });
    }
    for (let i = 8; i < 10; i++) {
      episodic.record({
        agentId: 'a1',
        taskId: `t${i}`,
        taskDescription: 'Task',
        actions: [],
        outcome: 'failure',
        qualityScore: 0,
        lessons: [],
      });
    }

    const rate = episodic.getSuccessRate('a1');
    expect(rate).toBeCloseTo(0.8);
  });
});

// ─── ToolRegistry ─────────────────────────────────────────────────────────────

describe('ToolRegistry', () => {
  let registry: ToolRegistry;

  beforeEach(() => {
    registry = createDefaultToolRegistry();
  });

  it('should have built-in tools registered', () => {
    const tools = registry.listAll();
    expect(tools.length).toBeGreaterThan(0);
  });

  it('should have filesystem tools', () => {
    const fsTools = registry.listByCategory('filesystem');
    expect(fsTools.length).toBeGreaterThan(0);
  });

  it('should have git tools', () => {
    const gitTools = registry.listByCategory('git');
    expect(gitTools.length).toBeGreaterThan(0);
  });

  it('should have docker tools', () => {
    const dockerTools = registry.listByCategory('docker');
    expect(dockerTools.length).toBeGreaterThan(0);
  });

  it('should execute a tool', async () => {
    const result = await registry.execute('fs.read', { path: '/test/file.ts' });
    expect(result.success).toBe(true);
  });

  it('should return error for unknown tool', async () => {
    const result = await registry.execute('nonexistent.tool', {});
    expect(result.success).toBe(false);
    expect(result.error).toContain('not found');
  });

  it('should register a custom tool', async () => {
    registry.register({
      name: 'custom.tool',
      description: 'Custom test tool',
      category: 'api',
      schema: {},
      executor: async () => ({ success: true, data: 'custom result' }),
    });

    const result = await registry.execute('custom.tool', {});
    expect(result.success).toBe(true);
    expect(result.data).toBe('custom result');
  });
});

// ─── Marketplace ──────────────────────────────────────────────────────────────

describe('Marketplace', () => {
  let marketplace: Marketplace;

  beforeEach(() => {
    marketplace = new Marketplace();
  });

  it('should have default agents in catalog', () => {
    const agents = marketplace.searchAgents('security');
    expect(agents.length).toBeGreaterThan(0);
  });

  it('should have default workflow templates', () => {
    const templates = marketplace.searchTemplates('security');
    expect(templates.length).toBeGreaterThan(0);
  });

  it('should search agents by keyword', () => {
    const results = marketplace.searchAgents('TypeScript');
    expect(
      results.every(
        a =>
          a.name.toLowerCase().includes('typescript') ||
          a.description.toLowerCase().includes('typescript') ||
          a.tags.includes('typescript')
      )
    ).toBe(true);
  });

  it('should get featured agents', () => {
    const featured = marketplace.getFeaturedAgents();
    expect(featured.length).toBeGreaterThan(0);
  });

  it('should create subscription', () => {
    const sub = marketplace.createSubscription('user-1', 'pro');
    expect(sub.userId).toBe('user-1');
    expect(sub.plan).toBe('pro');
    expect(sub.status).toBe('active');
  });

  it('should get subscription for user', () => {
    marketplace.createSubscription('user-2', 'starter');
    const sub = marketplace.getSubscription('user-2');

    expect(sub).not.toBeNull();
    expect(sub?.plan).toBe('starter');
  });

  it('should record and summarize usage', () => {
    marketplace.recordUsage('user-3', 'workflow-run', 5, 0.5);
    marketplace.recordUsage('user-3', 'runner-min', 30, 0.03);

    const summary = marketplace.getUsageSummary('user-3');
    expect(summary.totalCostUsd).toBeCloseTo(0.53);
    expect(summary.breakdown['workflow-run']).toBeDefined();
  });

  it('should have correct plan limits', () => {
    expect(SUBSCRIPTION_PLANS.starter.monthlyUsd).toBe(29);
    expect(SUBSCRIPTION_PLANS.pro.monthlyUsd).toBe(99);
    expect(SUBSCRIPTION_PLANS.enterprise.monthlyUsd).toBe(499);
    expect(SUBSCRIPTION_PLANS.enterprise.limits.workflowRunsPerMonth).toBe(-1);
  });

  it('should publish a new agent', () => {
    const agent = marketplace.publishAgent({
      name: 'Custom AI Agent',
      description: 'A custom agent',
      category: 'custom',
      tags: ['custom'],
      author: 'test',
      version: '1.0.0',
      rating: 4.0,
      downloads: 0,
      pricingModel: 'free',
      capabilities: ['chat'],
    });

    expect(agent.id).toBeDefined();
    const retrieved = marketplace.getAgent(agent.id);
    expect(retrieved?.name).toBe('Custom AI Agent');
  });
});
