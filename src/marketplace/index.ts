/**
 * GOD-SWARM ULTRA — Marketplace
 * Agent catalog, workflow templates, and billing
 */

import { randomUUID } from 'crypto';

// ─── Agent Catalog ────────────────────────────────────────────────────────────

export interface MarketplaceAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  version: string;
  rating: number; // 0-5
  downloads: number;
  pricingModel: 'free' | 'per-use' | 'subscription';
  priceUsd?: number;
  capabilities: string[];
  documentation?: string;
  publishedAt: Date;
  updatedAt: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  steps: Array<{ name: string; agentType: string; description: string }>;
  triggerType: string;
  estimatedDurationMin: number;
  downloads: number;
  rating: number;
  pricingModel: 'free' | 'per-use' | 'subscription';
  priceUsd?: number;
  publishedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'starter' | 'pro' | 'enterprise';
  monthlyUsd: number;
  limits: {
    workflowRunsPerMonth: number;
    agentsActive: number;
    runnersActive: number;
    storageGb: number;
  };
  startDate: Date;
  renewalDate: Date;
  status: 'active' | 'cancelled' | 'expired';
}

export interface UsageRecord {
  id: string;
  userId: string;
  resourceType: 'workflow-run' | 'agent-call' | 'runner-min' | 'storage-gb';
  quantity: number;
  costUsd: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// ─── Pricing Plans ────────────────────────────────────────────────────────────

export const SUBSCRIPTION_PLANS: Record<
  Subscription['plan'],
  Omit<Subscription, 'id' | 'userId' | 'startDate' | 'renewalDate' | 'status'>
> = {
  starter: {
    plan: 'starter',
    monthlyUsd: 29,
    limits: {
      workflowRunsPerMonth: 100,
      agentsActive: 5,
      runnersActive: 2,
      storageGb: 10,
    },
  },
  pro: {
    plan: 'pro',
    monthlyUsd: 99,
    limits: {
      workflowRunsPerMonth: 1000,
      agentsActive: 20,
      runnersActive: 10,
      storageGb: 100,
    },
  },
  enterprise: {
    plan: 'enterprise',
    monthlyUsd: 499,
    limits: {
      workflowRunsPerMonth: -1, // unlimited
      agentsActive: -1,
      runnersActive: -1,
      storageGb: -1,
    },
  },
};

// ─── Marketplace Class ────────────────────────────────────────────────────────

export class Marketplace {
  private agents = new Map<string, MarketplaceAgent>();
  private templates = new Map<string, WorkflowTemplate>();
  private subscriptions = new Map<string, Subscription>();
  private usageRecords: UsageRecord[] = [];

  constructor() {
    this.seedDefaultCatalog();
  }

  // ─── Agent Catalog ──────────────────────────────────────────────────────────

  publishAgent(
    agent: Omit<MarketplaceAgent, 'id' | 'publishedAt' | 'updatedAt'>
  ): MarketplaceAgent {
    const full: MarketplaceAgent = {
      ...agent,
      id: randomUUID(),
      publishedAt: new Date(),
      updatedAt: new Date(),
    };
    this.agents.set(full.id, full);
    return full;
  }

  searchAgents(query: string, category?: string): MarketplaceAgent[] {
    const lower = query.toLowerCase();
    return Array.from(this.agents.values()).filter(a => {
      const matches =
        a.name.toLowerCase().includes(lower) ||
        a.description.toLowerCase().includes(lower) ||
        a.tags.some(t => t.toLowerCase().includes(lower));
      return matches && (!category || a.category === category);
    });
  }

  getAgent(id: string): MarketplaceAgent | undefined {
    return this.agents.get(id);
  }

  getFeaturedAgents(): MarketplaceAgent[] {
    return Array.from(this.agents.values())
      .sort((a, b) => b.rating * b.downloads - a.rating * a.downloads)
      .slice(0, 10);
  }

  // ─── Workflow Templates ─────────────────────────────────────────────────────

  publishTemplate(template: Omit<WorkflowTemplate, 'id' | 'publishedAt'>): WorkflowTemplate {
    const full: WorkflowTemplate = {
      ...template,
      id: randomUUID(),
      publishedAt: new Date(),
    };
    this.templates.set(full.id, full);
    return full;
  }

  searchTemplates(query: string, category?: string): WorkflowTemplate[] {
    const lower = query.toLowerCase();
    return Array.from(this.templates.values()).filter(t => {
      const matches =
        t.name.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower) ||
        t.tags.some(tag => tag.toLowerCase().includes(lower));
      return matches && (!category || t.category === category);
    });
  }

  getTemplate(id: string): WorkflowTemplate | undefined {
    return this.templates.get(id);
  }

  // ─── Billing & Subscriptions ────────────────────────────────────────────────

