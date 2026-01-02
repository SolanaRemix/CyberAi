# CyberAi

**CyberAi (formerly CuberAi)** - AI-Powered Smart Contract Security & Orchestration Platform

> 🚀 Automated security auditing, self-healing workflows, and intelligent contract analysis for Web3 developers

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=github-actions)](/.github/workflows)
[![Security](https://img.shields.io/badge/Security-GitAntivirus-success)](.github/workflows/gitantivirus.yml)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Migration Notice](#migration-notice)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Components](#components)
- [Documentation](#documentation)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**CyberAi** is a comprehensive AI-powered orchestration system designed for smart contract development, security auditing, and automated maintenance. It combines multiple specialized agents, workflows, and tools to provide:

- 🔒 **Automated Security Auditing** - Continuous contract scanning and vulnerability detection
- 🤖 **SmartBrain Orchestrator** - Multi-agent coordination system for automated tasks
- 🔧 **Self-Healing Workflows** - Automatic detection and repair of common issues
- 🌐 **Multi-Chain Support** - Works with Ethereum, Solana, and other blockchains
- 📊 **DAO Governance Tools** - Merkle tree generation, airdrop management
- 🛡️ **GitAntivirus** - Repository security scanning and quarantine management

---

## 📢 Migration Notice

**CyberAi** is the consolidated platform that brings together features from multiple SolanaRemix repositories:

### Migrated From:
- **SolanaRemix/CuberAi** - Base repository (to be archived)
- **SolanaRemix/SmartContractAudit** - Core auditing scripts, workflows, and bots
- **SolanaRemix/SmartBrain** - Orchestration and deployment automation
- **SolanaRemix/gxqs** - Automation and conflict handling

### What Changed:
- ✅ All scripts, bots, and workflows consolidated into CyberAi
- ✅ Enhanced documentation and setup guides
- ✅ Unified architecture with clear component separation
- ✅ Improved CI/CD workflows with GitHub Actions
- ✅ Comprehensive governance and security policies

### Archival Plan:
After successful merge and validation of CyberAi:
- CuberAi repository will be **archived** to prevent further changes
- All development will continue in the CyberAi repository
- Historical references will be preserved for continuity

📄 **[View Complete Migration Summary →](MIGRATION.md)**

---

## ✨ Key Features

### 🔍 SmartBrain Orchestrator

Central coordination hub that manages multiple specialized agents:

```bash
# Run comprehensive audit
./scripts/master.sh audit

# Execute self-healing workflows
./scripts/master.sh heal

# Check system health
./scripts/master.sh health

# Run security scan
./scripts/master.sh scan
```

**Agents Include:**
- **AgentA-F** - Specialized analysis agents
- **AgentX** - Cross-cutting concerns
- **Audit Agent** - Contract security analysis
- **Healer Agents** - Automated fix deployment

### 🛡️ GitAntivirus Workflow

Automated security scanning that runs on:
- Every push to any branch
- All pull requests
- Daily scheduled scans (2 AM UTC)
- Manual dispatch via GitHub Actions

**Features:**
- Pattern-based threat detection
- Archive file analysis
- Suspicious code identification
- Automatic quarantine management
- Detailed security reports

### 🔧 Self-Healing Scripts

Automated maintenance and repair:
- **Port Cleaning** - Free hanging ports (3000-4000 range)
- **UI Healing** - Fix common frontend issues
- **Component Healing** - Repair broken dependencies
- **Availability Checks** - Monitor service health

### 🏛️ DAO Governance

Tools for decentralized governance:
- **Merkle Tree Generator** - Efficient airdrop distribution
- **Airdrop Management** - Token distribution workflows
- **Governance Documentation** - Clear processes and roles

### 🌐 Web Interface

Self-hosted web components:
- Landing page with feature showcase
- Billing and payment integration (placeholder)
- Documentation portal
- Interactive API explorer

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CyberAi Platform                          │
└────────────────────┬────────────────────────────────────────┘
                     │
       ┌─────────────┴─────────────┐
       │                           │
┌──────▼────────┐         ┌───────▼────────┐
│  SmartBrain   │         │   GitAntivirus │
│  Orchestrator │         │    Workflow    │
│  (master.sh)  │         │  (CI/CD)       │
└──────┬────────┘         └───────┬────────┘
       │                          │
   ┌───┴───┐                  ┌───┴───┐
   │       │                  │       │
┌──▼──┐ ┌─▼──┐            ┌──▼──┐ ┌─▼──┐
│Agent│ │Bot │            │Scan │ │Heal│
│Suite│ │Tmpl│            │     │ │    │
└─────┘ └────┘            └─────┘ └────┘
   │       │                  │       │
   └───────┴──────────┬───────┴───────┘
                      │
              ┌───────▼────────┐
              │  DAO & Web     │
              │  Components    │
              └────────────────┘
```

### Component Overview

| Component | Purpose | Location |
|-----------|---------|----------|
| **SmartBrain** | Multi-agent orchestration | `scripts/master.sh` |
| **Audit Scripts** | Security analysis | `scripts/audit.sh` |
| **Healers** | Automated fixes | `scripts/*-healer-*.sh` |
| **Bot Templates** | Extensible automation | `templates/node-bot-template.js` |
| **Workflows** | CI/CD pipelines | `.github/workflows/*.yml` |
| **DAO Tools** | Governance utilities | `dao/merkle/` |
| **Web UI** | User interface | `web/*.html` |
| **Documentation** | Guides and references | `docs/` |

---

## 🚀 Quick Start

### Prerequisites

- **Operating System**: Linux, macOS, or WSL2
- **Node.js**: 16.x or higher
- **pnpm**: 8.x or higher
- **Bash**: 4.x or higher
- **Git**: 2.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/SolanaRemix/CyberAi.git
cd CyberAi

# Copy environment template
cp .env.example .env

# Edit configuration (set DRY_RUN=true for safety)
nano .env

# Make scripts executable
chmod +x scripts/*.sh

# Run health check
./scripts/master.sh health
```

### Basic Usage

```bash
# 1. Run comprehensive audit (dry-run mode)
DRY_RUN=true ./scripts/master.sh audit

# 2. Review audit report
cat AUDIT-REPORT.md

# 3. Check system health
./scripts/master.sh health

# 4. Execute self-healing (dry-run)
DRY_RUN=true ./scripts/master.sh heal

# 5. Production mode (use with caution!)
DRY_RUN=false ./scripts/master.sh audit
```

### GitHub Actions Integration

Workflows automatically run on push and PR:

```yaml
# Example: .github/workflows/gitantivirus.yml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

**Manual Trigger:**
1. Go to **Actions** tab
2. Select **GitAntivirus**
3. Click **Run workflow**

---

## 📦 Components

### Scripts (`scripts/`)

| Script | Description | Usage |
|--------|-------------|-------|
| `master.sh` | SmartBrain orchestrator | `./scripts/master.sh <command>` |
| `audit.sh` | Security auditing | Called by master.sh |
| `mega-neo-self-healer-v5.sh` | UI component healing | Called by master.sh |
| `castquest-mega-selfheal.sh` | Cast/quest healing | Called by master.sh |
| `availability-check.sh` | Service monitoring | Standalone or via master.sh |

### Templates (`templates/`)

| Template | Purpose |
|----------|---------|
| `node-bot-template.js` | Extensible bot framework for custom automation |
| `onboarding.md` | New contributor guide |

### Workflows (`.github/workflows/`)

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `gitantivirus.yml` | Push, PR, Schedule | Comprehensive security scanning |
| `git-antivirus.yml` | Push, PR | Quick security check |
| `release-schedule.yml` | Schedule, Manual | Release automation |

### Configuration

| File | Purpose |
|------|---------|
| `.env.example` | Environment template with all variables |
| `config/repair.json` | Repair configuration for healers |

### DAO Tools (`dao/`)

| Component | Purpose |
|-----------|---------|
| `merkle/generate_merkle.js` | Generate merkle trees for airdrops |
| `airdrop-sample.json` | Example airdrop configuration |

### Web Components (`web/`)

| File | Purpose |
|------|---------|
| `index.html` | Landing page |
| `billing.html` | Payment integration (placeholder) |
| `README.md` | Web component documentation |

---

## 📚 Documentation

### Core Guides

- **[Setup Documentation](docs/cuberai-setup.md)** - Comprehensive installation and configuration guide
- **[Release Process](docs/release-process.md)** - Version management and deployment
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community standards
- **[Security Policy](SECURITY.md)** - Vulnerability reporting and security practices
- **[Governance](GOVERNANCE.md)** - Project governance structure
- **[TRIO Framework](TRIO.md)** - Product, Governance, Security principles

### Additional Resources

- **[Data Retention Policy](DATA_RETENTION.md)** - Data handling and retention
- **[Privacy Policy](PRIVACY.md)** - Privacy practices and commitments
- **[Release Notes](RELEASE.md)** - Version history and changes
- **[DAO Documentation](docs/dao/)** - Governance tools and processes
- **[Partner Information](docs/partners/)** - Integration and partnership details

---

## 🔒 Security

Security is our top priority. CyberAi includes multiple layers of protection:

### Security Features

- 🔍 **GitAntivirus** - Automated repository scanning
- 🔐 **Secret Detection** - Prevent credential leaks
- 🛡️ **Vulnerability Scanning** - Dependency security checks
- 📋 **Audit Trails** - Comprehensive logging
- 🚨 **Quarantine System** - Isolate suspicious files

### Reporting Security Issues

**DO NOT** create public GitHub issues for security vulnerabilities.

Instead, email: **security@cuberai.example** (placeholder)

- Use PGP encryption if possible (key: placeholder)
- Include detailed description and reproduction steps
- Expect acknowledgment within 48 hours

For more details, see [SECURITY.md](SECURITY.md).

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/CyberAi.git`
3. **Create** a branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Sign** commits: `git commit -s -m "Add amazing feature"`
6. **Push** to your fork: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Development Guidelines

- Always use **DRY_RUN=true** for testing
- Write clear commit messages
- Update documentation for new features
- Add tests when applicable
- Follow existing code style
- Sign all commits (DCO)

### Areas for Contribution

- 🔒 Additional security checks
- 🤖 New agent capabilities
- 📝 Documentation improvements
- 🐛 Bug fixes
- ✨ Feature requests
- 🌐 Multi-chain support
- 🧪 Test coverage

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📊 Project Status

### Current Release: v1.0.0 (Migration Release)

- ✅ Core scripts migrated and tested
- ✅ Workflows configured and active
- ✅ Documentation comprehensive and up-to-date
- ✅ Security policies in place
- ✅ Governance structure defined

### Roadmap

- **Q1 2025**: Enhanced AI agent capabilities
- **Q2 2025**: Multi-chain deployment tools
- **Q3 2025**: Advanced analytics dashboard
- **Q4 2025**: DAO governance integration

---

## 🙏 Acknowledgments

CyberAi is built on the foundation of several SolanaRemix projects:

- **SmartContractAudit** - Core auditing infrastructure
- **SmartBrain** - Orchestration and automation
- **gxqs** - Conflict resolution and automation
- **CuberAi** - Original repository structure

Special thanks to all contributors and the SolanaRemix community.

---

## 📄 License

Copyright (c) 2024-2025 SolanaRemix

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

See [LICENSE](LICENSE) for full details.

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/SolanaRemix/CyberAi/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/SolanaRemix/CyberAi/discussions)
- **Security**: security@cuberai.example (placeholder)
- **General**: hello@cuberai.example (placeholder)

---

## 🔗 Related Projects

- [SmartContractAudit](https://github.com/SolanaRemix/SmartContractAudit) - Original audit infrastructure
- [SmartBrain](https://github.com/SolanaRemix/SmartBrain) - Smart contract automation
- [gxqs](https://github.com/SolanaRemix/gxqs) - Automation framework
- [node](https://github.com/SolanaRemix/node) - Node module security

---

<div align="center">

**CyberAi** - Secure, Automated, Intelligent

🔒 Security | 🤖 Automation | 🌐 Multi-Chain | 🏛️ DAO-Ready

[Get Started](#-quick-start) • [Documentation](#-documentation) • [Contribute](#-contributing)

Made with ❤️ by the SolanaRemix Team

</div>