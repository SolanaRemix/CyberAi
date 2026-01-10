# CuberAi Setup Documentation

## Overview

CuberAi is a comprehensive AI-powered orchestration system for smart contract auditing, automated healing, and security monitoring. This document provides detailed setup and configuration instructions.

## Architecture

```
┌─────────────────────────────────────────┐
│     SmartBrain Orchestrator             │
│         (master.sh)                     │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴───────┐
       │               │
┌──────▼──────┐ ┌─────▼──────┐
│   Agents    │ │  Workflows │
│   A-F, X    │ │  CI/CD     │
└─────────────┘ └────────────┘
```

### Components

1. **SmartBrain Orchestrator** (`scripts/master.sh`)
   - Central coordination hub
   - Multi-agent system
   - Logging and monitoring

2. **Agent Scripts**
   - `audit.sh` - Contract auditing
   - `mega-neo-self-healer-v5.sh` - UI healing
   - `castquest-mega-selfheal.sh` - Component healing

3. **GitAntivirus Workflow** (`.github/workflows/git-antivirus.yml`)
   - Automated security scanning
   - Pattern detection
   - Quarantine management

4. **Bot Templates** (`templates/node-bot-template.js`)
   - Extensible automation framework
   - SmartBrain integration
   - Safe execution environment

## Installation

### System Requirements

- **Operating System**: Linux, macOS, or WSL2 on Windows
- **Node.js**: 16.x or higher
- **pnpm**: 8.x or higher
- **Bash**: 4.x or higher
- **Git**: 2.x or higher

### Step-by-Step Setup

#### 1. Clone and Initialize

```bash
git clone https://github.com/CyberAi/CyberAi.git
cd CyberAi
```

#### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit configuration
nano .env
```

Required settings:
```bash
DRY_RUN=true              # Start in safe mode
PNPM=pnpm                 # Package manager
LOG_LEVEL=INFO            # Logging verbosity
```

#### 3. Script Permissions

```bash
# Make all scripts executable
chmod +x scripts/*.sh
chmod +x templates/node-bot-template.js

# Verify permissions
ls -l scripts/
```

#### 4. Dependency Installation (if needed)

```bash
# If package.json exists
pnpm install --frozen-lockfile
```

#### 5. Verification

```bash
# Run health check
./scripts/master.sh health

# Test dry-run mode
DRY_RUN=true ./scripts/master.sh audit
```

## Configuration

### Environment Variables

#### Core Settings

```bash
# Safety and Execution
DRY_RUN=true                    # Enable non-destructive mode
PNPM=pnpm                       # Package manager binary

# Logging
LOG_LEVEL=INFO                  # DEBUG, INFO, WARN, ERROR
SMARTBRAIN_LOG=SMARTBRAIN.log   # Log file path

# Paths
ROOT_DIR=/path/to/repo          # Auto-detected if not set
QUARANTINE_DIR=.quarantine      # Quarantine directory
```

#### Advanced Settings

```bash
# Port Cleaning
CLEAN_PORTS="3000,3001,4000"    # Ports to clean

# Timeouts
HEALTH_CHECK_TIMEOUT=30         # Seconds
AUDIT_TIMEOUT=300               # Seconds

# Features
ENABLE_AUTO_HEAL=true           # Enable auto-healing
ENABLE_ANTIVIRUS=true           # Enable security scanning
```

### Script Configuration

Edit `scripts/master.sh` to customize:

#### Port Range

```bash
local ports=(3000 3001 3002 3003 3004 3005 3006 3007 3008 3009 3010 4000)
```

#### Scan Patterns

```bash
local patterns=(
  "*.json" "*.js" "*.jsx" "*.ts" "*.tsx"
  "*.sol" "*.yml" "*.yaml"
  # Add more patterns...
)
```

## Usage

### SmartBrain Commands

#### Audit

Comprehensive code audit:

```bash
./scripts/master.sh audit
```

Outputs:
- `AUDIT-REPORT.md` - Summary report
- `SMARTBRAIN.log` - Detailed logs

#### Heal

Auto-healing and optimization:

```bash
./scripts/master.sh heal
```

Actions:
- Clean hanging ports
- Run UI healers
- Fix common issues

#### Integrity

Validate consistency:

```bash
./scripts/master.sh integrity
```

Checks:
- ABI ↔ SDK consistency
- Type definitions
- Contract interfaces

#### Health

System health check:

```bash
./scripts/master.sh health
```

Validates:
- Linting status
- Test results
- Type checking

#### Scan

Security scan:

```bash
./scripts/master.sh scan
```

Detects:
- Suspicious patterns
- Dangerous commands
- Archive files

### Production Mode

**⚠️ Use with caution!**

```bash
# Enable production mode
export DRY_RUN=false

# Run command
./scripts/master.sh heal

# Or inline
DRY_RUN=false ./scripts/master.sh heal
```

### Creating Custom Bots

```bash
# Copy template
cp templates/node-bot-template.js bots/my-bot.js

# Customize the bot
nano bots/my-bot.js

# Run it
node bots/my-bot.js
```

## GitHub Actions Integration

### Automatic Workflows

GitAntivirus runs automatically on:

- **Push events** to any branch
- **Pull requests** to main/master
- **Scheduled** daily at 2 AM UTC
- **Manual dispatch** from Actions tab

### Manual Trigger

1. Go to **Actions** tab in GitHub
2. Select **GitAntivirus Workflow**
3. Click **Run workflow**
4. Choose branch and run

### Viewing Results

1. Navigate to **Actions** tab
2. Click on a workflow run
3. View job logs and summaries
4. Download quarantine artifacts

## Monitoring and Logs

### SmartBrain Log

```bash
# Tail the log
tail -f SMARTBRAIN.log

# Search for specific agent
grep "AgentA" SMARTBRAIN.log

# Find errors
grep "ERROR" SMARTBRAIN.log

# Watch in real-time
watch -n 1 "tail -20 SMARTBRAIN.log"
```

### Log Format

```
[TIMESTAMP][AGENT][LEVEL] MESSAGE
[2024-12-31T02:00:00+00:00][AgentA][INFO] Starting audit...
```

### Audit Reports

Location: `AUDIT-REPORT.md`

Contains:
- Agent summaries
- Findings and improvements
- TODOs and risks
- Status indicators

### Quarantine Files

Location: `.quarantine/`

Files:
- `suspicious-files.txt` - Flagged files
- `archives-review.txt` - Archives to review

## Security Best Practices

### 1. Never Commit Secrets

```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "*.pem" >> .gitignore
```

### 2. Always Test in Dry-Run

```bash
# Test first
DRY_RUN=true ./scripts/master.sh audit

# Then apply
DRY_RUN=false ./scripts/master.sh audit
```

### 3. Review Quarantine Files

```bash
# Check flagged files
cat .quarantine/suspicious-files.txt

# Review archives
cat .quarantine/archives-review.txt
```

### 4. Monitor Logs

```bash
# Check for alerts
grep "ALERT" SMARTBRAIN.log

# Review warnings
grep "WARN" SMARTBRAIN.log
```

### 5. Regular Updates

```bash
# Update dependencies
pnpm update

# Check for vulnerabilities
pnpm audit
```

## Troubleshooting

### Common Issues

#### Scripts Not Executable

```bash
chmod +x scripts/*.sh
```

#### PNPM Not Found

```bash
npm install -g pnpm
```

#### Port Already in Use

```bash
./scripts/master.sh heal
```

#### Permission Denied

```bash
sudo chown -R $USER:$USER .
```

### Debug Mode

```bash
# Enable verbose logging
export LOG_LEVEL=DEBUG

# Run with bash debug
bash -x scripts/master.sh health
```

### Getting Help

1. Check `SMARTBRAIN.log` for error details
2. Review `AUDIT-REPORT.md` for issues
3. Run health check: `./scripts/master.sh health`
4. Check GitHub Issues for known problems

## Maintenance

### Regular Tasks

- **Daily**: Review SMARTBRAIN.log
- **Weekly**: Run full audit
- **Monthly**: Update dependencies
- **Quarterly**: Review security settings

### Backup

```bash
# Backup logs
cp SMARTBRAIN.log "SMARTBRAIN.log.$(date +%Y%m%d)"

# Backup reports
cp AUDIT-REPORT.md "AUDIT-REPORT.$(date +%Y%m%d).md"
```

## Advanced Topics

### Custom Agents

Create custom agents in `scripts/`:

```bash
#!/usr/bin/env bash
# scripts/agent-custom.sh

DRY_RUN="${DRY_RUN:-true}"
# Your agent logic here
```

### Extending Workflows

Add to `.github/workflows/`:

```yaml
name: Custom Workflow
on: [push]
jobs:
  custom:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/master.sh custom
```

### Integration with CI/CD

```yaml
# In your CI pipeline
- name: SmartBrain Health Check
  run: |
    chmod +x scripts/*.sh
    ./scripts/master.sh health
```

## Support

- **Repository**: https://github.com/CyberAi/CyberAi
- **Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas

## License

See repository LICENSE file for details.

---

**Last Updated**: 2024-12-31
**Version**: 1.0.0
