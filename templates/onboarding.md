# CuberAi Onboarding Guide

Welcome to the **CuberAi SmartBrain Orchestration System**! This guide will help you get started with our automated audit, healing, and security workflows.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ (for bot templates)
- **pnpm** (for workspace management)
- **Bash** (for orchestrator scripts)
- **Git** (for version control)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SolanaRemix/SmartContractAudit.git
   cd SmartContractAudit
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env
   # Edit .env and ensure DRY_RUN=true for testing
   ```

3. **Make scripts executable**

   ```bash
   chmod +x scripts/*.sh
   ```

4. **Install dependencies** (if applicable)
   ```bash
   pnpm install
   ```

## 🧠 SmartBrain Orchestrator

The **master.sh** script is the central orchestrator that coordinates multiple AI agents:

### Available Commands

```bash
# Full audit with Agent A
./scripts/master.sh audit

# Self-healing with Agent B
./scripts/master.sh heal

# Integrity checks with Agent C
./scripts/master.sh integrity

# Health check with Agent F
./scripts/master.sh health

# Security scan with Agent X
./scripts/master.sh scan
```

### Agent Overview

- **Agent A** - Code Auditor: Analyzes code quality and best practices
- **Agent B** - Fixer & Optimizer: Auto-heals common issues
- **Agent C** - Security & Compliance: Validates contracts and security
- **Agent D** - Documentation & DX: Maintains docs and developer experience
- **Agent E** - UI/UX Auto-Heal: Repairs UI components and error boundaries
- **Agent F** - CI/CD: Manages continuous integration and deployment
- **Agent X** - Antivirus: Scans for suspicious patterns and malware

## 🔒 Safety First

### Conservative Defaults

All scripts default to **non-destructive behavior**:

- `DRY_RUN=true` by default - changes are logged but not applied
- No automatic commits or pushes
- Read-only operations unless explicitly enabled
- Quarantine suspicious files instead of deleting

### Enabling Production Mode

Only enable production mode after thorough testing:

```bash
# Set in environment
export DRY_RUN=false

# Or inline
DRY_RUN=false ./scripts/master.sh heal
```

## 🤖 Node Bot Templates

Create custom automation bots using the provided template:

```bash
# Copy the template
cp templates/node-bot-template.js my-custom-bot.js

# Make it executable
chmod +x my-custom-bot.js

# Run in dry-run mode
node my-custom-bot.js
```

## 🛡️ GitAntivirus Workflow

The GitAntivirus workflow runs automatically:

- **On push** to any branch
- **On pull request** to main/master
- **Daily** at 2 AM UTC
- **Manual trigger** via GitHub Actions

### What it scans

- Suspicious shell commands (`rm -rf`, `curl | sh`, etc.)
- Eval statements and code injection patterns
- Archive files that need review
- Security vulnerabilities

### Viewing Results

Check the GitHub Actions tab for scan results and download quarantine reports from artifacts.

## 📊 Logs and Reports

### SmartBrain Log

All agent activities are logged to `SMARTBRAIN.log`:

```bash
# View recent activity
tail -f SMARTBRAIN.log

# Filter by agent
grep "AgentX" SMARTBRAIN.log
```

### Audit Report

After running an audit, check `AUDIT-REPORT.md` for a comprehensive summary.

### Quarantine Directory

Suspicious files are flagged in `.quarantine/`:

- `suspicious-files.txt` - Files with dangerous patterns
- `archives-review.txt` - Archives needing manual review

## 🎨 GitHub Pages Control Panel

A lightweight control panel is available at the GitHub Pages site (if enabled):

```bash
# View locally
open docs/index.html
```

## 📝 Configuration

### Environment Variables

Create `.env` from `.env.example`:

```bash
# Safety Settings
DRY_RUN=true                    # Enable dry-run mode (REQUIRED for testing)

# Optional Settings
PNPM=pnpm                       # Package manager command
LOG_LEVEL=INFO                  # Logging verbosity
```

### Custom Configuration

Modify behavior in `scripts/master.sh`:

- Port ranges for cleaning
- Audit patterns
- Healing strategies
- Security scan rules

## 🔧 Troubleshooting

### Scripts not executable

```bash
chmod +x scripts/*.sh
```

### PNPM not found

```bash
npm install -g pnpm
```

### Port conflicts

```bash
# Clean hanging processes
./scripts/master.sh heal
```

## 📚 Additional Resources

- [GitHub Repository](https://github.com/SolanaRemix/SmartContractAudit)
- [CuberAi Documentation](docs/cuberai-setup.md)
- [Security Best Practices](docs/security.md)

## 🤝 Contributing

1. Always test in `DRY_RUN=true` mode first
2. Never commit secrets or credentials
3. Follow the existing code style
4. Update documentation for new features
5. Run health checks before submitting PRs

## ⚠️ Important Notes

- **Never** disable safety features in production without review
- **Always** check quarantine reports after scans
- **Regularly** update dependencies for security patches
- **Monitor** SMARTBRAIN.log for agent alerts
- **Review** changes before applying them

## 🎯 Next Steps

1. ✅ Complete this onboarding guide
2. ✅ Run `./scripts/master.sh health` to verify setup
3. ✅ Execute `./scripts/master.sh audit` in DRY_RUN mode
4. ✅ Review the generated AUDIT-REPORT.md
5. ✅ Explore the GitHub Pages control panel
6. ✅ Create your first custom bot from the template

Welcome to the CuberAi ecosystem! 🚀🌌
