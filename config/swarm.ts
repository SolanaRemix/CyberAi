/**
 * GOD-SWARM ULTRA — Swarm Configuration
 * Default configuration for the GOD-SWARM ULTRA platform
 */

import type { SwarmConfig } from '../src/swarm/engine.js';
import type { ControlPlaneConfig } from '../src/control-plane/index.js';

export const defaultSwarmConfig: SwarmConfig = {
  name: 'GOD-SWARM ULTRA',
  version: '1.0.0',
  maxConcurrentWorkflows: 10,
  defaultTimeout: 300000, // 5 minutes
  enableSelfImprovement: true,
};

export const defaultControlPlaneConfig: ControlPlaneConfig = {
  maxActiveWorkflows: 50,
  taskTimeoutMs: 300000,
  heartbeatIntervalMs: 30000,
  enableTelemetry: true,
};

export const modelRoutingConfig = {
  defaultProvider: 'openai' as const,
  fallbackProvider: 'anthropic' as const,
  taskTypeRouting: {
    'code-gen': { requiresCodeGen: true, preferLowLatency: false },
    security: { requiresReasoning: true, preferLowCost: false },
    research: { preferLowCost: true },
    trading: { requiresReasoning: true, maxLatencyMs: 5000 },
    planner: { requiresReasoning: true },
    devops: { preferLowCost: true },
    repair: { requiresReasoning: true, preferLowLatency: true },
  },
};

export const agentDefaults = {
  planner: {
    maxConcurrentTasks: 5,
    defaultModel: 'gpt-4o',
    learningEnabled: true,
  },
  'code-gen': {
    maxConcurrentTasks: 2,
    defaultModel: 'gpt-4o',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Solidity'],
  },
  security: {
    maxConcurrentTasks: 3,
    defaultModel: 'claude-3-5-sonnet-20241022',
    scanners: ['codeql', 'semgrep', 'trivy', 'secret-scanner'],
  },
  devops: {
    maxConcurrentTasks: 2,
    defaultModel: 'gpt-4o',
    platforms: ['kubernetes', 'docker', 'aws', 'gcp', 'digitalocean'],
  },
  research: {
    maxConcurrentTasks: 4,
    defaultModel: 'gpt-4o',
    sources: ['web', 'arxiv', 'github', 'docs'],
  },
  trading: {
    maxConcurrentTasks: 1,
    defaultModel: 'gpt-4o',
    networks: ['solana', 'ethereum', 'base', 'arbitrum'],
    riskLimit: 'medium' as const,
  },
  repair: {
    maxConcurrentTasks: 3,
    defaultModel: 'gpt-4o',
    autoApplyThreshold: 0.8, // confidence score required for auto-apply
  },
};

export const marketplaceConfig = {
  enabled: true,
  stripePublicKey: process.env['STRIPE_PUBLIC_KEY'] ?? '',
  revenueSharePercent: 30, // 30% platform fee
  minWithdrawalUsd: 50,
};

export const securityConfig = {
  jwtSecret: process.env['JWT_SECRET'] ?? 'dev-secret-change-in-production',
  jwtExpirySeconds: 3600,
  oauthProviders: ['github', 'google'],
  maxFailedLogins: 5,
  rateLimitRequestsPerMinute: 60,
};

export const infrastructureConfig = {
  database: {
    url: process.env['DATABASE_URL'] ?? 'postgresql://localhost:5432/cyberai',
    poolSize: 10,
  },
  redis: {
    url: process.env['REDIS_URL'] ?? 'redis://localhost:6379',
  },
  vectorDb: {
    provider: 'pgvector' as 'pgvector' | 'qdrant',
    url: process.env['VECTOR_DB_URL'] ?? 'postgresql://localhost:5432/cyberai',
  },
  storage: {
    provider: 's3' as 's3' | 'gcs' | 'local',
    bucket: process.env['STORAGE_BUCKET'] ?? 'cyberai-artifacts',
  },
};
