/**
 * GOD-SWARM ULTRA — Memory System
 * Vector memory store for agent learning and retrieval
 */

import { randomUUID } from 'crypto';
import type { MemoryEntry, MemorySearchResult } from '../swarm/types.js';

/**
 * In-memory vector store (production would use pgvector/Qdrant)
 * Uses cosine-similarity-like scoring via keyword overlap
 */
export class VectorMemoryStore {
  private entries = new Map<string, MemoryEntry>();

  async store(
    namespace: string,
    content: string,
    metadata: Record<string, unknown> = {},
    ttlMs?: number
  ): Promise<MemoryEntry> {
    const entry: MemoryEntry = {
      id: randomUUID(),
      namespace,
      content,
      metadata,
      createdAt: new Date(),
      expiresAt: ttlMs ? new Date(Date.now() + ttlMs) : undefined,
    };

    this.entries.set(entry.id, entry);
    return entry;
  }

  async retrieve(id: string): Promise<MemoryEntry | null> {
    const entry = this.entries.get(id);
    if (!entry) return null;

    if (entry.expiresAt && entry.expiresAt < new Date()) {
      this.entries.delete(id);
      return null;
    }

    return entry;
  }

  async search(namespace: string, query: string, topK = 5): Promise<MemorySearchResult[]> {
    const queryTokens = this.tokenize(query);
    const results: MemorySearchResult[] = [];

    for (const entry of this.entries.values()) {
      // Skip expired entries
      if (entry.expiresAt && entry.expiresAt < new Date()) {
        this.entries.delete(entry.id);
        continue;
      }

      // Filter by namespace
      if (entry.namespace !== namespace && !namespace.startsWith('*')) {
        continue;
      }

      const score = this.cosineLikeScore(queryTokens, this.tokenize(entry.content));
      if (score > 0) {
        results.push({ entry, score });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  async deleteByNamespace(namespace: string): Promise<number> {
    let count = 0;
    for (const [id, entry] of this.entries) {
      if (entry.namespace === namespace) {
        this.entries.delete(id);
        count++;
      }
    }
    return count;
  }

  async delete(id: string): Promise<boolean> {
    return this.entries.delete(id);
  }

  getStats(): { totalEntries: number; namespaces: string[] } {
    const namespaces = new Set(Array.from(this.entries.values()).map(e => e.namespace));
    return {
      totalEntries: this.entries.size,
      namespaces: Array.from(namespaces),
    };
  }

  private tokenize(text: string): Map<string, number> {
    const tokens = new Map<string, number>();
    const words = text.toLowerCase().match(/\b\w+\b/g) ?? [];

    for (const word of words) {
      if (word.length > 2) {
        tokens.set(word, (tokens.get(word) ?? 0) + 1);
      }
    }

    return tokens;
  }

  private cosineLikeScore(a: Map<string, number>, b: Map<string, number>): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (const [term, count] of a) {
      normA += count * count;
      if (b.has(term)) {
        dotProduct += count * (b.get(term) ?? 0);
      }
    }

    for (const [, count] of b) {
      normB += count * count;
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

/**
 * Agent Memory — provides a namespace-scoped interface for an agent
 */
export class AgentMemory {
  constructor(
    private store: VectorMemoryStore,
    private namespace: string
  ) {}

  async remember(content: string, metadata: Record<string, unknown> = {}): Promise<MemoryEntry> {
    return this.store.store(this.namespace, content, metadata);
  }

  async recall(query: string, topK = 5): Promise<MemorySearchResult[]> {
    return this.store.search(this.namespace, query, topK);
  }

  async forget(id: string): Promise<boolean> {
    return this.store.delete(id);
  }

  async clearAll(): Promise<number> {
    return this.store.deleteByNamespace(this.namespace);
  }
}

/**
 * Episodic Memory — stores task execution episodes for learning
 */
export interface Episode {
  id: string;
  agentId: string;
  taskId: string;
  taskDescription: string;
  actions: string[];
  outcome: 'success' | 'failure' | 'partial';
  qualityScore: number;
  lessons: string[];
  timestamp: Date;
}

export class EpisodicMemory {
  private episodes: Episode[] = [];

  record(episode: Omit<Episode, 'id' | 'timestamp'>): Episode {
    const full: Episode = {
      ...episode,
      id: randomUUID(),
      timestamp: new Date(),
    };
    this.episodes.push(full);

    // Keep last 10000 episodes
    if (this.episodes.length > 10000) {
      this.episodes.shift();
    }

    return full;
  }

  getByAgent(agentId: string, limit = 50): Episode[] {
    return this.episodes.filter(e => e.agentId === agentId).slice(-limit);
  }

  getLessonsForTask(taskDescription: string, limit = 10): string[] {
    const keywords = taskDescription.toLowerCase().split(/\s+/);
    const relevant = this.episodes.filter(e =>
      keywords.some(k => e.taskDescription.toLowerCase().includes(k))
    );

    const lessons = relevant.flatMap(e => e.lessons).filter((l, i, arr) => arr.indexOf(l) === i); // unique

    return lessons.slice(0, limit);
  }

  getSuccessRate(agentId: string, windowSize = 100): number {
    const recent = this.getByAgent(agentId, windowSize);
    if (recent.length === 0) return 0.5;

    const successes = recent.filter(e => e.outcome === 'success').length;
    return successes / recent.length;
  }
}
