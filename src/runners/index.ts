/**
 * GOD-SWARM ULTRA — Runner Framework
 * Distributed task execution engine
 */

import { randomUUID } from 'crypto';
import type { Task, TaskOutput, Runner } from '../swarm/types.js';

export interface JobTelemetry {
  jobId: string;
  taskId: string;
  runnerId: string;
  startTime: Date;
  endTime?: Date;
  cpuUsagePercent?: number;
  memoryMb?: number;
  exitCode?: number;
  logs: string[];
}

export interface SandboxConfig {
  maxMemoryMb: number;
  maxCpuPercent: number;
  timeoutMs: number;
  allowNetworkAccess: boolean;
  allowFileSystemAccess: boolean;
  workingDirectory?: string;
}

const DEFAULT_SANDBOX: SandboxConfig = {
  maxMemoryMb: 512,
  maxCpuPercent: 50,
  timeoutMs: 60000,
  allowNetworkAccess: true,
  allowFileSystemAccess: false,
};

export type JobHandler = (task: Task, sandbox: SandboxConfig) => Promise<TaskOutput>;

export class SwarmRunner {
  private runner: Runner;
  private handlers = new Map<string, JobHandler>();
  private activeJobs = new Map<string, JobTelemetry>();
  private completedJobs: JobTelemetry[] = [];

  constructor(name: string, tags: string[] = []) {
    this.runner = {
      id: randomUUID(),
      name,
      status: 'available',
      capacity: {
        maxConcurrentJobs: 5,
        currentJobs: 0,
        cpuCores: 4,
        memoryGb: 8,
        hasGpu: false,
      },
      tags,
      lastHeartbeat: new Date(),
    };
  }

  get info(): Runner {
    return {
      id: this.runner.id,
      name: this.runner.name,
      status: this.runner.status,
      capacity: {
        ...this.runner.capacity,
      },
      tags: [...this.runner.tags],
      lastHeartbeat: new Date(this.runner.lastHeartbeat),
    };
  }

  get id(): string {
    return this.runner.id;
  }

  /**
   * Register a handler for a specific task type
   */
  registerHandler(taskType: string, handler: JobHandler): void {
    this.handlers.set(taskType, handler);
  }

  /**
   * Execute a task in the sandbox
   */
  async execute(task: Task, sandboxConfig?: Partial<SandboxConfig>): Promise<TaskOutput> {
    if (this.runner.status !== 'available' && this.runner.status !== 'busy') {
      throw new Error(`Runner ${this.runner.id} is not available (${this.runner.status})`);
    }

    if (this.runner.capacity.currentJobs >= this.runner.capacity.maxConcurrentJobs) {
      throw new Error(`Runner ${this.runner.id} at capacity`);
    }

    const sandbox = { ...DEFAULT_SANDBOX, ...sandboxConfig };
    const telemetry: JobTelemetry = {
      jobId: randomUUID(),
      taskId: task.id,
      runnerId: this.runner.id,
      startTime: new Date(),
      logs: [],
    };

    this.activeJobs.set(telemetry.jobId, telemetry);
    this.runner.capacity.currentJobs++;
    this.runner.status = 'busy';

    try {
      const handler = this.handlers.get(task.type);
      let output: TaskOutput;

      if (handler) {
        output = await this.executeWithTimeout(
          handler(task, sandbox),
          sandbox.timeoutMs,
          telemetry
        );
      } else {
        // Default mock execution
        output = await this.defaultExecute(task, telemetry);
      }

      telemetry.endTime = new Date();
      telemetry.exitCode = 0;
      telemetry.logs.push(`[Runner] Job ${telemetry.jobId} completed successfully`);

      return output;
    } catch (err) {
      telemetry.endTime = new Date();
      telemetry.exitCode = 1;
      telemetry.logs.push(
        `[Runner] Job ${telemetry.jobId} failed: ${err instanceof Error ? err.message : String(err)}`
      );

      return {
        error: err instanceof Error ? err.message : String(err),
        logs: telemetry.logs,
        metrics: { startTime: telemetry.startTime, endTime: telemetry.endTime },
      };
    } finally {
      this.activeJobs.delete(telemetry.jobId);
      this.completedJobs.push(telemetry);
      this.runner.capacity.currentJobs--;
      if (this.runner.capacity.currentJobs === 0) {
        this.runner.status = 'available';
      }
      // Keep last 500 completed jobs
      if (this.completedJobs.length > 500) {
        this.completedJobs.shift();
      }
    }
  }

