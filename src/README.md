# CyberAi Source Code

This directory contains the core source code for the CyberAi control-plane platform.

## Structure

```
src/
├── agents/          # AI agent implementations
├── api/             # API server and endpoints
├── cli/             # Command-line interface tools
├── contracts/       # Contract validation and processing
├── security/        # Security scanning and audit tools
└── utils/           # Shared utilities and helpers
```

## Development

The CyberAi platform is built with TypeScript and Node.js. All source code should follow the established coding standards and be properly typed.

### Getting Started

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## Guidelines

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Add unit tests for all new functionality
- Document public APIs with JSDoc comments
- Keep dependencies minimal and well-justified

## Related

- See `/tests` for test suites
- See `/tools` for operational tooling
- See `/docs` for comprehensive documentation