  createSubscription(userId: string, plan: Subscription['plan']): Subscription {
    const planConfig = SUBSCRIPTION_PLANS[plan];
    const subscription: Subscription = {
      ...planConfig,
      id: randomUUID(),
      userId,
      startDate: new Date(),
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
    };
    this.subscriptions.set(subscription.id, subscription);
    return subscription;
  }

  getSubscription(userId: string): Subscription | null {
    return (
      Array.from(this.subscriptions.values()).find(
        s => s.userId === userId && s.status === 'active'
      ) ?? null
    );
  }

  recordUsage(
    userId: string,
    resourceType: UsageRecord['resourceType'],
    quantity: number,
    costUsd: number,
    metadata?: Record<string, unknown>
  ): UsageRecord {
    const record: UsageRecord = {
      id: randomUUID(),
      userId,
      resourceType,
      quantity,
      costUsd,
      timestamp: new Date(),
      metadata,
    };
    this.usageRecords.push(record);
    return record;
  }

  getUsageSummary(
    userId: string,
    fromDate?: Date
  ): {
    totalCostUsd: number;
    breakdown: Record<string, { quantity: number; costUsd: number }>;
  } {
    const records = this.usageRecords.filter(
      r => r.userId === userId && (!fromDate || r.timestamp >= fromDate)
    );

    const breakdown: Record<string, { quantity: number; costUsd: number }> = {};
    let totalCostUsd = 0;

    for (const record of records) {
      if (!breakdown[record.resourceType]) {
        breakdown[record.resourceType] = { quantity: 0, costUsd: 0 };
      }
      breakdown[record.resourceType].quantity += record.quantity;
      breakdown[record.resourceType].costUsd += record.costUsd;
      totalCostUsd += record.costUsd;
    }

    return { totalCostUsd, breakdown };
  }

  // ─── Seed Default Catalog ─────────────────────────────────────────────────

  private seedDefaultCatalog(): void {
    // Default agents
    const defaultAgents = [
      {
        name: 'Security Auditor Pro',
        description: 'Advanced security auditing with OWASP, CWE, and CVE detection',
        category: 'security',
        tags: ['security', 'audit', 'vulnerability', 'owasp'],
        author: 'GOD-SWARM',
        version: '2.1.0',
        rating: 4.8,
        downloads: 12500,
        pricingModel: 'free' as const,
        capabilities: ['static-analysis', 'dependency-scan', 'secret-detection'],
      },
      {
        name: 'TypeScript Full-Stack Generator',
        description: 'Generate complete TypeScript applications with tests and CI/CD',
        category: 'code-generation',
        tags: ['typescript', 'code-gen', 'fullstack', 'nextjs'],
        author: 'GOD-SWARM',
        version: '1.5.0',
        rating: 4.7,
        downloads: 8900,
        pricingModel: 'free' as const,
        capabilities: ['code-gen', 'test-gen', 'cicd-gen'],
      },
      {
        name: 'Solana DeFi Strategist',
        description: 'Automated DeFi strategies for Solana ecosystem',
        category: 'trading',
        tags: ['solana', 'defi', 'trading', 'blockchain'],
        author: 'GOD-SWARM',
        version: '1.0.0',
        rating: 4.5,
        downloads: 3200,
        pricingModel: 'per-use' as const,
        priceUsd: 0.1,
        capabilities: ['market-analysis', 'strategy-execution', 'risk-management'],
      },
    ];

    for (const agent of defaultAgents) {
      this.publishAgent(agent);
    }

    // Default templates
    const defaultTemplates = [
      {
        name: 'CI/CD Security Pipeline',
        description: 'Full security pipeline: code scan → vulnerability fix → test → deploy',
        category: 'devops',
        tags: ['cicd', 'security', 'automation'],
        author: 'GOD-SWARM',
        steps: [
          {
            name: 'Security Scan',
            agentType: 'security',
            description: 'Scan code for vulnerabilities',
          },
          { name: 'Auto Repair', agentType: 'repair', description: 'Fix detected issues' },
          { name: 'Test Suite', agentType: 'code-gen', description: 'Run test suite' },
          { name: 'Deploy', agentType: 'devops', description: 'Deploy to production' },
        ],
        triggerType: 'git-push',
        estimatedDurationMin: 15,
        downloads: 5600,
        rating: 4.9,
        pricingModel: 'free' as const,
      },
      {
        name: 'Research & Report',
        description: 'Comprehensive research on any topic with structured report',
        category: 'research',
        tags: ['research', 'analysis', 'report'],
        author: 'GOD-SWARM',
        steps: [
          { name: 'Research', agentType: 'research', description: 'Gather information' },
          { name: 'Analysis', agentType: 'planner', description: 'Analyze findings' },
          { name: 'Report', agentType: 'code-gen', description: 'Generate structured report' },
        ],
        triggerType: 'manual',
        estimatedDurationMin: 10,
        downloads: 4200,
        rating: 4.6,
        pricingModel: 'free' as const,
      },
    ];

    for (const template of defaultTemplates) {
      this.publishTemplate(template);
    }
  }
}
