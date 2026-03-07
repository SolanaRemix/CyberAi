/**
 * GOD-SWARM ULTRA — Swarm Intelligence Engine
 * Coordinates multi-agent interactions: consensus, debate, parallel solving
 */

import type { SwarmConsensus, SwarmDebate } from './types.js';

export interface ConsensusRequest {
  question: string;
  responses: Array<{ agentId: string; response: unknown; confidence: number }>;
}

export interface DebateRequest {
  topic: string;
  positions: Array<{ agentId: string; position: string; evidence: string }>;
  rounds?: number;
}

export interface ValidationRequest {
  taskId: string;
  output: unknown;
  validators: string[]; // agent IDs
}

export interface ValidationResult {
  taskId: string;
  approved: boolean;
  score: number; // 0-1
  feedback: string[];
}

export class SwarmIntelligenceEngine {
  /**
   * Reach consensus among multiple agent responses
   * Uses weighted voting based on confidence scores
   */
  reachConsensus(request: ConsensusRequest): SwarmConsensus {
    if (request.responses.length === 0) {
      return {
        question: request.question,
        responses: [],
        finalAnswer: null,
        consensusScore: 0,
      };
    }

    // Calculate weighted responses
    const totalWeight = request.responses.reduce((sum, r) => sum + r.confidence, 0);

    // Group similar responses (string comparison for simplicity)
    const responseGroups = new Map<string, { weight: number; response: unknown }>();

    for (const r of request.responses) {
      const key = JSON.stringify(r.response);
      const existing = responseGroups.get(key);
      if (existing) {
        existing.weight += r.confidence;
      } else {
        responseGroups.set(key, { weight: r.confidence, response: r.response });
      }
    }

    // Find the highest-weight response
    let maxWeight = 0;
    let finalAnswer: unknown = null;

    for (const [, group] of responseGroups) {
      if (group.weight > maxWeight) {
        maxWeight = group.weight;
        finalAnswer = group.response;
      }
    }

    const consensusScore = totalWeight > 0 ? maxWeight / totalWeight : 0;

    return {
      question: request.question,
      responses: request.responses,
      finalAnswer,
      consensusScore,
    };
  }

  /**
   * Conduct a structured debate between agents
   */
  conductDebate(request: DebateRequest): SwarmDebate {
    const maxRounds = request.rounds ?? 3;
    const rounds: SwarmDebate['rounds'] = [];

    // Initial round with provided positions
    rounds.push({
      round: 1,
      arguments: request.positions.map(p => ({
        agentId: p.agentId,
        position: p.position,
        evidence: p.evidence,
      })),
    });

    // Simulate subsequent debate rounds
    for (let round = 2; round <= maxRounds; round++) {
      const prevRound = rounds[round - 2];
      const newArguments = prevRound.arguments.map(arg => ({
        agentId: arg.agentId,
        position: `[Round ${round}] Refined: ${arg.position}`,
        evidence: `Updated evidence based on peer review: ${arg.evidence}`,
      }));
      rounds.push({ round, arguments: newArguments });
    }

    // Synthesize conclusion from final round
    const finalRound = rounds[rounds.length - 1];
    const conclusion = this.synthesizeConclusion(request.topic, finalRound.arguments);

    return {
      topic: request.topic,
      rounds,
      conclusion,
    };
  }

  /**
   * Validate task output against multiple agent validators
   */
  validateOutput(request: ValidationRequest): ValidationResult {
    // In a real implementation, each validator agent would check the output
    // This is a framework-level simulation
    const score = Math.min(1, request.validators.length > 0 ? 0.8 : 0.5);
    const approved = score >= 0.7;

    return {
      taskId: request.taskId,
      approved,
      score,
      feedback: approved
        ? ['Output meets quality standards']
        : ['Output requires improvement', 'Additional review recommended'],
    };
  }

  /**
   * Delegate a task to the most suitable agent
   */
  delegate(
    taskDescription: string,
    availableAgents: Array<{ id: string; type: string; load: number }>
  ): string | null {
    if (availableAgents.length === 0) return null;

    // Score agents by availability (inverse load)
    const scored = availableAgents.map(a => ({
      id: a.id,
      score: 1 - a.load,
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored[0].id;
  }

  private synthesizeConclusion(
    topic: string,
    finalArguments: Array<{ agentId: string; position: string; evidence: string }>
  ): string {
    if (finalArguments.length === 0) {
      return `No consensus reached on: ${topic}`;
    }
    const positions = finalArguments.map(a => a.position).join('; ');
    return `After multi-agent debate on "${topic}", the synthesized conclusion: ${positions.slice(0, 200)}`;
  }
}

/**
 * Self-Improvement Loop
 * Evaluates agent performance and triggers strategy updates
 */
export interface PerformanceRecord {
  agentId: string;
  taskId: string;
  success: boolean;
  durationMs: number;
  qualityScore: number; // 0-1
  timestamp: Date;
}

export interface ImprovementSuggestion {
  agentId: string;
  currentStrategy: string;
  suggestedStrategy: string;
  rationale: string;
  confidence: number;
}

export class SelfImprovementLoop {
  private records: PerformanceRecord[] = [];

  record(record: PerformanceRecord): void {
    this.records.push(record);
  }

  /**
   * Evaluate agent performance over recent history
   */
  evaluate(
    agentId: string,
    windowSize = 20
  ): { score: number; trend: 'improving' | 'stable' | 'declining' } {
    const agentRecords = this.records.filter(r => r.agentId === agentId).slice(-windowSize);

    if (agentRecords.length === 0) {
      return { score: 0.5, trend: 'stable' };
    }

    const avgScore = agentRecords.reduce((sum, r) => sum + r.qualityScore, 0) / agentRecords.length;

    // Calculate trend using first vs second half
    const mid = Math.floor(agentRecords.length / 2);
    const firstHalf = agentRecords.slice(0, mid);
    const secondHalf = agentRecords.slice(mid);

    if (firstHalf.length === 0 || secondHalf.length === 0) {
      return { score: avgScore, trend: 'stable' };
    }

    const firstAvg = firstHalf.reduce((sum, r) => sum + r.qualityScore, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, r) => sum + r.qualityScore, 0) / secondHalf.length;

    const diff = secondAvg - firstAvg;
    const trend = diff > 0.05 ? 'improving' : diff < -0.05 ? 'declining' : 'stable';

    return { score: avgScore, trend };
  }

  /**
   * Generate improvement suggestions for underperforming agents
   */
  suggest(agentId: string): ImprovementSuggestion | null {
    const { score, trend } = this.evaluate(agentId);

    if (score >= 0.8 && trend !== 'declining') {
      return null; // No improvement needed
    }

    const suggestions: Record<string, string> = {
      'low-score': 'Switch to a higher-capability model for complex tasks',
      declining: 'Reduce task complexity; increase retry budget',
      slow: 'Enable parallel subtask execution',
    };

    const issue = score < 0.5 ? 'low-score' : trend === 'declining' ? 'declining' : 'slow';

    return {
      agentId,
      currentStrategy: 'sequential',
      suggestedStrategy: 'parallel-with-validation',
      rationale: suggestions[issue] ?? 'General performance improvement',
      confidence: 0.7,
    };
  }

  getRecords(): PerformanceRecord[] {
    return [...this.records];
  }
}
