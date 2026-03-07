/**
 * GOD-SWARM ULTRA — Security Agent
 * Audits code and infrastructure for vulnerabilities
 */

import type { AgentExecutionContext } from './base.js';
import type { TaskOutput, Artifact } from '../swarm/types.js';
import { BaseAgent } from './base.js';

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface SecurityFinding {
  id: string;
  severity: SeverityLevel;
  title: string;
  description: string;
  location?: string;
  lineNumber?: number;
  recommendation: string;
  cweId?: string;
  cvssScore?: number;
}

export interface SecurityAuditResult {
  targetType: 'code' | 'infrastructure' | 'contract' | 'api';
  findings: SecurityFinding[];
  riskScore: number; // 0-100
  summary: string;
  passed: boolean;
}

// Common vulnerability patterns (simplified detection)
const VULNERABILITY_PATTERNS: Array<{
  pattern: RegExp;
  finding: Omit<SecurityFinding, 'id' | 'location' | 'lineNumber'>;
}> = [
  {
    pattern: /eval\s*\(/,
    finding: {
      severity: 'critical',
      title: 'Dangerous eval() usage',
      description: 'Use of eval() can lead to code injection attacks',
      recommendation:
        'Replace eval() with safer alternatives like JSON.parse() or Function constructors',
      cweId: 'CWE-95',
      cvssScore: 9.1,
    },
  },
  {
    pattern: /innerHTML\s*=/,
    finding: {
      severity: 'high',
      title: 'Potential XSS via innerHTML',
      description: 'Direct assignment to innerHTML can introduce XSS vulnerabilities',
      recommendation: 'Use textContent, DOMParser, or a sanitization library',
      cweId: 'CWE-79',
      cvssScore: 7.5,
    },
  },
  {
    pattern: /process\.env\.[A-Z_]+/,
    finding: {
      severity: 'info',
      title: 'Environment variable access',
      description: 'Ensure sensitive environment variables are not exposed to client code',
      recommendation: 'Review all environment variable usage',
      cweId: 'CWE-200',
    },
  },
  {
    pattern: /SELECT\s+.*\s+FROM\s+.*\s+WHERE.*\+/i,
    finding: {
      severity: 'critical',
      title: 'Potential SQL Injection',
      description: 'String concatenation in SQL queries can lead to injection attacks',
      recommendation: 'Use parameterized queries or prepared statements',
      cweId: 'CWE-89',
      cvssScore: 9.8,
    },
  },
  {
    pattern: /password\s*=\s*['"][^'"]+['"]/i,
    finding: {
      severity: 'critical',
      title: 'Hardcoded credentials',
      description: 'Hardcoded passwords found in source code',
      recommendation: 'Move credentials to environment variables or a secrets manager',
      cweId: 'CWE-798',
      cvssScore: 9.0,
    },
  },
];

export class SecurityAgent extends BaseAgent {
  constructor() {
    super('security', 'Security Agent', {
      tools: [
        'static-analyzer',
        'dependency-checker',
        'secret-scanner',
        'container-scanner',
        'codeql',
        'semgrep',
      ],
      models: ['claude-3-5-sonnet-20241022', 'gpt-4o'],
      maxConcurrentTasks: 3,
    });
  }

  async execute(context: AgentExecutionContext): Promise<TaskOutput> {
    this.setStatus('running');
    const logs: string[] = [];

    try {
      const prompt = context.task.input.prompt ?? context.task.description;
      logs.push(`[SecurityAgent] Starting security audit: ${prompt}`);

      // Get code from artifacts or context
      const code = context.task.input.data as string | undefined;
      const findings = code ? this.scanCode(code) : this.generateDefaultFindings();

      const riskScore = this.calculateRiskScore(findings);
      const passed = riskScore < 50 && !findings.some(f => f.severity === 'critical');

      const result: SecurityAuditResult = {
        targetType: 'code',
        findings,
        riskScore,
        summary: `Found ${findings.length} issue(s). Risk score: ${riskScore}/100. ${passed ? 'PASSED' : 'FAILED'}.`,
        passed,
      };

      logs.push(`[SecurityAgent] Audit complete: ${result.summary}`);
      findings.forEach(f => logs.push(`  [${f.severity.toUpperCase()}] ${f.title}`));

      const report = this.generateReport(result);
      const artifacts: Artifact[] = [
        {
          id: `security-report-${Date.now()}`,
          type: 'report',
          name: 'security-audit-report.md',
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

  private scanCode(code: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];
    const lines = code.split('\n');

    for (const { pattern, finding } of VULNERABILITY_PATTERNS) {
      lines.forEach((line, lineIdx) => {
        if (pattern.test(line)) {
          findings.push({
            ...finding,
            id: `finding-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            location: `line ${lineIdx + 1}`,
            lineNumber: lineIdx + 1,
          });
        }
      });
    }

    return findings;
  }

  private generateDefaultFindings(): SecurityFinding[] {
    return [
      {
        id: `finding-${Date.now()}`,
        severity: 'info',
        title: 'Security audit completed',
        description: 'No code provided for scanning; review recommendations apply',
        recommendation: 'Provide source code for detailed vulnerability scanning',
      },
    ];
  }

  private calculateRiskScore(findings: SecurityFinding[]): number {
    if (findings.length === 0) return 0;

    const weights: Record<SeverityLevel, number> = {
      critical: 40,
      high: 25,
      medium: 15,
      low: 8,
      info: 2,
    };

    const total = findings.reduce((sum, f) => sum + weights[f.severity], 0);
    return Math.min(100, total);
  }

  private generateReport(result: SecurityAuditResult): string {
    const date = new Date().toISOString();
    const severityCounts = result.findings.reduce(
      (acc, f) => {
        acc[f.severity] = (acc[f.severity] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return `# Security Audit Report
Generated by GOD-SWARM ULTRA Security Agent  
Date: ${date}

## Summary
- **Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}
- **Risk Score**: ${result.riskScore}/100
- **Total Findings**: ${result.findings.length}
${Object.entries(severityCounts)
  .map(([sev, count]) => `- **${sev.charAt(0).toUpperCase() + sev.slice(1)}**: ${count}`)
  .join('\n')}

## Findings

${
  result.findings.length === 0
    ? '_No findings_'
    : result.findings
        .map(
          f => `### [${f.severity.toUpperCase()}] ${f.title}
${f.cweId ? `**CWE**: ${f.cweId}  ` : ''}${f.cvssScore !== undefined ? `**CVSS**: ${f.cvssScore}` : ''}
${f.location ? `**Location**: ${f.location}` : ''}

${f.description}

**Recommendation**: ${f.recommendation}`
        )
        .join('\n\n---\n\n')
}

## Recommendations

1. Prioritize fixing all CRITICAL and HIGH severity findings
2. Implement automated security scanning in CI/CD pipeline
3. Regular dependency updates to patch known vulnerabilities
4. Code review for security best practices

---
*Report generated by GOD-SWARM ULTRA v1.0.0*
`;
  }
}
