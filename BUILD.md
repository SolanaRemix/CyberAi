# CyberAi Advanced Build System Documentation

This document provides comprehensive information about the advanced build system integrated into the CyberAi repository.

## 🏗️ Overview

CyberAi now includes a sophisticated build system with multiple build tools and configurations to support various development and deployment scenarios.

## 📋 Table of Contents

- [Build Tools](#build-tools)
- [Quick Start](#quick-start)
- [Build Commands](#build-commands)
- [Configuration Files](#configuration-files)
- [Docker Support](#docker-support)
- [CI/CD Integration](#cicd-integration)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)

## 🔧 Build Tools

### 1. **Makefile**
Cross-platform build automation with comprehensive targets for development and production.

**Key Features:**
- Color-coded output for better readability
- Parallel execution support
- Comprehensive help system
- Quality gates and verification

**Usage:**
```bash
make help           # Display all available targets
make install        # Install dependencies
make build          # Build the project
make test           # Run tests
make quality        # Run all quality checks
```

### 2. **TypeScript Compiler (tsc)**
Primary build tool for TypeScript compilation.

**Configuration:** `tsconfig.json`

**Usage:**
```bash
npm run build              # Standard build
npm run build:watch        # Watch mode
npm run typecheck          # Type check only
```

### 3. **esbuild**
Advanced bundling with optimization and tree-shaking.

**Configuration:** `esbuild.config.js`

**Features:**
- Fast compilation
- Code splitting
- Tree shaking
- Minification
- Source maps

**Usage:**
```bash
npm run build:esbuild        # Build with esbuild
npm run build:esbuild:watch  # Watch mode
```

### 4. **Turbo**
Monorepo build orchestration with intelligent caching.

**Configuration:** `turbo.json`

**Features:**
- Parallel execution
- Incremental builds
- Remote caching
- Task dependencies

**Usage:**
```bash
turbo run build      # Run build with turbo
turbo run test       # Run tests with caching
```

### 5. **Advanced Build Script**
Comprehensive build orchestration script.

**Location:** `scripts/advanced-build.sh`

**Features:**
- Multi-stage builds
- Environment configuration
- Quality checks integration
- Build verification
- Detailed logging

**Usage:**
```bash
npm run build:advanced     # Production build
npm run build:dev          # Development build

# With environment variables
SKIP_TESTS=true npm run build:advanced
VERBOSE=true npm run build:advanced
```

## 🚀 Quick Start

### Basic Build
```bash
# Clone and setup
git clone https://github.com/SolanaRemix/CyberAi.git
cd CyberAi

# Using Makefile (recommended)
make install
make build
make test

# Using npm scripts
npm ci
npm run build
npm test
```

### Production Build
```bash
# Using Makefile
make build-prod

# Using advanced script
npm run build:advanced

# Using Make with full pipeline
make ci
```

### Development Workflow
```bash
# Start in watch mode
make build-watch

# Or using npm
npm run build:watch

# With test watcher
make test-watch
```

## 📦 Build Commands

### NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Standard TypeScript build |
| `npm run build:advanced` | Production build with advanced script |
| `npm run build:dev` | Development build |
| `npm run build:watch` | Watch mode for incremental builds |
| `npm run build:esbuild` | Build with esbuild bundler |
| `npm run build:esbuild:watch` | esbuild watch mode |
| `npm run clean` | Clean build artifacts |
| `npm run clean:all` | Deep clean including node_modules |

### Makefile Targets

| Target | Description |
|--------|-------------|
| `make help` | Display help |
| `make install` | Install dependencies |
| `make build` | Build project |
| `make build-prod` | Production build |
| `make build-watch` | Watch mode |
| `make test` | Run tests |
| `make lint` | Run linter |
| `make typecheck` | Type checking |
| `make quality` | All quality checks |
| `make clean` | Clean artifacts |
| `make ci` | Full CI pipeline |

## ⚙️ Configuration Files

### `tsconfig.json`
TypeScript compiler configuration.
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist"
  }
}
```

### `esbuild.config.js`
esbuild bundler configuration with multiple entry points.

**Key Features:**
- Multiple bundles (main, agents, contracts, security, utils)
- Production minification
- Source maps
- Tree shaking
- Watch mode support

### `turbo.json`
Turbo monorepo configuration.

**Pipeline Configuration:**
- Build dependencies
- Caching strategies
- Output directories
- Environment variables

### `Makefile`
Cross-platform build automation.

**Variables:**
- `NODE_VERSION`: Target Node.js version
- `BUILD_DIR`: Build output directory
- `LOGS_DIR`: Logs directory

## 🐳 Docker Support

### Dockerfile
Multi-stage Docker build with optimization.

**Stages:**
1. **base**: Base image with system dependencies
2. **deps**: Production dependencies
3. **dev-deps**: Development dependencies
4. **builder**: Build stage
5. **production**: Final production image
6. **development**: Development image

**Usage:**
```bash
# Build production image
docker build -t cyberai:latest .

# Build development image
docker build --target development -t cyberai:dev .

# Run container
docker run -p 3000:3000 cyberai:latest
```

### docker-compose.yml
Multi-service orchestration.

**Services:**
- `app`: Main application (production)
- `dev`: Development service
- `site`: Astro site
- `redis`: Cache layer (optional)
- `nginx`: Reverse proxy (optional)

**Usage:**
```bash
# Start all services
docker-compose up -d

# Start specific profile
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**NPM Scripts:**
```bash
npm run docker:build    # Build Docker image
npm run docker:run      # Run container
npm run docker:up       # Docker Compose up
npm run docker:down     # Docker Compose down
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow
Location: `.github/workflows/advanced-build.yml`

**Jobs:**
1. **build-matrix**: Multi-platform builds (Ubuntu, macOS, Windows)
2. **optimized-build**: Production-optimized build
3. **docker-build**: Docker image build test
4. **verify-build**: Build output verification
5. **benchmark**: Performance benchmarks

**Features:**
- Multi-OS testing
- Multiple Node.js versions
- Build artifacts upload
- Size analysis
- Performance metrics

**Trigger:**
```bash
# Automatically on push/PR to main/develop
# Manual trigger via workflow_dispatch
```

## 🎯 Advanced Features

### 1. **Parallel Builds**
```bash
# Using Make parallel execution
make -j4 build test lint

# Using Turbo
turbo run build test --parallel
```

### 2. **Incremental Builds**
```bash
# TypeScript incremental
npm run build:watch

# esbuild watch
npm run build:esbuild:watch
```

### 3. **Build Caching**
- TypeScript: `.tsbuildinfo`
- Turbo: `.turbo/cache`
- Docker: BuildKit cache

### 4. **Build Information**
Generated file: `dist/build-info.json`

Contains:
- Version
- Build mode
- Timestamp
- Node version
- Git commit/branch
- Platform info

### 5. **Quality Gates**
```bash
# Run all quality checks
make quality

# Individual checks
make lint
make typecheck
make test
```

### 6. **Build Verification**
Automatic verification of:
- Build output existence
- Required files
- Build info generation

## 🛠️ Troubleshooting

### Common Issues

#### Build Fails with "Out of Memory"
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Permission Denied on Scripts
```bash
chmod +x scripts/advanced-build.sh
```

#### Docker Build Slow
```bash
# Use BuildKit
DOCKER_BUILDKIT=1 docker build .

# Check .dockerignore
cat .dockerignore
```

#### Makefile Not Found
Ensure you're in the project root:
```bash
cd /home/runner/work/CyberAi/CyberAi
make help
```

### Clean Build
```bash
# Clean and rebuild
make clean-all
make install
make build
```

### Verbose Output
```bash
# With advanced script
VERBOSE=true npm run build:advanced

# With make
make build V=1
```

## 📊 Build Metrics

### Build Times (Approximate)
- Standard build: ~5-10s
- Advanced build: ~20-30s
- Docker build: ~2-3 min
- Full CI pipeline: ~5-10 min

### Output Sizes
- TypeScript output: ~500KB - 2MB
- esbuild bundle: ~300KB - 1MB (minified)
- Docker image: ~200-400MB

## 🔐 Security

### Best Practices
1. Use multi-stage Docker builds
2. Run as non-root user in containers
3. Scan dependencies regularly
4. Use specific versions in CI
5. Implement build verification

### Security Features
- Non-root Docker user
- Minimal base images
- Dependency scanning
- Secret exclusion (.dockerignore)

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [esbuild Documentation](https://esbuild.github.io/)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Make Documentation](https://www.gnu.org/software/make/manual/)

## 🤝 Contributing

When adding new build features:
1. Update this documentation
2. Add tests for new build targets
3. Update CI/CD workflows
4. Ensure cross-platform compatibility
5. Add examples and troubleshooting

## 📝 License

This build system is part of the CyberAi project and follows the same license (MIT).
