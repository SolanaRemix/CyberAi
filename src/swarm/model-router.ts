/**
 * GOD-SWARM ULTRA — Model Router
 * Routes tasks to optimal AI models based on cost, latency, and capability requirements
 */

import type { ModelConfig, ModelProvider, RoutingCriteria } from './types.js';

// Default model registry
const MODEL_REGISTRY: ModelConfig[] = [
  {
    provider: 'openai',
    modelId: 'gpt-4o',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    costPer1kInputTokens: 0.005,
    costPer1kOutputTokens: 0.015,
    avgLatencyMs: 3000,
    capabilities: ['reasoning', 'code-gen', 'analysis', 'chat'],
  },
  {
    provider: 'openai',
    modelId: 'gpt-4o-mini',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    costPer1kInputTokens: 0.00015,
    costPer1kOutputTokens: 0.0006,
    avgLatencyMs: 1500,
    capabilities: ['chat', 'analysis', 'code-gen'],
  },
  {
    provider: 'openai',
    modelId: 'o1-mini',
    contextWindow: 128000,
    maxOutputTokens: 65536,
    costPer1kInputTokens: 0.003,
    costPer1kOutputTokens: 0.012,
    avgLatencyMs: 8000,
    capabilities: ['reasoning', 'math', 'code-gen'],
  },
  {
    provider: 'anthropic',
    modelId: 'claude-3-5-sonnet-20241022',
    contextWindow: 200000,
    maxOutputTokens: 8192,
    costPer1kInputTokens: 0.003,
    costPer1kOutputTokens: 0.015,
    avgLatencyMs: 2500,
    capabilities: ['reasoning', 'code-gen', 'analysis', 'chat', 'security'],
  },
  {
    provider: 'anthropic',
    modelId: 'claude-3-haiku-20240307',
    contextWindow: 200000,
    maxOutputTokens: 4096,
    costPer1kInputTokens: 0.00025,
    costPer1kOutputTokens: 0.00125,
    avgLatencyMs: 1000,
    capabilities: ['chat', 'analysis'],
  },
  {
    provider: 'local',
    modelId: 'llama-3.1-70b',
    contextWindow: 131072,
    maxOutputTokens: 4096,
    costPer1kInputTokens: 0.00001,
    costPer1kOutputTokens: 0.00001,
    avgLatencyMs: 2000,
    capabilities: ['chat', 'code-gen', 'analysis'],
  },
];

export class ModelRouter {
  private registry: ModelConfig[];

  constructor(customModels?: ModelConfig[]) {
    this.registry = customModels ?? MODEL_REGISTRY;
  }

  /**
   * Select the best model for a given routing criteria
   */
  route(criteria: RoutingCriteria): ModelConfig {
    let candidates = [...this.registry];

    // Filter by preferred provider
    if (criteria.preferredProvider) {
      const providerModels = candidates.filter(m => m.provider === criteria.preferredProvider);
      if (providerModels.length > 0) {
        candidates = providerModels;
      }
    }

    // Filter by capability requirements
    if (criteria.requiresReasoning) {
      const reasoningModels = candidates.filter(m => m.capabilities.includes('reasoning'));
      if (reasoningModels.length > 0) {
        candidates = reasoningModels;
      }
    }

    if (criteria.requiresCodeGen) {
      const codeModels = candidates.filter(m => m.capabilities.includes('code-gen'));
      if (codeModels.length > 0) {
        candidates = codeModels;
      }
    }

    // Filter by cost constraint (maxCostUsd is interpreted as max USD per 1k input tokens)
    if (criteria.maxCostUsd !== undefined) {
      const affordable = candidates.filter(m => m.costPer1kInputTokens <= criteria.maxCostUsd!);
      if (affordable.length > 0) {
        candidates = affordable;
      }
    }

    // Filter by latency constraint
    if (criteria.maxLatencyMs !== undefined) {
      const fast = candidates.filter(m => m.avgLatencyMs <= criteria.maxLatencyMs!);
      if (fast.length > 0) {
        candidates = fast;
      }
    }

    if (candidates.length === 0) {
      // Fall back to the cheapest model
      return this.registry.reduce((a, b) =>
        a.costPer1kInputTokens < b.costPer1kInputTokens ? a : b
      );
    }

    // Score and rank candidates
    return this.rankCandidates(candidates, criteria)[0];
  }

  /**
   * Score models based on criteria preferences
   */
  private rankCandidates(models: ModelConfig[], criteria: RoutingCriteria): ModelConfig[] {
    const scored = models.map(m => {
      let score = 0;

      if (criteria.preferLowCost) {
        // Lower cost = higher score (normalize by max cost)
        const maxCost = Math.max(...models.map(x => x.costPer1kInputTokens));
        score += (1 - m.costPer1kInputTokens / maxCost) * 0.4;
      } else {
        score += 0.2; // neutral cost preference
      }

      if (criteria.preferLowLatency) {
        const maxLatency = Math.max(...models.map(x => x.avgLatencyMs));
        score += (1 - m.avgLatencyMs / maxLatency) * 0.4;
      } else {
        score += 0.2; // neutral latency preference
      }

      // Capability bonus
      if (criteria.requiresReasoning && m.capabilities.includes('reasoning')) {
        score += 0.2;
      }
      if (criteria.requiresCodeGen && m.capabilities.includes('code-gen')) {
        score += 0.2;
      }

      return { model: m, score };
    });

    return scored.sort((a, b) => b.score - a.score).map(s => s.model);
  }

  /**
   * Get all models for a specific provider
   */
  getModelsByProvider(provider: ModelProvider): ModelConfig[] {
    return this.registry.filter(m => m.provider === provider);
  }

  /**
   * Get all registered models
   */
  listModels(): ModelConfig[] {
    return [...this.registry];
  }

  /**
   * Register a custom model
   */
  registerModel(model: ModelConfig): void {
    const existing = this.registry.findIndex(m => m.modelId === model.modelId);
    if (existing >= 0) {
      this.registry[existing] = model;
    } else {
      this.registry.push(model);
    }
  }
}
