/**
 * GOD-SWARM ULTRA — Core Type Definitions
 * Autonomous AI Swarm Operating System
 */

// ─── Agent Types ─────────────────────────────────────────────────────────────

export type AgentType =
  | 'planner'
  | 'code-gen'
  | 'security'
  | 'devops'
  | 'research'
  | 'trading'
  | 'repair';

export type AgentStatus = 'idle' | 'running' | 'paused' | 'error' | 'terminated';

export type ExecutionStrategy = 'sequential' | 'parallel' | 'debate' | 'consensus';

export interface AgentIdentity {
  id: string;
  name: string;
  type: AgentType;
  version: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentCapabilities {
  tools: string[];
  models: string[];
  maxConcurrentTasks: number;
  supportedLanguages?: string[];
}

export interface LearningPolicy {
  enabled: boolean;
  evaluationInterval: number; // ms
  minSamplesForUpdate: number;
  improvementThreshold: number; // 0-1
}

export interface SwarmAgent {
  identity: AgentIdentity;
  capabilities: AgentCapabilities;
  memoryNamespace: string;
  executionStrategy: ExecutionStrategy;
  learningPolicy: LearningPolicy;
  status: AgentStatus;
  metadata: Record<string, unknown>;
}

// ─── Task Types ───────────────────────────────────────────────────────────────

export type TaskStatus =
  | 'pending'
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'retrying';

export type TaskPriority = 'critical' | 'high' | 'normal' | 'low';

export interface TaskInput {
  prompt?: string;
  data?: unknown;
  files?: string[];
  context?: Record<string, unknown>;
}

export interface TaskOutput {
  result?: unknown;
  artifacts?: Artifact[];
  logs?: string[];
  metrics?: TaskMetrics;
  error?: string;
}

export interface Artifact {
  id: string;
  type: 'file' | 'code' | 'report' | 'image' | 'data';
  name: string;
  content?: string;
  path?: string;
  mimeType?: string;
  size?: number;
}

export interface TaskMetrics {
  startTime: Date;
  endTime?: Date;
  durationMs?: number;
  tokensUsed?: number;
  costUsd?: number;
  modelUsed?: string;
}

export interface Task {
  id: string;
  parentId?: string;
  workflowId?: string;
  title: string;
  description: string;
  type: AgentType;
  priority: TaskPriority;
  status: TaskStatus;
  input: TaskInput;
  output?: TaskOutput;
  assignedAgentId?: string;
  runnerId?: string;
  retryCount: number;
  maxRetries: number;
  createdAt: Date;
  updatedAt: Date;
  scheduledAt?: Date;
  timeoutMs?: number;
}

// ─── Task Graph ───────────────────────────────────────────────────────────────

export interface TaskNode {
  task: Task;
  dependencies: string[]; // task IDs this task depends on
  dependents: string[]; // task IDs that depend on this task
}

export interface TaskGraph {
  id: string;
  workflowId: string;
  nodes: Map<string, TaskNode>;
  rootTaskIds: string[];
  status: 'building' | 'ready' | 'running' | 'completed' | 'failed';
  createdAt: Date;
}

// ─── Workflow Types ───────────────────────────────────────────────────────────

export type TriggerType = 'manual' | 'schedule' | 'webhook' | 'event' | 'git-push' | 'pr-open';

export interface WorkflowStep {
  id: string;
  name: string;
  agentType: AgentType;
  priority?: TaskPriority;
  input: TaskInput;
  dependsOn?: string[];
  timeoutMs?: number;
  retryPolicy?: { maxRetries: number; backoffMs: number };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: { type: TriggerType; config?: Record<string, unknown> };
  steps: WorkflowStep[];
  version: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  taskGraph?: TaskGraph;
  startedAt: Date;
  completedAt?: Date;
  triggeredBy?: string;
  error?: string;
}

// ─── Model Router Types ───────────────────────────────────────────────────────

export type ModelProvider = 'openai' | 'anthropic' | 'local' | 'specialized';

export interface ModelConfig {
  provider: ModelProvider;
  modelId: string;
  contextWindow: number;
  maxOutputTokens: number;
  costPer1kInputTokens: number;
  costPer1kOutputTokens: number;
  avgLatencyMs: number;
  capabilities: string[];
}

export interface RoutingCriteria {
  preferLowCost?: boolean;
  preferLowLatency?: boolean;
  requiresReasoning?: boolean;
  requiresCodeGen?: boolean;
  maxCostUsd?: number;
  maxLatencyMs?: number;
  preferredProvider?: ModelProvider;
}

// ─── Runner Types ─────────────────────────────────────────────────────────────

export type RunnerStatus = 'available' | 'busy' | 'offline' | 'draining';

export interface RunnerCapacity {
  maxConcurrentJobs: number;
  currentJobs: number;
  cpuCores: number;
  memoryGb: number;
  hasGpu: boolean;
}

export interface Runner {
  id: string;
  name: string;
  status: RunnerStatus;
  capacity: RunnerCapacity;
  tags: string[];
  endpoint?: string;
  lastHeartbeat: Date;
  metadata?: Record<string, unknown>;
}

// ─── Memory Types ─────────────────────────────────────────────────────────────

export interface MemoryEntry {
  id: string;
  namespace: string;
  content: string;
  embedding?: number[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  expiresAt?: Date;
}

export interface MemorySearchResult {
  entry: MemoryEntry;
  score: number;
}

// ─── Swarm Intelligence Types ─────────────────────────────────────────────────

export interface SwarmConsensus {
  question: string;
  responses: Array<{ agentId: string; response: unknown; confidence: number }>;
  finalAnswer?: unknown;
  consensusScore?: number;
}

export interface SwarmDebate {
  topic: string;
  rounds: Array<{
    round: number;
    arguments: Array<{ agentId: string; position: string; evidence: string }>;
  }>;
  conclusion?: string;
}

// ─── Event Types ──────────────────────────────────────────────────────────────

export type SwarmEventType =
  | 'agent.created'
  | 'agent.started'
  | 'agent.completed'
  | 'agent.failed'
  | 'task.queued'
  | 'task.started'
  | 'task.completed'
  | 'task.failed'
  | 'task.cancelled'
  | 'task.retrying'
  | 'task.updated'
  | 'workflow.started'
  | 'workflow.completed'
  | 'workflow.failed'
  | 'runner.connected'
  | 'runner.disconnected'
  | 'system.error'
  | 'system.warning';

export interface SwarmEvent {
  id: string;
  type: SwarmEventType;
  payload: unknown;
  timestamp: Date;
  source: string;
}
