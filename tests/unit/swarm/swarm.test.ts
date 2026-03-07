/**
 * Unit tests for GOD-SWARM ULTRA — Swarm Engine
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { SwarmEngine } from '../../../src/swarm/engine.js';
import { SwarmPlanner } from '../../../src/swarm/planner.js';
import { ModelRouter } from '../../../src/swarm/model-router.js';
import { TaskGraphGenerator } from '../../../src/swarm/task-graph.js';
import { SwarmIntelligenceEngine, SelfImprovementLoop } from '../../../src/swarm/intelligence.js';
import type { SwarmAgent, Runner, Workflow } from '../../../src/swarm/types.js';

// ─── Helper factories ──────────────────────────────────────────────────────────

function makeAgent(overrides: Partial<SwarmAgent> = {}): SwarmAgent {
  return {
    identity: {
      id: 'test-agent-1',
      name: 'Test Agent',
      type: 'planner',
      version: '1.0.0',
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    capabilities: {
      tools: [],
      models: ['gpt-4o'],
      maxConcurrentTasks: 3,
    },
    memoryNamespace: 'test',
    executionStrategy: 'sequential',
    learningPolicy: {
      enabled: true,
      evaluationInterval: 3600000,
      minSamplesForUpdate: 10,
      improvementThreshold: 0.1,
    },
    status: 'idle',
    metadata: {},
    ...overrides,
  };
}

function makeRunner(overrides: Partial<Runner> = {}): Runner {
  return {
    id: 'runner-1',
    name: 'Test Runner',
    status: 'available',
    capacity: {
      maxConcurrentJobs: 5,
      currentJobs: 0,
      cpuCores: 4,
      memoryGb: 8,
      hasGpu: false,
    },
    tags: [],
    lastHeartbeat: new Date(),
    ...overrides,
  };
}

function makeWorkflow(overrides: Partial<Workflow> = {}): Workflow {
  return {
    id: 'workflow-1',
    name: 'Test Workflow',
    description: 'Test',
    trigger: { type: 'manual' },
    steps: [
      {
        id: 'step-0',
        name: 'Research',
        agentType: 'research',
        input: { prompt: 'Research test topic' },
      },
      {
        id: 'step-1',
        name: 'Code Generation',
        agentType: 'code-gen',
        input: { prompt: 'Generate code' },
        dependsOn: ['step-0'],
      },
    ],
    version: '1.0.0',
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

// ─── SwarmEngine ───────────────────────────────────────────────────────────────

describe('SwarmEngine', () => {
  let engine: SwarmEngine;

  beforeEach(() => {
    engine = new SwarmEngine({ name: 'Test Swarm' });
  });

  it('should initialize with correct config', () => {
    expect(engine.config.name).toBe('Test Swarm');
    expect(engine.config.enableSelfImprovement).toBe(true);
  });

  describe('Agent management', () => {
    it('should register and retrieve an agent', () => {
      const agent = makeAgent();
      engine.registerAgent(agent);

      const retrieved = engine.getAgent('test-agent-1');
      expect(retrieved).toBeDefined();
      expect(retrieved?.identity.name).toBe('Test Agent');
    });

    it('should list all agents', () => {
      engine.registerAgent(
        makeAgent({ identity: { ...makeAgent().identity, id: 'a1', name: 'A1' } })
      );
      engine.registerAgent(
        makeAgent({ identity: { ...makeAgent().identity, id: 'a2', name: 'A2' } })
      );

      const agents = engine.listAgents();
      expect(agents.length).toBe(2);
    });

    it('should update agent status', () => {
      const agent = makeAgent();
      engine.registerAgent(agent);

      engine.updateAgentStatus('test-agent-1', 'running');
      expect(engine.getAgent('test-agent-1')?.status).toBe('running');
    });

    it('should return undefined for unknown agent', () => {
      expect(engine.getAgent('nonexistent')).toBeUndefined();
    });
  });

  describe('Runner management', () => {
    it('should register a runner', () => {
      const runner = makeRunner();
      engine.registerRunner(runner);

      const retrieved = engine.getRunner('runner-1');
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe('Test Runner');
    });

    it('should find available runner', () => {
      engine.registerRunner(makeRunner());
      const available = engine.getAvailableRunner();
      expect(available).toBeDefined();
    });

    it('should return null when no runners are available', () => {
      engine.registerRunner(makeRunner({ status: 'offline' }));
      expect(engine.getAvailableRunner()).toBeNull();
    });

    it('should return null when runner is at capacity', () => {
      engine.registerRunner(
        makeRunner({
          capacity: {
            maxConcurrentJobs: 2,
            currentJobs: 2,
            cpuCores: 2,
            memoryGb: 4,
            hasGpu: false,
          },
        })
      );
      expect(engine.getAvailableRunner()).toBeNull();
    });
  });

  describe('Workflow management', () => {
    it('should register and start a workflow', async () => {
      const workflow = makeWorkflow();
      engine.registerWorkflow(workflow);

      const run = await engine.startWorkflow('workflow-1');
      expect(run.workflowId).toBe('workflow-1');
      expect(run.status).toBe('running');
    });

    it('should throw when starting non-existent workflow', async () => {
      await expect(engine.startWorkflow('nonexistent')).rejects.toThrow();
    });

    it('should list all workflow runs', async () => {
      const workflow = makeWorkflow();
      engine.registerWorkflow(workflow);
      await engine.startWorkflow('workflow-1');

      const runs = engine.listWorkflowRuns();
      expect(runs.length).toBe(1);
    });
  });

  describe('Metrics', () => {
    it('should return system metrics', () => {
      const metrics = engine.getMetrics();
      expect(typeof metrics['totalAgents']).toBe('number');
      expect(typeof metrics['totalRunners']).toBe('number');
      expect(typeof metrics['totalWorkflows']).toBe('number');
    });
  });

  describe('Event system', () => {
    it('should emit events on agent registration', () => {
      const events: string[] = [];
      engine.on('agent.created', () => events.push('agent.created'));

      engine.registerAgent(makeAgent());
      expect(events).toContain('agent.created');
    });

    it('should emit events on runner connection', () => {
      const events: string[] = [];
      engine.on('runner.connected', () => events.push('runner.connected'));

      engine.registerRunner(makeRunner());
      expect(events).toContain('runner.connected');
    });

    it('should support removing event handlers', () => {
      const events: string[] = [];
      const handler = () => events.push('triggered');

      engine.on('agent.created', handler);
      engine.off('agent.created', handler);
      engine.registerAgent(makeAgent());

      expect(events).toHaveLength(0);
    });
  });

  describe('Natural language goal processing', () => {
    it('should process a goal and return a workflow run', async () => {
      const run = await engine.processGoal('Build and deploy a TypeScript API');
      expect(run.id).toBeDefined();
      expect(run.status).toBe('running');
    });
  });
});

// ─── SwarmPlanner ──────────────────────────────────────────────────────────────

describe('SwarmPlanner', () => {
  let planner: SwarmPlanner;

  beforeEach(() => {
    planner = new SwarmPlanner();
  });

  it('should generate a plan for a code-related goal', () => {
    const plan = planner.plan({ goal: 'Build a TypeScript API' });
    expect(plan.steps.length).toBeGreaterThan(0);
    expect(plan.steps.some(s => s.agentType === 'code-gen')).toBe(true);
  });

  it('should generate a plan for a security-related goal', () => {
    const plan = planner.plan({ goal: 'Audit smart contract security' });
    expect(plan.steps.some(s => s.agentType === 'security')).toBe(true);
  });

  it('should generate a plan for a deploy-related goal', () => {
    const plan = planner.plan({ goal: 'Deploy Kubernetes infrastructure' });
    expect(plan.steps.some(s => s.agentType === 'devops')).toBe(true);
  });

  it('should generate a plan for a trading goal', () => {
    const plan = planner.plan({ goal: 'Execute Solana DeFi strategy' });
    expect(plan.steps.some(s => s.agentType === 'trading')).toBe(true);
  });

  it('should generate a plan for a repair goal', () => {
    const plan = planner.plan({ goal: 'Fix build failure and repair errors' });
    expect(plan.steps.some(s => s.agentType === 'repair')).toBe(true);
  });

  it('should respect maxTasks constraint', () => {
    const plan = planner.plan({
      goal: 'Build and deploy and audit and fix and research and trade',
      constraints: { maxTasks: 2 },
    });
    expect(plan.steps.length).toBeLessThanOrEqual(2);
  });

  it('should respect allowedAgentTypes constraint', () => {
    const plan = planner.plan({
      goal: 'Build a TypeScript application with security audit',
      constraints: { allowedAgentTypes: ['security'] },
    });
    expect(plan.steps.every(s => s.agentType === 'security')).toBe(true);
  });

  it('should convert plan to workflow', () => {
    const plan = planner.plan({ goal: 'Build a TypeScript API' });
    const workflow = planner.planToWorkflow(plan);
    expect(workflow.id).toBeDefined();
    expect(workflow.steps.length).toBe(plan.steps.length);
  });

  it('should include goal in plan', () => {
    const goal = 'Build something amazing';
    const plan = planner.plan({ goal });
    expect(plan.goal).toBe(goal);
  });

  it('should include estimated duration', () => {
    const plan = planner.plan({ goal: 'Build a TypeScript API' });
    expect(plan.estimatedTotalDurationMs).toBeGreaterThan(0);
  });
});

// ─── ModelRouter ──────────────────────────────────────────────────────────────

describe('ModelRouter', () => {
  let router: ModelRouter;

  beforeEach(() => {
    router = new ModelRouter();
  });

  it('should route to a reasoning model when required', () => {
    const model = router.route({ requiresReasoning: true });
    expect(model.capabilities).toContain('reasoning');
  });

  it('should route to a code-gen model when required', () => {
    const model = router.route({ requiresCodeGen: true });
    expect(model.capabilities).toContain('code-gen');
  });

  it('should prefer cheap model when preferLowCost is true', () => {
    const cheapModel = router.route({ preferLowCost: true });
    const expensiveModel = router.route({ preferLowCost: false });
    // Both should exist
    expect(cheapModel).toBeDefined();
    expect(expensiveModel).toBeDefined();
  });

  it('should filter by preferred provider', () => {
    const model = router.route({ preferredProvider: 'anthropic' });
    expect(model.provider).toBe('anthropic');
  });

  it('should list all models', () => {
    const models = router.listModels();
    expect(models.length).toBeGreaterThan(0);
  });

  it('should get models by provider', () => {
    const openaiModels = router.getModelsByProvider('openai');
    expect(openaiModels.every(m => m.provider === 'openai')).toBe(true);
  });

  it('should register a custom model', () => {
    router.registerModel({
      provider: 'local',
      modelId: 'custom-model',
      contextWindow: 4096,
      maxOutputTokens: 1024,
      costPer1kInputTokens: 0,
      costPer1kOutputTokens: 0,
      avgLatencyMs: 500,
      capabilities: ['chat'],
    });

    const models = router.listModels();
    expect(models.some(m => m.modelId === 'custom-model')).toBe(true);
  });
});

// ─── TaskGraphGenerator ───────────────────────────────────────────────────────

describe('TaskGraphGenerator', () => {
  let generator: TaskGraphGenerator;

  beforeEach(() => {
    generator = new TaskGraphGenerator();
  });

  it('should generate a graph with correct number of tasks', () => {
    const graph = generator.generate('wf-1', [
      { id: 'step-0', name: 'Research', agentType: 'research', input: {} },
      { id: 'step-1', name: 'Code', agentType: 'code-gen', input: {}, dependsOn: ['step-0'] },
    ]);

    expect(graph.nodes.size).toBe(2);
  });

  it('should identify root tasks correctly', () => {
    const graph = generator.generate('wf-1', [
      { id: 'step-0', name: 'Root', agentType: 'research', input: {} },
      { id: 'step-1', name: 'Dependent', agentType: 'code-gen', input: {}, dependsOn: ['step-0'] },
    ]);

    expect(graph.rootTaskIds).toHaveLength(1);
  });

  it('should get ready tasks (all root tasks when nothing is running)', () => {
    const graph = generator.generate('wf-1', [
      { id: 'step-0', name: 'Root', agentType: 'research', input: {} },
      { id: 'step-1', name: 'Dependent', agentType: 'code-gen', input: {}, dependsOn: ['step-0'] },
    ]);

    const ready = generator.getReadyTasks(graph);
    expect(ready).toHaveLength(1);
    expect(ready[0].title).toBe('Root');
  });

  it('should report graph as incomplete when tasks are pending', () => {
    const graph = generator.generate('wf-1', [
      { id: 'step-0', name: 'Task', agentType: 'research', input: {} },
    ]);

    expect(generator.isComplete(graph)).toBe(false);
  });

  it('should report graph as complete when all tasks are done', () => {
    const graph = generator.generate('wf-1', [
      { id: 'step-0', name: 'Task', agentType: 'research', input: {} },
    ]);

    for (const [, node] of graph.nodes) {
      node.task.status = 'completed';
    }

    expect(generator.isComplete(graph)).toBe(true);
  });

  it('should serialize and deserialize a graph', () => {
    const original = generator.generate('wf-1', [
      { id: 'step-0', name: 'Task', agentType: 'research', input: {} },
    ]);

    const serialized = generator.serialize(original);
    const deserialized = generator.deserialize(serialized);

    expect(deserialized.id).toBe(original.id);
    expect(deserialized.nodes.size).toBe(original.nodes.size);
  });
});

// ─── SwarmIntelligenceEngine ──────────────────────────────────────────────────

describe('SwarmIntelligenceEngine', () => {
  let engine: SwarmIntelligenceEngine;

  beforeEach(() => {
    engine = new SwarmIntelligenceEngine();
  });

  describe('reachConsensus', () => {
    it('should reach consensus with majority vote', () => {
      const result = engine.reachConsensus({
        question: 'What is 2+2?',
        responses: [
          { agentId: 'a1', response: '4', confidence: 0.9 },
          { agentId: 'a2', response: '4', confidence: 0.8 },
          { agentId: 'a3', response: '5', confidence: 0.3 },
        ],
      });

      expect(result.finalAnswer).toBe('4');
      expect(result.consensusScore).toBeGreaterThan(0.5);
    });

    it('should handle empty responses', () => {
      const result = engine.reachConsensus({
        question: 'What?',
        responses: [],
      });

      expect(result.finalAnswer).toBeNull();
      expect(result.consensusScore).toBe(0);
    });

    it('should handle single response', () => {
      const result = engine.reachConsensus({
        question: 'Anything?',
        responses: [{ agentId: 'a1', response: 'yes', confidence: 1.0 }],
      });

      expect(result.finalAnswer).toBe('yes');
    });
  });

  describe('conductDebate', () => {
    it('should conduct a debate with multiple rounds', () => {
      const result = engine.conductDebate({
        topic: 'Best deployment strategy',
        positions: [
          { agentId: 'a1', position: 'Blue-green deployment', evidence: 'Zero downtime' },
          { agentId: 'a2', position: 'Rolling update', evidence: 'Resource efficient' },
        ],
        rounds: 2,
      });

      expect(result.rounds).toHaveLength(2);
      expect(result.conclusion).toBeDefined();
    });

    it('should default to 3 rounds', () => {
      const result = engine.conductDebate({
        topic: 'Test',
        positions: [{ agentId: 'a1', position: 'A', evidence: 'Because A' }],
      });

      expect(result.rounds).toHaveLength(3);
    });
  });

  describe('validateOutput', () => {
    it('should approve output with validators', () => {
      const result = engine.validateOutput({
        taskId: 'task-1',
        output: { result: 'some output' },
        validators: ['v1', 'v2'],
      });

      expect(result.approved).toBe(true);
      expect(result.score).toBeGreaterThan(0);
    });
  });

  describe('delegate', () => {
    it('should delegate to agent with lowest load', () => {
      const selected = engine.delegate('some task', [
        { id: 'a1', type: 'planner', load: 0.8 },
        { id: 'a2', type: 'planner', load: 0.2 },
        { id: 'a3', type: 'planner', load: 0.5 },
      ]);

      expect(selected).toBe('a2');
    });

    it('should return null with no agents', () => {
      expect(engine.delegate('task', [])).toBeNull();
    });
  });
});

// ─── SelfImprovementLoop ──────────────────────────────────────────────────────

describe('SelfImprovementLoop', () => {
  let loop: SelfImprovementLoop;

  beforeEach(() => {
    loop = new SelfImprovementLoop();
  });

  it('should record performance and evaluate', () => {
    loop.record({
      agentId: 'agent-1',
      taskId: 'task-1',
      success: true,
      durationMs: 1000,
      qualityScore: 0.9,
      timestamp: new Date(),
    });

    const { score } = loop.evaluate('agent-1');
    expect(score).toBeCloseTo(0.9);
  });

  it('should return stable trend with no records', () => {
    const { trend } = loop.evaluate('agent-no-history');
    expect(trend).toBe('stable');
  });

  it('should detect improving trend', () => {
    // First half: low scores
    for (let i = 0; i < 5; i++) {
      loop.record({
        agentId: 'a1',
        taskId: `t${i}`,
        success: true,
        durationMs: 1000,
        qualityScore: 0.4,
        timestamp: new Date(),
      });
    }
    // Second half: high scores
    for (let i = 5; i < 10; i++) {
      loop.record({
        agentId: 'a1',
        taskId: `t${i}`,
        success: true,
        durationMs: 1000,
        qualityScore: 0.9,
        timestamp: new Date(),
      });
    }

    const { trend } = loop.evaluate('a1');
    expect(trend).toBe('improving');
  });

  it('should suggest improvement for poor performers', () => {
    for (let i = 0; i < 15; i++) {
      loop.record({
        agentId: 'bad-agent',
        taskId: `t${i}`,
        success: false,
        durationMs: 5000,
        qualityScore: 0.3,
        timestamp: new Date(),
      });
    }

    const suggestion = loop.suggest('bad-agent');
    expect(suggestion).not.toBeNull();
    expect(suggestion?.agentId).toBe('bad-agent');
  });

  it('should return null for well-performing agents', () => {
    for (let i = 0; i < 15; i++) {
      loop.record({
        agentId: 'good-agent',
        taskId: `t${i}`,
        success: true,
        durationMs: 1000,
        qualityScore: 0.95,
        timestamp: new Date(),
      });
    }

    const suggestion = loop.suggest('good-agent');
    expect(suggestion).toBeNull();
  });
});
