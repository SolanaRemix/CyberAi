---
title: Technical Onboarding
description: Get started with SmartContractAudit integration
keywords: onboarding, integration, setup, technical documentation
---

# Technical Onboarding Guide

Welcome! This guide will help you integrate SmartContractAudit into your development workflow.

## Quick Start

### 1. Prerequisites

- Git version 2.x+
- Node.js 20+ (for JavaScript tools)
- GitHub account
- Basic command-line knowledge

### 2. Repository Access

**Public Repository**: https://github.com/SolanaRemix/SmartContractAudit

```bash
# Clone the repository
git clone https://github.com/SolanaRemix/SmartContractAudit.git
cd SmartContractAudit
```

### 3. Basic Setup

```bash
# Review the README
cat README.md

# Check available scripts
ls -la scripts/

# Review configuration examples
cat .env.example
```

## Integration Options

### Option 1: GitHub Actions Workflow

Add SmartContractAudit to your CI/CD:

```yaml
# .github/workflows/security-audit.yml
name: Smart Contract Audit

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run SmartContractAudit
        run: |
          curl -sSL https://raw.githubusercontent.com/SolanaRemix/SmartContractAudit/main/scripts/audit.sh | bash
```

**Features**:
- Automated auditing on every PR
- Results posted as PR comments
- Artifacts uploaded for review
- Dry-run mode by default

### Option 2: Pre-commit Hook

Run checks before committing:

```bash
# Install pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
./scripts/audit.sh --fast
EOF

chmod +x .git/hooks/pre-commit
```

### Option 3: Manual Command Line

Run audits manually:

```bash
# Basic audit
./scripts/audit.sh

# With specific options
./scripts/master.sh scan --dry-run
```

### Option 4: API Integration (Enterprise)

For enterprise partners with API access:

```javascript
const { SmartContractAudit } = require('@smartcontractaudit/sdk');

const audit = new SmartContractAudit({
  apiKey: process.env.SCAUDIT_API_KEY
});

const results = await audit.scan({
  repository: 'owner/repo',
  branch: 'main'
});
```

**Note**: API access requires Silver tier or higher.

## Configuration

### Environment Variables

Create a `.env` file:

```bash
# Dry-run mode (recommended for initial setup)
DRY_RUN=true

# Bot pings (disable for quiet mode)
BOT_PINGS_ENABLED=false

# Organization allowlist (empty = restrictive)
ALLOWLIST_ORGS=""

# Maximum PRs per run
MAX_PRS_PER_RUN=3

# GitHub token (optional, for private repos)
# GITHUB_TOKEN=your_token_here
```

### Configuration File

Create `config/audit.json`:

```json
{
  "enabled": true,
  "dry_run": true,
  "scan_patterns": [
    "**/*.sol",
    "**/*.rs",
    "**/*.move"
  ],
  "exclude_patterns": [
    "node_modules/**",
    "test/**",
    ".git/**"
  ],
  "severity_threshold": "medium",
  "auto_fix": false
}
```

## Workflow Examples

### Example 1: DeFi Protocol

**Use Case**: Audit Solidity contracts before deployment

```yaml
name: Contract Audit

on:
  push:
    paths:
      - 'contracts/**/*.sol'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Audit Contracts
        run: ./scripts/audit.sh contracts/
        
      - name: Check Results
        run: |
          if [ -f AUDIT-REPORT.md ]; then
            cat AUDIT-REPORT.md
          fi
```

### Example 2: Multi-Chain Project

**Use Case**: Audit contracts across multiple blockchains

```yaml
jobs:
  audit-solana:
    steps:
      - name: Audit Solana Contracts
        run: ./scripts/audit.sh --chain solana programs/
        
  audit-ethereum:
    steps:
      - name: Audit Ethereum Contracts
        run: ./scripts/audit.sh --chain ethereum contracts/
```

### Example 3: Continuous Monitoring

**Use Case**: Daily automated audits

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  scheduled-audit:
    steps:
      - name: Full Audit
        run: ./scripts/master.sh scan --full
```

## Security Best Practices

### 1. Secrets Management

**Never commit secrets**:

```bash
# Use GitHub Secrets for sensitive data
# Access in workflow:
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### 2. Dry-Run First

**Always test in dry-run mode**:

```bash
# Test without making changes
DRY_RUN=true ./scripts/master.sh scan
```

