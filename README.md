# CyberAi.network

**AI-Powered Smart Contract Security & Orchestration Platform**

CyberAi is the central control plane for the decentralized AI ecosystem, providing contract registry, automated workflows, and security tools for blockchain applications.

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
│   ├── repositories/  # Repository contracts
│   ├── runners/       # Runner contracts (future)
│   └── contract.schema.json
├── prompts/           # Operator-grade instruction prompts
│   ├── agents/        # Agent prompts
│   ├── operators/     # Operator prompts
│   └── workflows/     # Workflow prompts
├── tools/             # Operational tools
│   ├── bootstrap/     # Bootstrap script
│   └── audit/         # Audit script
├── site/              # GitHub Pages site (Astro)
│   └── src/
│       ├── pages/     # Documentation and site pages
│       └── layouts/   # Page layouts
├── docs/              # Additional documentation
└── .github/
    └── workflows/     # CI/CD workflows
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
