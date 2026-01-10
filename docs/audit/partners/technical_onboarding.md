<<<<<<< HEAD
---
title: Technical Onboarding
<<<<<<< HEAD
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
=======
# Technical Onboarding

## Overview

This guide helps partners integrate CyberAi into their platforms, workflows, or infrastructure.

## Prerequisites

Before starting technical integration:

- [ ] Partnership agreement in place (or in progress)
- [ ] Technical contact designated
- [ ] Integration requirements documented
- [ ] Development environment ready
- [ ] Access to required resources

## Integration Options

### 1. GitHub Actions Integration

**Use Case**: CI/CD security scanning

**Setup Steps:**

1. **Add Workflow File** (`.github/workflows/security-scan.yml`):

```yaml
name: Security Scan
on: [pull_request, push]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run CyberAi
        uses: cyberai/cyberai-action@v1
        with:
          contracts-path: './contracts'
          severity-threshold: 'medium'
```

2. **Configure Secrets** (if needed):
   - `AUDIT_API_KEY` (for premium features)

3. **Test Integration**:
   - Create test PR
   - Verify scan runs
   - Check results format

**Documentation**: See GitHub Action README

---

### 2. CLI Integration

**Use Case**: Local development, custom workflows

**Installation:**

```bash
# npm
npm install -g @cyberai/cli

# or with pnpm
pnpm add -g @cyberai/cli
```

**Basic Usage:**

```bash
# Scan a directory
sca scan ./contracts

# Scan with specific config
sca scan ./contracts --config sca.config.json

# Output formats
sca scan ./contracts --format json > results.json
sca scan ./contracts --format sarif > results.sarif
```

**Configuration File** (`sca.config.json`):

```json
{
  "rules": {
    "reentrancy": "error",
    "overflow": "error",
    "access-control": "warn"
  },
  "exclude": [
    "node_modules/**",
    "test/**"
  ],
  "severity": "medium"
}
```

---

### 3. API Integration

**Use Case**: Custom platforms, advanced integrations

**Authentication:**

```bash
# Set API key
export SCA_API_KEY="your-api-key-here"
```

**Endpoints:**

```
POST /api/v1/scan
GET  /api/v1/scan/{id}
GET  /api/v1/scan/{id}/results
POST /api/v1/report
```

**Example Request:**

```bash
curl -X POST https://api.smartcontractaudit.example/v1/scan \
  -H "Authorization: Bearer $SCA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "base64-encoded-contract-code",
    "language": "solidity",
    "version": "0.8.0"
  }'
```

**Example Response:**

```json
{
  "scan_id": "scan_123abc",
  "status": "completed",
  "findings": [
    {
      "severity": "high",
      "type": "reentrancy",
      "line": 45,
      "message": "Potential reentrancy vulnerability",
      "recommendation": "Use ReentrancyGuard or checks-effects-interactions pattern"
    }
  ],
  "summary": {
    "critical": 0,
    "high": 1,
    "medium": 3,
    "low": 5
  }
}
```

**API Documentation**: [api-docs.smartcontractaudit.example](#)

---

### 4. IDE Plugin Integration

**Use Case**: Real-time development feedback

**Supported IDEs:**
- Visual Studio Code
- IntelliJ IDEA
- Sublime Text

**VS Code Installation:**

1. Open VS Code Extensions
2. Search "CyberAi"
3. Click Install
4. Configure API key in settings

**Configuration:**

```json
{
  "smartcontractaudit.apiKey": "your-key",
  "smartcontractaudit.autoScan": true,
  "smartcontractaudit.severityThreshold": "medium"
}
```

---

### 5. Docker Integration

**Use Case**: Containerized environments, custom deployments

**Pull Image:**

```bash
docker pull cyberai/scanner:latest
```

**Run Scan:**

```bash
docker run --rm \
  -v $(pwd)/contracts:/contracts \
  cyberai/scanner:latest \
  scan /contracts
```

**Docker Compose:**

```yaml
version: '3.8'
services:
  scanner:
    image: cyberai/scanner:latest
    volumes:
      - ./contracts:/contracts
    command: scan /contracts --format json
```

---

## Partner-Specific Integration

### For CI/CD Platforms

**Integration Checklist:**

- [ ] Marketplace listing prepared
- [ ] Authentication mechanism implemented
- [ ] Results display in platform UI
- [ ] Badge/status integration
- [ ] Webhook support for notifications
- [ ] Documentation published

**Sample Integration:**

```yaml
# Example: CircleCI
version: 2.1
orbs:
  sca: smartcontractaudit/sca@1.0.0

workflows:
  scan:
    jobs:
      - sca/scan:
          contracts-path: ./contracts
          api-key: $SCA_API_KEY
```

### For Audit Firms

**White-Label Deployment:**

1. **Self-Hosted Instance**:
   ```bash
   docker-compose up -d
   ```

2. **Custom Branding**:
   - Logo and colors in config
   - Custom email templates
   - Branded reports

3. **Custom Rules**:
   ```json
   {
     "custom_rules": [
       {
         "id": "firm-specific-rule",
         "pattern": "...",
         "severity": "high"
       }
     ]
   }
   ```

### For Blockchain Explorers

**API Integration:**

```javascript
// Example: Fetch scan results for contract
const response = await fetch(
  `https://api.smartcontractaudit.example/v1/contract/${address}/latest-scan`,
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  }
);

