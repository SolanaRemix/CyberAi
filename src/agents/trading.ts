/**
 * GOD-SWARM ULTRA — Trading Agent
 * Monitors blockchain networks and executes strategies
 */

import type { AgentExecutionContext } from './base.js';
import type { TaskOutput, Artifact } from '../swarm/types.js';
import { BaseAgent } from './base.js';

export type BlockchainNetwork = 'ethereum' | 'solana' | 'base' | 'arbitrum' | 'polygon';

export interface TradingStrategy {
  id: string;
  name: string;
  network: BlockchainNetwork;
  type: 'dca' | 'momentum' | 'arbitrage' | 'liquidity-provision' | 'custom';
  parameters: Record<string, unknown>;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface MarketData {
  network: BlockchainNetwork;
  token: string;
  price: number;
  volume24h: number;
  priceChange24h: number;
  liquidity?: number;
  timestamp: Date;
}

export interface TradeSignal {
  strategy: string;
  action: 'buy' | 'sell' | 'hold' | 'add-liquidity' | 'remove-liquidity';
  token: string;
  network: BlockchainNetwork;
  amount?: number;
  confidence: number;
  rationale: string;
}

export interface TradingResult {
  strategyId: string;
  signals: TradeSignal[];
  marketData: MarketData[];
  portfolioRecommendation: string;
  riskWarnings: string[];
}

export class TradingAgent extends BaseAgent {
  constructor() {
    super('trading', 'Trading Agent', {
      tools: [
        'solana-rpc',
        'ethereum-rpc',
        'dex-aggregator',
        'price-oracle',
        'mempool-monitor',
        'wallet-connector',
        'on-chain-analytics',
      ],
      models: ['gpt-4o', 'claude-3-5-sonnet-20241022'],
      maxConcurrentTasks: 1, // Trading is sensitive — serialize
    });
  }

  async execute(context: AgentExecutionContext): Promise<TaskOutput> {
    this.setStatus('running');
    const logs: string[] = [];

    try {
      const prompt = context.task.input.prompt ?? context.task.description;
      logs.push(`[TradingAgent] Processing trading task: ${prompt}`);

      const taskCtx = context.task.input.context ?? {};
      const network = (taskCtx['network'] as BlockchainNetwork) ?? 'solana';
      const strategyType = (taskCtx['strategy'] as string) ?? 'dca';

      logs.push(`[TradingAgent] Network: ${network}, Strategy: ${strategyType}`);

      // Fetch simulated market data
      const marketData = this.fetchMarketData(network);
      logs.push(`[TradingAgent] Fetched market data for ${marketData.length} tokens`);

      // Analyze and generate signals
      const strategy: TradingStrategy = {
        id: `strategy-${Date.now()}`,
        name: `${strategyType.toUpperCase()} Strategy`,
        network,
        type: strategyType as TradingStrategy['type'],
        parameters: taskCtx,
        riskLevel: 'medium',
      };

      const signals = this.analyzeMarket(strategy, marketData);
      logs.push(`[TradingAgent] Generated ${signals.length} trade signals`);

      const result: TradingResult = {
        strategyId: strategy.id,
        signals,
        marketData,
        portfolioRecommendation: this.generateRecommendation(signals),
        riskWarnings: this.generateRiskWarnings(strategy, signals),
      };

      const report = this.generateTradingReport(result);
      const artifacts: Artifact[] = [
        {
          id: `trading-report-${Date.now()}`,
          type: 'report',
          name: 'trading-analysis.md',
          content: report,
          mimeType: 'text/markdown',
        },
      ];

      this.setStatus('idle');
      return {
        result,
        artifacts,
        logs,
        metrics: { startTime: new Date(), endTime: new Date() },
      };
    } catch (err) {
      this.setStatus('error');
      return {
        error: err instanceof Error ? err.message : String(err),
        logs,
        metrics: { startTime: new Date(), endTime: new Date() },
      };
    }
  }

