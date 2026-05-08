# CyberAi.network

[![CI](https://github.com/SolanaRemix/CyberAi/workflows/CI/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/ci.yml)
[![CodeQL](https://github.com/SolanaRemix/CyberAi/workflows/CodeQL/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)

**Enterprise AI orchestration for secure contract and workflow operations.**

CyberAi provides an enterprise control plane with RBAC-protected task execution, live audit streams, and CI-driven delivery.

## Enterprise Documentation Scope

This README documents the current enterprise runtime and delivery model without legacy UI/UX screenshots.

## Enterprise Parameters

### Runtime and Security Parameters

| Parameter    | Scope                                    | Default           | Notes                                                                                                                            |
| ------------ | ---------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`   | `server/server.js` auth behavior         | `development`     | In `production`, token-decoding auth stubs are disabled and requests fall back to anonymous role unless real auth is integrated. |
| `PORT`       | `server/index.js` listener               | `3000`            | Port for enterprise API + Socket.IO service.                                                                                     |
| `ROLE_MODEL` | `src/security/*` + `server/core/rbac.js` | action-based RBAC | Web/app canonical roles are mapped to server-layer roles for task execution.                                                     |

### RBAC Roles and Mappings

Canonical app roles (`src/security/roles.ts`):

| Role       | Typical Access                           |
| ---------- | ---------------------------------------- |
| `admin`    | Full platform/admin access (`admin:all`) |
| `operator` | Workflow + deployment operations         |
| `user`     | Read/chat-level access                   |
| `guest`    | Restricted/public access                 |

Server execution roles (`server/core/rbac.js`):

| Role        | Level | Execution Access             |
| ----------- | ----- | ---------------------------- |
| `admin`     | 3     | Full                         |
| `developer` | 2     | Task execution allowed       |
| `auditor`   | 1     | Read-only                    |
| `agent`     | 0     | No privileged task execution |

Canonical-to-server mapping (`server/server.js`):

- `operator -> developer`
- `user -> auditor`
- `guest -> agent`

## Enterprise Environment Variables

The enterprise deployment runbooks standardize the following variables:

| Variable              | Required                         | Example                                     | Purpose                                                              |
| --------------------- | -------------------------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| `LLAMA_API_KEY`       | Yes (enterprise AI integrations) | `LLAMA_API_KEY=llama_live_0123456789abcdef` | Authenticates enterprise LLM provider integrations.                  |
| `MARKETPLACE_ENABLED` | Yes                              | `MARKETPLACE_ENABLED=true`                  | Enables/disables enterprise marketplace workflows deterministically. |

### Reproducible `.env` Example

```bash
cat > .env.enterprise <<'ENV'
NODE_ENV=production
PORT=3000
LLAMA_API_KEY=llama_live_0123456789abcdef
MARKETPLACE_ENABLED=true
ENV
```

### Reproducible Runtime Check

```bash
set -a
source ./.env.enterprise
set +a

node -e "console.log({
  hasLlamaApiKey: Boolean(process.env.LLAMA_API_KEY),
  marketplaceEnabled: process.env.MARKETPLACE_ENABLED === 'true',
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT || 3000)
})"
```

## CI/CD Workflows

| Workflow                      | File                                                                      | Trigger                                                       | Purpose                                                                           |
| ----------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| CI                            | `.github/workflows/ci.yml`                                                | `push`, `pull_request` on `main`                              | Lint, typecheck, test, and build gates.                                           |
| Advanced Build Matrix         | `.github/workflows/advanced-build.yml`                                    | `push`, `pull_request` on `main/develop`, `workflow_dispatch` | Multi-OS build matrix, optimized build artifact, Docker build test, verification. |
| CodeQL Security Scanning      | `.github/workflows/codeql.yml`                                            | `push`, `pull_request`, scheduled weekly, manual              | Security and quality analysis for JavaScript code.                                |
| Lint                          | `.github/workflows/lint.yml`                                              | GitHub event-driven                                           | Dedicated lint enforcement pipeline.                                              |
| Dependency Review             | `.github/workflows/dependency-review.yml`                                 | Pull requests                                                 | Dependency policy enforcement.                                                    |
| Deploy Pages                  | `.github/workflows/pages-deploy.yml`                                      | `push` on `main`, `workflow_dispatch`                         | Build and deploy GitHub Pages docs/site.                                          |
| Release Management / Schedule | `.github/workflows/release.yml`, `.github/workflows/release-schedule.yml` | Tag `push` (`v*.*.*`), `schedule`, `workflow_dispatch`        | Release automation and cadence controls.                                          |

## Docker Build Matrix

### Advanced build matrix (`.github/workflows/advanced-build.yml`)

| Dimension        | Values                                                           |
| ---------------- | ---------------------------------------------------------------- |
| Operating system | `ubuntu-latest`, `macos-latest`, `windows-latest`                |
| Node.js version  | `20`, `22`                                                       |
| Gates per job    | `npm run typecheck`, `npm run lint`, `npm run build`, `npm test` |

### Docker build test job (`.github/workflows/advanced-build.yml`)

| Setting              | Value                                         |
| -------------------- | --------------------------------------------- |
| Builder              | `docker/setup-buildx-action@v4`               |
| Build action         | `docker/build-push-action@v7`                 |
| Context / Dockerfile | `.` / `./Dockerfile`                          |
| Push / load          | `push: false`, `load: true`                   |
| Tag                  | `cyberai:test`                                |
| Target stage         | `production`                                  |
| Runtime validation   | `docker run --rm cyberai:test node --version` |

## Advanced Build System

CyberAi keeps the enterprise build pipeline deterministic across local development, CI, and containerized release flows.

- **Primary compiler:** `npm run build` (`tsc`)
- **Type gate:** `npm run typecheck`
- **Quality gate:** `npm run lint && npm run test`
- **Optimized pipeline:** `npm run build:advanced`
- **Container pipeline:** `npm run docker:build`
- **Full build reference:** [BUILD.md](BUILD.md)

## Structured Run Guides

### 1) Local Development Guide

```bash
# 1. Install dependencies
npm ci

# 2. Quality gates
npm run lint
npm run typecheck
npm run test

# 3. Start enterprise server
npm run dev:enterprise
```

Optional targeted runs:

```bash
npm run test:unit
npm run test:integration
```

### 2) Container Build Guide

```bash
# Build image
npm run docker:build

# Run container with enterprise variables
docker run --rm -p 3000:3000 \
  --env-file ./.env.enterprise \
  cyberai:latest
```

Compose option:

```bash
npm run docker:up
npm run docker:down
```

### 3) Production Deployment Guide

1. Create production secrets/environment variables (`LLAMA_API_KEY`, `MARKETPLACE_ENABLED`, `NODE_ENV`, `PORT`) in your deployment platform.
2. Push to `main` to trigger CI and deployment workflows.
3. Verify the pipeline status in GitHub Actions for CI, Advanced Build Matrix, and CodeQL.
4. Run a smoke check against the enterprise endpoint:

```bash
curl -sS -X POST http://localhost:3000/api/task \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"health-check","agent":"builder"}'
```

## Repository Structure

```
CyberAi/
├── app/                     # App shell and enterprise views
├── server/                  # Enterprise API + Socket.IO backend
├── src/security/            # Canonical RBAC model and guards
├── contracts/               # Contract definitions
├── tests/                   # Unit + integration tests
├── .github/workflows/       # CI/CD automation
└── docs/                    # Documentation assets and guides
```

## Contributing, Security, License

- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)
- License: [LICENSE](LICENSE)