  private async executeWithTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    telemetry: JobTelemetry
  ): Promise<T> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error(`Job timed out after ${timeoutMs}ms`)),
        timeoutMs
      );
    });
    telemetry.logs.push(`[Runner] Executing with ${timeoutMs}ms timeout`);
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    }
  }

  private async defaultExecute(task: Task, telemetry: JobTelemetry): Promise<TaskOutput> {
    telemetry.logs.push(`[Runner] Default execution for task type: ${task.type}`);
    telemetry.logs.push(`[Runner] Task: ${task.title}`);

    // Simulate execution time
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
      result: {
        taskId: task.id,
        type: task.type,
        message: `Task "${task.title}" executed by runner ${this.runner.id}`,
      },
      logs: [...telemetry.logs],
      metrics: {
        startTime: telemetry.startTime,
        endTime: new Date(),
        durationMs: Date.now() - telemetry.startTime.getTime(),
      },
    };
  }

  getActiveJobs(): JobTelemetry[] {
    return Array.from(this.activeJobs.values());
  }

  getCompletedJobs(): JobTelemetry[] {
    return [...this.completedJobs];
  }

  getMetrics(): {
    totalJobsExecuted: number;
    successRate: number;
    avgDurationMs: number;
    currentLoad: number;
  } {
    const completed = this.completedJobs;
    const successful = completed.filter(j => j.exitCode === 0).length;
    const durations = completed
      .filter(j => j.endTime)
      .map(j => j.endTime!.getTime() - j.startTime.getTime());

    return {
      totalJobsExecuted: completed.length,
      successRate: completed.length > 0 ? successful / completed.length : 1,
      avgDurationMs:
        durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0,
      currentLoad:
        this.runner.capacity.maxConcurrentJobs > 0
          ? this.runner.capacity.currentJobs / this.runner.capacity.maxConcurrentJobs
          : 0,
    };
  }
}

/**
 * Runner Pool — manages multiple runners
 */
export class RunnerPool {
  private runners = new Map<string, SwarmRunner>();

  add(runner: SwarmRunner): void {
    this.runners.set(runner.id, runner);
  }

  remove(id: string): void {
    this.runners.delete(id);
  }

  getAvailable(): SwarmRunner | null {
    for (const runner of this.runners.values()) {
      if (
        runner.info.status === 'available' &&
        runner.info.capacity.currentJobs < runner.info.capacity.maxConcurrentJobs
      ) {
        return runner;
      }
    }
    return null;
  }

  async execute(task: Task): Promise<TaskOutput> {
    const runner = this.getAvailable();
    if (!runner) {
      throw new Error('No available runners in pool');
    }
    return runner.execute(task);
  }

  listRunners(): Runner[] {
    return Array.from(this.runners.values()).map(r => r.info);
  }

  getPoolMetrics(): Record<string, unknown> {
    const metrics = Array.from(this.runners.values()).map(r => r.getMetrics());
    const totalJobs = metrics.reduce((s, m) => s + m.totalJobsExecuted, 0);
    const avgSuccess =
      metrics.length > 0 ? metrics.reduce((s, m) => s + m.successRate, 0) / metrics.length : 1;

    return {
      totalRunners: this.runners.size,
      availableRunners: Array.from(this.runners.values()).filter(r => r.info.status === 'available')
        .length,
      totalJobsExecuted: totalJobs,
      avgSuccessRate: avgSuccess,
    };
  }
}