### 3. Review Before Deploy

**Manual review of findings**:

```bash
# Generate report
./scripts/audit.sh > audit-report.txt

# Review findings
cat audit-report.txt

# Address issues before proceeding
```

### 4. Least Privilege

**Minimal permissions in workflows**:

```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write
```

## Testing Your Integration

### 1. Validate Configuration

```bash
# Check configuration
./scripts/audit.sh --validate-config

# Test dry-run mode
DRY_RUN=true ./scripts/audit.sh
```

### 2. Test with Sample Contracts

```bash
# Use test contracts
./scripts/audit.sh test/contracts/

# Verify results
ls -la AUDIT-REPORT.md
```

### 3. Verify CI/CD Integration

```bash
# Create test PR
git checkout -b test-audit
git commit --allow-empty -m "Test audit workflow"
git push origin test-audit

# Check GitHub Actions for workflow run
```

## Troubleshooting

### Common Issues

**Issue**: Script permission denied
```bash
# Solution: Make scripts executable
chmod +x scripts/*.sh
```

**Issue**: Missing dependencies
```bash
# Solution: Install required tools
npm install   # If using Node.js tools
```

**Issue**: API rate limits
```bash
# Solution: Add GitHub token
export GITHUB_TOKEN=your_token
```

**Issue**: False positives
```bash
# Solution: Configure exclusions
# Add to config/audit.json:
{
  "exclude_patterns": ["path/to/exclude/**"]
}
```

### Getting Help

- **Documentation**: Check /docs directory
- **GitHub Issues**: Report problems
- **Partner Support**: Email support@cuberai.example (partners only)
- **Community**: GitHub Discussions

## Advanced Configuration

### Custom Scanning Rules

Create `config/custom-rules.json`:

```json
{
  "rules": [
    {
      "id": "no-hardcoded-addresses",
      "pattern": "0x[a-fA-F0-9]{40}",
      "severity": "high",
      "message": "Hardcoded address detected"
    }
  ]
}
```

### Integration with Other Tools

**Combine with existing security tools**:

```yaml
- name: Run Slither
  run: slither .
  
- name: Run SmartContractAudit
  run: ./scripts/audit.sh
  
- name: Run Custom Checks
  run: npm run security-check
```

## Performance Optimization

### For Large Repositories

```bash
# Scan specific paths only
./scripts/audit.sh contracts/

# Use parallel scanning (if supported)
PARALLEL=true ./scripts/audit.sh

# Cache results
CACHE_ENABLED=true ./scripts/audit.sh
```

### For CI/CD

```yaml
# Cache dependencies
- uses: actions/cache@v3
  with:
    path: ~/.cache
    key: audit-cache-${{ hashFiles('**/*.sol') }}
```

## Next Steps

1. **Complete Setup**: Finalize configuration
2. **Run First Audit**: Execute audit in dry-run mode
3. **Review Results**: Analyze findings
4. **Integrate**: Add to CI/CD pipeline
5. **Monitor**: Set up continuous auditing
6. **Optimize**: Fine-tune configuration

## Partner-Specific Features

### Silver+ Partners

- **Priority Support**: Dedicated technical contact
- **Custom Rules**: Tailored scanning rules
- **Integration Assistance**: Hands-on setup help

### Gold+ Partners

- **Custom Workflows**: Bespoke CI/CD integration
- **Private Deployments**: On-premise options
- **Training Sessions**: Team onboarding

### Platinum Partners

- **Dedicated Engineer**: Named technical resource
- **Custom Development**: Feature development
- **24/7 Support**: Round-the-clock assistance

## Resources

### Documentation

- [README.md](../../README.md) - Project overview
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guide
- [SECURITY.md](../../SECURITY.md) - Security policy

### Partner Resources

- [SLA and Support](sla_and_support.md)
- [Data Privacy](data_privacy.md)
- [Use Cases](use_cases.md)

### External Resources

- GitHub Actions Documentation
- Smart Contract Security Best Practices
- Blockchain Development Guides

## Feedback

We value your feedback:

- **Technical Issues**: GitHub Issues
- **Feature Requests**: GitHub Discussions
- **Partner Support**: support@cuberai.example
- **General Feedback**: partners@cuberai.example

---

**Last Updated**: 2026-01-01  
**Version**: 1.0

Welcome aboard! We're excited to have you as a partner. 🎉
