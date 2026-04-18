# CyberAi.network

[![CI](https://github.com/SolanaRemix/CyberAi/workflows/CI/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/ci.yml)
[![CodeQL](https://github.com/SolanaRemix/CyberAi/workflows/CodeQL/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://cyberai.network)
![CI](https://github.com/SolanaRemix/CyberAi/actions/workflows/ci-deploy.yml/badge.svg)

**AI-Powered Smart Contract Security & Orchestration Platform**

CyberAi is the central control plane for the decentralized AI ecosystem, providing contract registry, automated workflows, and security tools for blockchain applications.

## 🖼️ UI Screenshots

### Landing Page

![Landing Page UI](docs/screenshots/landing-page.png)

### Admin Dashboard

![Admin Dashboard UI](docs/screenshots/admin-dashboard.png)

### User App

![User App UI](docs/screenshots/user-app.png)

### Dev Terminal

![Dev Terminal UI](docs/screenshots/dev-terminal.png)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SolanaRemix/CyberAi.git
cd CyberAi

# Run bootstrap (installs dependencies, validates contracts, builds site)
./tools/bootstrap/bootstrap.sh

# Start development server
cd site && npm run dev
```

Visit [cyberai.network](https://cyberai.network) for full documentation.

## 📁 Repository Structure

```
CyberAi/
├── contracts/          # Machine-readable contracts for ecosystem participants
│   ├── agents/        # AI agent contracts
│   ├── repos/         # Repository contracts
│   └── contract.schema.json
├── prompts/           # Operator-grade instruction prompts
│   ├── agents/        # Agent prompts
│   ├── operators/     # Operator prompts
│   ├── systems/       # System prompts
│   └── workflows/     # Workflow prompts
├── src/               # Core source code
│   ├── agents/        # Agent implementations
│   ├── contracts/     # Contract validation
│   ├── security/      # Security tools
│   └── utils/         # Shared utilities
├── tests/             # Test suites
│   ├── unit/          # Unit tests
│   └── integration/   # Integration tests
├── tools/             # Operational tools
│   ├── bootstrap/     # Bootstrap script
│   └── audit/         # Audit script
├── site/              # Main Astro site (cyberai.network)
│   └── src/
│       ├── pages/     # Documentation and site pages
│       └── layouts/   # Page layouts
├── docs/              # Documentation portal (🚧 Under Development)
├── app/               # Main application (🚧 Under Development)
├── dashboard/         # Dashboard interface (🚧 Under Development)
├── terminal/          # Terminal interface (🚧 Under Development)
├── smartbrain/        # SmartBrain AI (🚧 Under Development)
├── audit/             # Audit tools (🚧 Under Development)
├── api/               # API documentation (🚧 Under Development)
├── scripts/           # Build and automation scripts
└── .github/
    ├── workflows/     # CI/CD workflows
    └── copilot/       # GitHub Copilot agent configuration
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CyberAi Platform                        │
│                   cyberai.network (Main)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┬──────────────┐
       │               │               │              │
┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐ ┌────▼─────┐
│ Documentation│ │ Dashboard │ │  Terminal   │ │   API    │
│    Portal    │ │ Interface │ │  Interface  │ │ Gateway  │
└──────────────┘ └───────────┘ └─────────────┘ └──────────┘
   docs.*          dashboard.*    terminal.*       api.*
       │               │               │              │
       └───────────────┼───────────────┴──────────────┘
                       │
       ┌───────────────┼───────────────┬──────────────┐
       │               │               │              │
┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐ ┌────▼─────┐
│ SmartBrain  │ │   Audit   │ │ GitAntivirus│ │   Main   │
│     AI      │ │   Tools   │ │   Scanner   │ │   App    │
└─────────────┘ └───────────┘ └─────────────┘ └──────────┘
 smartbrain.*     audit.*                        app.*
       │               │               │              │
       └───────────────┴───────────────┴──────────────┘
                       │
              ┌────────▼────────┐
              │  Contract Layer │
              │  ┌───────────┐  │
              │  │  Agents   │  │
              │  ├───────────┤  │
              │  │   Repos   │  │
              │  ├───────────┤  │
              │  │  Runners  │  │
              │  └───────────┘  │
              └─────────────────┘
```

## 🔑 Key Features

### Contract Registry

Machine-readable contracts define capabilities, requirements, and metadata for:

- **Agents**: AI services for security audits, code analysis, and automation
- **Repositories**: Code repositories providing functionality
- **Runners**: Execution environments for agents

### Automation Tools

- **Bootstrap**: Verifies environment, installs dependencies, validates contracts, builds site
- **Audit**: Validates contracts, workflows, and site integrity

### GitHub Pages Site

Static site powered by Astro, serving:

- Comprehensive documentation
- Contract browsing
- API reference
- Quickstart guides

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Install dependencies
npm install

# Validate contracts
./tools/audit/audit.sh

# Build site
cd site
npm run build

# Preview site
npm run preview
```

### Adding Contracts

1. Create contract JSON in `contracts/agents/` or `contracts/repositories/`
2. Validate: `ajv validate -s contracts/contract.schema.json -d "contracts/agents/your-contract.json" --strict=false`
3. Submit PR

See [Contract Documentation](https://cyberai.network/docs/contracts) for details.

## 🏗️ Advanced Build System

CyberAi includes a comprehensive build system with multiple tools and configurations for various development and deployment scenarios.

### Build Tools

- **Makefile**: Cross-platform automation with 30+ targets
- **TypeScript Compiler (tsc)**: Primary build tool
- **esbuild**: Advanced bundling with tree-shaking and minification
- **Turbo**: Monorepo orchestration with intelligent caching
- **Docker**: Multi-stage containerization with optimization

### Quick Build Commands

```bash
# Using Makefile (recommended)
make help           # Show all available targets
make build          # Build the project
make test           # Run tests
make quality        # Run all quality checks
make ci             # Full CI pipeline

# Using npm scripts
npm run build               # Standard build
npm run build:advanced      # Production build with optimization
npm run build:esbuild       # Build with esbuild bundler
npm run docker:build        # Build Docker image
npm run docker:up           # Start Docker Compose services
```

### Advanced Features

- **Multi-platform builds**: Linux, macOS, Windows
- **Multiple Node.js versions**: 18, 20, 21
- **Build caching**: Intelligent caching with Turbo
- **Build verification**: Automatic output validation
- **Build information**: Metadata generation (version, commit, timestamp)
- **Quality gates**: Integrated linting, type checking, and testing

For complete build system documentation, see [BUILD.md](BUILD.md).

## 🚀 Deployment

CyberAi is deployed using **GitHub Pages** with automatic deployment on push to the main branch.

### Hosting

- **Platform**: GitHub Pages
- **Domain**: [cyberai.network](https://cyberai.network)
- **Build System**: Astro static site generator
- **Deployment**: Automated via GitHub Actions

### Deployment Process

1. Push changes to the main branch
2. GitHub Actions automatically builds the site
3. Site is deployed to GitHub Pages
4. Changes are live at cyberai.network

### Vercel Migration

This project has been fully migrated from Vercel to GitHub Pages. A `vercel.json` configuration file is included to disable Vercel builds and prevent deployment conflicts.

If you're experiencing issues migrating from Vercel, use our diagnostic tool:

```bash
# Run the Vercel issue scanner
bash tools/vercel-scanner.sh
```

This tool will:

- Check for Vercel configuration files
- Identify Vercel-specific dependencies
- Verify GitHub Pages setup
- Provide migration guidance

**Note**: The `vercel.json` file explicitly disables Vercel deployments. If the Vercel GitHub App is still connected to your repository, it will see this configuration and skip builds.

## 📚 Documentation

- [Quickstart Guide](https://cyberai.network/docs/quickstart)
- [Architecture Overview](https://cyberai.network/docs/architecture)
- [Operations Runbook](https://cyberai.network/docs/runbook)
- [Contract Specification](https://cyberai.network/docs/contracts)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 🔒 Security

See [SECURITY.md](SECURITY.md) for security policies and vulnerability reporting.

## 📄 License

Licensed under the Apache 2.0 License. See [LICENSE](LICENSE) for details.

## 🌐 Links

- **Website**: [cyberai.network](https://cyberai.network)
- **GitHub**: [SolanaRemix/CyberAi](https://github.com/SolanaRemix/CyberAi)
- **Documentation**: [cyberai.network/docs](https://cyberai.network/docs)

---

Built with ❤️ by the CyberAi community