const scanResults = await response.json();
// Display in explorer UI
```

**Badge Integration:**

```html
<!-- Security score badge -->
<img src="https://badges.smartcontractaudit.example/{address}/score.svg" alt="Security Score">
```

---
>>>>>>> origin/pr10

## Configuration

### Environment Variables

<<<<<<< HEAD
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
=======
```bash
# Required
SCA_API_KEY=your-api-key

# Optional
SCA_API_URL=https://api.smartcontractaudit.example
SCA_LOG_LEVEL=info
SCA_DRY_RUN=false
SCA_CACHE_ENABLED=true
>>>>>>> origin/pr10
```

### Configuration File

<<<<<<< HEAD
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
=======
description: Get started with SmartContractAudit technical integration
keywords: onboarding, integration, API, setup
---

# Technical Onboarding

## Welcome

This guide walks you through the technical onboarding process for SmartContractAudit partners.

## Prerequisites

Before starting:
- ✅ Partnership agreement signed
- ✅ Technical contact identified
- ✅ GitHub organization ready
- ✅ Development environment prepared
- ✅ Integration plan reviewed

## Onboarding Steps

### Step 1: Access Setup (Day 1)

**API Credentials**
```bash
# You'll receive:
API_KEY=sca_live_xxxx
API_SECRET=xxxx
PARTNER_ID=partner_xxxx
```

**GitHub Access**
- Added to partner GitHub team
- Access to private repositories
- CI/CD integration examples
- Technical documentation

**Development Environment**
- Staging API endpoint
- Testing webhooks
- Sample data
- Debug tools

### Step 2: Integration Planning (Week 1)

**Architecture Review**
- Review your architecture
- Identify integration points
- Plan API usage
- Design data flow

**Technical Kickoff**
- Meet engineering teams
- Review documentation
- Discuss timeline
- Set milestones

**Environment Setup**
```bash
# Install SDK
npm install @smartcontractaudit/sdk

# Configure
export SCA_API_KEY=your_key
export SCA_ENV=staging
```

### Step 3: Development (Week 2-3)

**Basic Integration**
```javascript
const SCA = require('@smartcontractaudit/sdk');

const client = new SCA({
  apiKey: process.env.SCA_API_KEY,
  environment: 'staging'
});

// Scan a repository
const result = await client.scan({
  repository: 'owner/repo',
  branch: 'main',
  options: {
    deepScan: true,
    includeTests: true
  }
});

