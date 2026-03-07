/**
 * GOD-SWARM ULTRA — Tool Execution Layer
 * Unified interface for all agent tools
 */

export interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: Record<string, unknown>;
}

export type ToolExecutor<TArgs = Record<string, unknown>, TResult = unknown> = (
  args: TArgs
) => Promise<ToolResult<TResult>>;

export interface ToolDefinition {
  name: string;
  description: string;
  category: 'filesystem' | 'git' | 'docker' | 'blockchain' | 'web' | 'api' | 'system';
  schema: Record<string, unknown>; // JSON Schema describing args (documentation; not validated at runtime)
  executor: ToolExecutor;
}

/**
 * Tool Registry — manages all available tools
 */
export class ToolRegistry {
  private tools = new Map<string, ToolDefinition>();

  register(tool: ToolDefinition): void {
    this.tools.set(tool.name, tool);
  }

  get(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  async execute(toolName: string, args: Record<string, unknown>): Promise<ToolResult> {
    const tool = this.tools.get(toolName);
    if (!tool) {
      return { success: false, error: `Tool "${toolName}" not found` };
    }

    try {
      return await tool.executor(args);
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  listByCategory(category: ToolDefinition['category']): ToolDefinition[] {
    return Array.from(this.tools.values()).filter(t => t.category === category);
  }

  listAll(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }
}

/**
 * Built-in tool implementations
 */

// Filesystem Tools
export const filesystemTools: ToolDefinition[] = [
  {
    name: 'fs.read',
    description: 'Read a file from the filesystem',
    category: 'filesystem',
    schema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'] },
    executor: async args => {
      // In production: use actual fs.readFile
      const path = args['path'] as string;
      return { success: true, data: `[Content of ${path}]` };
    },
  },
  {
    name: 'fs.write',
    description: 'Write content to a file',
    category: 'filesystem',
    schema: {
      type: 'object',
      properties: { path: { type: 'string' }, content: { type: 'string' } },
      required: ['path', 'content'],
    },
    executor: async args => {
      const path = args['path'] as string;
      return { success: true, data: { path, bytesWritten: String(args['content']).length } };
    },
  },
  {
    name: 'fs.list',
    description: 'List files in a directory',
    category: 'filesystem',
    schema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'] },
    executor: async args => {
      const path = args['path'] as string;
      return { success: true, data: [`${path}/file1.ts`, `${path}/file2.ts`] };
    },
  },
];

// Git Tools
export const gitTools: ToolDefinition[] = [
  {
    name: 'git.status',
    description: 'Get repository status',
    category: 'git',
    schema: { type: 'object', properties: { repoPath: { type: 'string' } } },
    executor: async _args => {
      return { success: true, data: { branch: 'main', changes: [], status: 'clean' } };
    },
  },
  {
    name: 'git.commit',
    description: 'Create a git commit',
    category: 'git',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        files: { type: 'array', items: { type: 'string' } },
      },
      required: ['message'],
    },
    executor: async args => {
      const message = args['message'] as string;
      return { success: true, data: { commitHash: 'abc123', message } };
    },
  },
  {
    name: 'git.push',
    description: 'Push commits to remote',
    category: 'git',
    schema: {
      type: 'object',
      properties: { remote: { type: 'string' }, branch: { type: 'string' } },
    },
    executor: async args => {
      return { success: true, data: { pushed: true, remote: args['remote'] ?? 'origin' } };
    },
  },
];

// Docker Tools
export const dockerTools: ToolDefinition[] = [
  {
    name: 'docker.build',
    description: 'Build a Docker image',
    category: 'docker',
    schema: {
      type: 'object',
      properties: {
        tag: { type: 'string' },
        dockerfile: { type: 'string' },
        context: { type: 'string' },
      },
      required: ['tag'],
    },
    executor: async args => {
      const tag = args['tag'] as string;
      return {
        success: true,
        data: { imageId: `sha256:${Math.random().toString(36).slice(2, 14)}`, tag },
      };
    },
  },
  {
    name: 'docker.run',
    description: 'Run a Docker container',
    category: 'docker',
    schema: {
      type: 'object',
      properties: { image: { type: 'string' }, command: { type: 'string' } },
      required: ['image'],
    },
    executor: async args => {
      const image = args['image'] as string;
      return {
        success: true,
        data: { containerId: `container-${Math.random().toString(36).slice(2, 10)}`, image },
      };
    },
  },
];

// Web/API Tools
export const webTools: ToolDefinition[] = [
  {
    name: 'web.fetch',
    description: 'Fetch a URL and return its content',
    category: 'web',
    schema: {
      type: 'object',
      properties: { url: { type: 'string' }, method: { type: 'string' } },
      required: ['url'],
    },
    executor: async args => {
      const url = args['url'] as string;
      // In production: actual HTTP fetch
      return { success: true, data: { url, statusCode: 200, body: `[Content from ${url}]` } };
    },
  },
  {
    name: 'api.call',
    description: 'Make an API call to an external service',
    category: 'api',
    schema: {
      type: 'object',
      properties: {
        endpoint: { type: 'string' },
        method: { type: 'string' },
        headers: { type: 'object' },
        body: {},
      },
      required: ['endpoint'],
    },
    executor: async args => {
      const endpoint = args['endpoint'] as string;
      return { success: true, data: { endpoint, response: '[API response]' } };
    },
  },
];

/**
 * Create a default tool registry with all built-in tools
 */
export function createDefaultToolRegistry(): ToolRegistry {
  const registry = new ToolRegistry();

  for (const tool of [...filesystemTools, ...gitTools, ...dockerTools, ...webTools]) {
    registry.register(tool);
  }

  return registry;
}