  private fetchMarketData(network: BlockchainNetwork): MarketData[] {
    // Simulated market data — in production this would call real APIs
    const baseTokens: Record<BlockchainNetwork, string[]> = {
      solana: ['SOL', 'JUP', 'BONK', 'WIF'],
      ethereum: ['ETH', 'LINK', 'UNI', 'AAVE'],
      base: ['ETH', 'AERO', 'USDC', 'cbETH'],
      arbitrum: ['ETH', 'ARB', 'GMX', 'MAGIC'],
      polygon: ['MATIC', 'USDC', 'WETH', 'QUICK'],
    };

    return (baseTokens[network] ?? ['ETH']).map(token => ({
      network,
      token,
      price: 100 + Math.random() * 1000,
      volume24h: 1000000 + Math.random() * 10000000,
      priceChange24h: (Math.random() - 0.5) * 20,
      timestamp: new Date(),
    }));
  }

  private analyzeMarket(strategy: TradingStrategy, marketData: MarketData[]): TradeSignal[] {
    return marketData.map(data => {
      const trend =
        data.priceChange24h > 2 ? 'bullish' : data.priceChange24h < -2 ? 'bearish' : 'neutral';

      let action: TradeSignal['action'] = 'hold';
      let confidence = 0.5;

      if (strategy.type === 'dca') {
        action = 'buy'; // DCA always buys on schedule
        confidence = 0.8;
      } else if (strategy.type === 'momentum') {
        if (trend === 'bullish') {
          action = 'buy';
          confidence = 0.7;
        } else if (trend === 'bearish') {
          action = 'sell';
          confidence = 0.65;
        }
      }

      return {
        strategy: strategy.name,
        action,
        token: data.token,
        network: data.network,
        confidence,
        rationale: `${trend.charAt(0).toUpperCase() + trend.slice(1)} trend: ${data.priceChange24h.toFixed(2)}% 24h change`,
      };
    });
  }

  private generateRecommendation(signals: TradeSignal[]): string {
    const buys = signals.filter(s => s.action === 'buy').length;
    const sells = signals.filter(s => s.action === 'sell').length;
    const holds = signals.filter(s => s.action === 'hold').length;

    if (buys > sells + holds) {
      return 'Market shows bullish signals. Consider adding to positions with risk management.';
    } else if (sells > buys + holds) {
      return 'Market shows bearish signals. Consider reducing exposure and protecting capital.';
    }
    return 'Mixed market signals. Maintain current positions and monitor for trend confirmation.';
  }

  private generateRiskWarnings(strategy: TradingStrategy, signals: TradeSignal[]): string[] {
    const warnings: string[] = [
      'This analysis is for informational purposes only and does not constitute financial advice',
      'Cryptocurrency markets are highly volatile — never invest more than you can afford to lose',
    ];

    if (strategy.riskLevel === 'high') {
      warnings.push('High risk strategy — suitable only for experienced traders');
    }

    const lowConfidence = signals.filter(s => s.confidence < 0.6);
    if (lowConfidence.length > 0) {
      warnings.push(`${lowConfidence.length} signal(s) have low confidence — exercise caution`);
    }

    return warnings;
  }

  private generateTradingReport(result: TradingResult): string {
    return `# Trading Analysis Report
Generated: ${new Date().toISOString()}

## Portfolio Recommendation
${result.portfolioRecommendation}

## Trade Signals
${result.signals
  .map(
    s =>
      `| ${s.token} | **${s.action.toUpperCase()}** | ${(s.confidence * 100).toFixed(0)}% | ${s.rationale} |`
  )
  .join('\n')}

## Risk Warnings
${result.riskWarnings.map(w => `⚠️ ${w}`).join('\n')}

---
*Generated by GOD-SWARM ULTRA Trading Agent v1.0.0*  
*Not financial advice. For informational purposes only.*
`;
  }
}