console.log('Scan complete:', result.summary);
```

**Webhook Setup**
```javascript
// Receive scan results
app.post('/webhooks/sca', (req, res) => {
  const event = req.body;
  
  // Verify signature
  if (!SCA.verifyWebhook(req.headers, req.body)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Handle event
  switch (event.type) {
    case 'scan.completed':
      handleScanComplete(event.data);
      break;
    case 'vulnerability.found':
      handleVulnerability(event.data);
      break;
  }
  
  res.status(200).send('OK');
});
```

**Error Handling**
```javascript
try {
  const result = await client.scan(config);
} catch (error) {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Handle rate limit
    await wait(error.retryAfter);
  } else if (error.code === 'INVALID_CONFIG') {
    // Fix configuration
    console.error('Config error:', error.message);
  } else {
    // Other errors
    console.error('Scan failed:', error);
  }
}
```

### Step 4: Testing (Week 3-4)

**Unit Tests**
```javascript
describe('SmartContractAudit Integration', () => {
  it('should scan repository successfully', async () => {
    const result = await client.scan({
      repository: 'test/sample'
    });
    
    expect(result.status).toBe('completed');
    expect(result.findings).toBeDefined();
  });
  
  it('should handle scan errors', async () => {
    await expect(
      client.scan({ repository: 'invalid' })
    ).rejects.toThrow('Repository not found');
  });
});
```

**Integration Tests**
- Test with sample repositories
- Verify webhook delivery
- Test error scenarios
- Load testing
- Security testing

**Staging Validation**
- Full end-to-end tests
- Performance benchmarks
- Security review
- UX validation

### Step 5: Launch Preparation (Week 4)

**Production Setup**
```bash
# Production credentials
API_KEY=sca_live_prod_xxxx
API_ENDPOINT=https://api.smartcontractaudit.io/v1
```

**Monitoring Setup**
- Configure alerts
- Set up dashboards
- Error tracking
- Performance monitoring

**Documentation**
- Update user docs
- Create integration guide
- Prepare support materials
- Train support team

**Launch Checklist**
- [ ] Production credentials configured
- [ ] All tests passing
- [ ] Monitoring active
- [ ] Documentation complete
- [ ] Support team trained
- [ ] Rollback plan ready
- [ ] Go-live approved

### Step 6: Go Live (Week 5)

**Deployment**
- Deploy to production
- Enable features gradually
- Monitor closely
- Gather feedback

**Support Activation**
- Support team on standby
- Escalation path clear
- Known issues documented
- FAQ updated

**Announcement**
- Press release (if applicable)
- Blog post
- Social media
- Email announcement

## API Reference

### Authentication

```bash
# API Key Authentication
curl -H "Authorization: Bearer $API_KEY" \
  https://api.smartcontractaudit.io/v1/scan
```

### Scanning

**Start Scan**
```bash
POST /v1/scan
{
  "repository": "owner/repo",
  "branch": "main",
  "options": {
    "deepScan": true,
    "rules": ["security", "best-practices"]
  }
}
```

**Get Results**
```bash
GET /v1/scan/:scanId
```

**List Scans**
```bash
GET /v1/scans?repository=owner/repo&limit=10
```

### Webhooks

**Subscribe**
```bash
POST /v1/webhooks
{
  "url": "https://your-app.com/webhooks/sca",
  "events": ["scan.completed", "vulnerability.found"]
}
```

**Event Types**
- `scan.started`
- `scan.completed`
- `scan.failed`
- `vulnerability.found`
- `vulnerability.fixed`

## SDKs & Libraries

### Official SDKs
- **Node.js**: `npm install @smartcontractaudit/sdk`
- **Python**: `pip install smartcontractaudit`
- **Go**: `go get github.com/smartcontractaudit/go-sdk`
- **Rust**: `cargo add smartcontractaudit`

### Community SDKs
- Ruby, PHP, Java (community-maintained)
- Check GitHub for latest

## Rate Limits

### Standard Limits
- **Free tier**: 100 scans/month
- **Partner tier**: 1,000 scans/month
- **Enterprise**: Custom limits

### Rate Limit Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

### Handling Rate Limits
```javascript
if (response.status === 429) {
  const retryAfter = response.headers['retry-after'];
  await sleep(retryAfter * 1000);
  // Retry request
}
```

## Best Practices

### Performance
- Cache results when possible
- Use webhooks instead of polling
- Batch requests when available
- Implement exponential backoff

### Security
- Store API keys securely
- Use environment variables
- Verify webhook signatures
- Implement HTTPS only
- Rotate keys regularly

### Reliability
- Implement retry logic
- Handle errors gracefully
- Monitor API health
- Set up alerting
- Plan for downtime
>>>>>>> origin/pr9

## Troubleshooting

### Common Issues

<<<<<<< HEAD
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
=======
Create `sca.config.json`:

```json
{
  "version": "1.0",
  "rules": {
    "enabled": ["reentrancy", "overflow", "access-control"],
    "disabled": ["style-warnings"]
  },
  "severity_threshold": "medium",
  "output": {
    "format": "json",
    "destination": "./scan-results/"
  },
  "notifications": {
    "webhook_url": "https://your-webhook.example/sca",
    "on_severity": ["high", "critical"]
  }
}
```

---

## Testing Your Integration

### Test Contracts

We provide test contracts with known vulnerabilities:

```bash
git clone https://github.com/CyberAi/CyberAi-test-contracts
cd CyberAi-test-contracts
sca scan ./contracts
```

Expected results: 10 high, 15 medium, 20 low severity findings

### Integration Tests

```bash
# Run integration test suite
npm run test:integration

