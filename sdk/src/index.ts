/**
 * GOD-SWARM ULTRA — JavaScript SDK
 * Client SDK for external consumption
 */

export interface SDKConfig {
  apiUrl: string;
  apiKey: string;
  timeout?: number;
  retries?: number;
}

export interface AgentRunRequest {
  goal: string;
  agentType?: string;
  context?: Record<string, unknown>;
  priority?: 'critical' | 'high' | 'normal' | 'low';
}

export interface AgentRunResult {
  runId: string;
  status: string;
  result?: unknown;
  error?: string;
  logs?: string[];
  durationMs?: number;
}

export interface WorkflowTriggerRequest {
  workflowId?: string;
  goal?: string;
  context?: Record<string, unknown>;
  triggeredBy?: string;
}

export interface WorkflowRunResult {
  runId: string;
  workflowId: string;
  status: string;
  startedAt: string;
}

export interface StreamEvent {
  type: 'log' | 'progress' | 'result' | 'error';
  data: unknown;
  timestamp: string;
}

/**
 * GOD-SWARM ULTRA SDK Client
 */
export class GodSwarmClient {
  private config: Required<SDKConfig>;

  constructor(config: SDKConfig) {
    this.config = {
      timeout: 30000,
      retries: 3,
      ...config,
    };
  }

  // ─── Agent Methods ─────────────────────────────────────────────────────────

  /**
   * Run an agent with a goal description
   */
  async runAgent(request: AgentRunRequest): Promise<AgentRunResult> {
    return this.post<AgentRunResult>('/api/swarm/agents/run', request);
  }

  /**
   * Get the status of an agent run
   */
  async getAgentRunStatus(runId: string): Promise<AgentRunResult> {
    return this.get<AgentRunResult>(`/api/swarm/runs/${runId}`);
  }

  /**
   * List available agents
   */
  async listAgents(): Promise<Array<{ id: string; name: string; type: string; status: string }>> {
    return this.get('/api/swarm/agents');
  }

  // ─── Workflow Methods ──────────────────────────────────────────────────────

  /**
   * Trigger a workflow
   */
  async triggerWorkflow(request: WorkflowTriggerRequest): Promise<WorkflowRunResult> {
    return this.post<WorkflowRunResult>('/api/swarm/workflows/trigger', request);
  }

  /**
   * Get workflow run status
   */
  async getWorkflowStatus(runId: string): Promise<WorkflowRunResult> {
    return this.get<WorkflowRunResult>(`/api/swarm/workflows/runs/${runId}`);
  }

  /**
   * List workflow templates
   */
  async listWorkflows(): Promise<Array<{ id: string; name: string; description: string }>> {
    return this.get('/api/swarm/workflows');
  }

  // ─── Natural Language Interface ────────────────────────────────────────────

  /**
   * Execute a natural language goal using the swarm
   */
  async execute(goal: string, context?: Record<string, unknown>): Promise<AgentRunResult> {
    return this.runAgent({ goal, context });
  }

  /**
   * Stream events from a running workflow
   */
  async *streamWorkflowEvents(runId: string): AsyncGenerator<StreamEvent> {
    // In a real implementation, this would use SSE or WebSocket
    const pollInterval = 1000;
    let completed = false;

    while (!completed) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      try {
        const status = await this.getWorkflowStatus(runId);

        yield {
          type: 'progress',
          data: status,
          timestamp: new Date().toISOString(),
        };

        if (['completed', 'failed', 'cancelled'].includes(status.status)) {
          completed = true;
          yield {
            type: status.status === 'completed' ? 'result' : 'error',
            data: status,
            timestamp: new Date().toISOString(),
          };
        }
      } catch (err) {
        yield {
          type: 'error',
          data: { error: err instanceof Error ? err.message : String(err) },
          timestamp: new Date().toISOString(),
        };
        completed = true;
      }
    }
  }

  // ─── System Methods ────────────────────────────────────────────────────────

  /**
   * Get system metrics
   */
  async getMetrics(): Promise<Record<string, number>> {
    return this.get('/api/swarm/metrics');
  }

  /**
   * Health check
   */
  async health(): Promise<{ status: string; version: string }> {
    return this.get('/api/health');
  }

  // ─── HTTP Helpers ──────────────────────────────────────────────────────────

  private async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.config.apiUrl}${path}`;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        let response: Response;
        try {
          response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.config.apiKey}`,
              'X-GOD-SWARM-Version': '1.0.0',
            },
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeoutId);
        }

        if (!response.ok) {
          const errorData = (await response.json().catch(() => ({}))) as Record<string, unknown>;
          throw new Error(
            (errorData['message'] as string) ?? `HTTP ${response.status}: ${response.statusText}`
          );
        }

        return response.json() as Promise<T>;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        if (attempt < this.config.retries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 500));
        }
      }
    }

    throw lastError ?? new Error('Request failed after all retries');
  }
}

// ─── Factory Functions ────────────────────────────────────────────────────────

/**
 * Create a GOD-SWARM client with default configuration
 */
export function createClient(apiUrl: string, apiKey: string): GodSwarmClient {
  return new GodSwarmClient({ apiUrl, apiKey });
}

// Default export
export default GodSwarmClient;