# Verify API connectivity
sca test-connection --api-key $SCA_API_KEY

# Dry-run scan
sca scan ./test-contracts --dry-run
```

---

## Support

### Technical Support Channels

**Partners get priority support:**

- **Slack/Discord**: Private partner channel
- **Email**: partners-support@cyberai.network
- **GitHub Issues**: Tag with `partner-support`
- **Video Calls**: Schedule via partners-support@cyberai.network

### Response Times

- **Critical (service down)**: 4 hours
- **High (major issue)**: 1 business day
- **Medium**: 2 business days
- **Low**: 5 business days

### Escalation

If not resolved in SLA time:
1. Email partners-support@cyberai.network with "ESCALATION" in subject
2. Include original ticket number
3. CC: funding@cyberai.network

---

## Best Practices

### Security

- ✅ Store API keys in secrets management
- ✅ Use HTTPS for all API calls
- ✅ Rotate API keys regularly
- ✅ Validate webhook signatures
- ❌ Don't commit API keys to source control
- ❌ Don't share API keys between environments

### Performance

- ✅ Cache scan results appropriately
- ✅ Use incremental scanning when possible
- ✅ Implement rate limiting on your side
- ✅ Batch API requests when possible
- ❌ Don't scan on every file save (debounce)
- ❌ Don't overwhelm API with requests

### User Experience

- ✅ Show scan progress to users
- ✅ Provide clear error messages
- ✅ Link to detailed documentation
- ✅ Offer inline fixes when possible
- ❌ Don't block critical workflows
- ❌ Don't hide scan results from users

---

## Maintenance

### Updates

- **Breaking Changes**: 90 days notice minimum
- **New Features**: Announced in changelog
- **Deprecations**: 180 days before removal
- **Security Updates**: Immediate notification to partners

### Monitoring

Monitor these metrics:

- API response times
- Error rates
- Scan success rates
- User adoption
- False positive rates

### Feedback Loop

Partners should provide:

- Monthly usage statistics
- Feature requests
- Bug reports
- User feedback
- Integration challenges

---

## Documentation

### Required Documentation

Partners should document:

- [ ] How users enable the integration
- [ ] Configuration options
- [ ] Troubleshooting common issues
- [ ] Example workflows
- [ ] Support contact information

### We Provide

- API reference docs
- Integration examples
- SDK documentation
- Video tutorials
- Sample code repositories

---

## Go-Live Checklist

Before launching your integration:

- [ ] Integration tested end-to-end
- [ ] Error handling implemented
- [ ] User documentation complete
- [ ] Support process defined
- [ ] Monitoring in place
- [ ] Security review passed
- [ ] Performance tested under load
- [ ] Beta tested with select users
- [ ] Announcement materials ready
- [ ] Support team trained

---

## Contact

**Technical Onboarding**: partners-support@cyberai.network  
**API Access**: funding@cyberai.network  
**Bug Reports**: GitHub Issues with `partner` tag  
**Emergency Support**: partners-support@cyberai.network (subject: URGENT)
>>>>>>> origin/pr10

---

**Last Updated**: 2026-01-01  
<<<<<<< HEAD
**Version**: 1.0

Welcome aboard! We're excited to have you as a partner. 🎉
=======
**"Invalid API key"**
- Verify key is correct
- Check key hasn't expired
- Ensure using production key for production

**"Rate limit exceeded"**
- Check rate limit headers
- Implement backoff strategy
- Upgrade plan if needed

**"Webhook not received"**
- Verify endpoint is accessible
- Check webhook signature
- Review webhook logs
- Test with curl

### Debug Mode

```javascript
const client = new SCA({
  apiKey: API_KEY,
  debug: true  // Enable debug logging
});
```

### Support

For technical issues:
- **Email**: tech-support@cuberai.example
- **Slack**: #partner-support
- **Response time**: See SLA
- **Emergency**: emergency@cuberai.example

## Resources

- **API Documentation**: [Link]
- **SDK Documentation**: [Link]
- **Code Examples**: GitHub repo
- **Community Forum**: [Link]
- **Status Page**: [Link]

## Next Steps

After completing onboarding:
1. Review [SLA and support](sla_and_support.md)
2. Check [data privacy](data_privacy.md) policies
3. Explore [use cases](use_cases.md)
4. Join partner community

---

*Last updated: 2026-01-01*
>>>>>>> origin/pr9
=======
**API Version**: v1  
**Documentation**: [docs.smartcontractaudit.example](#)
>>>>>>> origin/pr10
