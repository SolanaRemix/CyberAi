# **CyberAi.network**  

[![CI](https://github.com/SolanaRemix/CyberAi/workflows/CI/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/ci.yml)  
[![CodeQL](https://github.com/SolanaRemix/CyberAi/workflows/CodeQL/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/codeql.yml)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)  

**Enterprise AI Platform for Secure Workflow Orchestration**  

CyberAi is your enterprise-grade orchestration control plane for securely managing task execution, workflows, and contracts. Equipped with role-based access controls (RBAC), live audit streams, and CI-driven delivery pipelines, CyberAi is built for scalability and security.  

---

## **Enterprise Overview**

This repository serves as the control center for CyberAi's secure runtime and delivery model. It avoids legacy UI complexity and focuses on enterprise-ready implementation.  

---

## **Key Features**  

- **RBAC Security**: Seamlessly map user roles to secure server execution parameters.  
- **AI Integrations**: Provision enterprise-level AI integrations via API keys.  
- **Advanced CI/CD**: Optimized workflows for type-checking, linting, testing, and Dockerized deployment.  
- **Comprehensive Build Pipeline**: Deterministic builds across development, CI, and production.  
- **Containerized Deployment**: Scale effortlessly with Docker and Kubernetes.  

---

## **Enterprise Parameters**

### **Runtime and Security**
| Parameter     | Scope                                    | Default           | Notes                                                                 |
|---------------|------------------------------------------|-------------------|-----------------------------------------------------------------------|
| `NODE_ENV`    | `server/server.js` auth behavior         | `development`     | Production disables token-decoding stubs and ensures stricter auth.  |
| `PORT`        | `server/index.js` listener               | `3000`            | Port for API and WebSocket services.                                 |
| `ROLE_MODEL`  | `src/security/*` + `server/core/rbac.js` | action-based RBAC | Maps web/app roles to server-layer roles for secure execution.       |

### **Role Mapping**

| Canonical Role | Typical Access Level       | Server Execution Role | Execution Access    |
|----------------|-----------------------------|------------------------|---------------------|
| `admin`        | Full platform access        | `admin`                | Full access         |
| `operator`     | Workflow and deployment     | `developer`            | Task execution      |
| `user`         | Read/chat-level operations  | `auditor`              | Read-only           |
| `guest`        | Minimal access              | `agent`                | No privileged tasks |

---

## **Enterprise Environment Setup**

Setup your enterprise deployment with these standardized environment variables:  

| Variable              | Required                         | Example                                     | Purpose                                  |
|-----------------------|-----------------------------------|---------------------------------------------|------------------------------------------|
| `LLAMA_API_KEY`       | Yes (for AI integrations)        | `llama_live_0123456789abcdef`               | Authenticates enterprise AI providers.   |
| `MARKETPLACE_ENABLED` | Yes                              | `true`                                      | Toggles marketplace workflows.           |

### **Sample `.env` Override**
```env
NODE_ENV=production
PORT=3000
LLAMA_API_KEY=llama_live_0123456789abcdef
MARKETPLACE_ENABLED=true
```

### **Runtime Verification Script**
```bash
node -e "console.log({
  hasAIKey: Boolean(process.env.LLAMA_API_KEY),
  marketplaceEnabled: process.env.MARKETPLACE_ENABLED === 'true',
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT
})"
```

---

## **CI/CD Workflows**  

CyberAi's delivery model leverages CI/CD pipelines for secure, repeatable deployments.  

| Workflow Name             | Location                              | Trigger                                           | Purpose                                     |
|---------------------------|---------------------------------------|-------------------------------------------------|-------------------------------------------|
| **CI Pipeline**            | `.github/workflows/ci.yml`            | `push`, PR to `main`                             | Lint, type-check, test, and build gates.   |
| **Advanced Build Matrix**  | `.github/workflows/advanced-build.yml`| Matrix builds for multiple platforms and configs.| Multi-OS build, Docker test/verification.  |
| **CodeQL Security**        | `.github/workflows/codeql.yml`        | Weekly, PRs                                      | Static analysis for vulnerabilities.       |

Find more in the [**BUILD.md**](BUILD.md).  

---

## **Structured Development Guides**

### **1. Local Development**
```bash
# Install dependencies
npm ci

# Run quality gates
npm run lint 
npm run typecheck
npm run test

# Launch local environment 
npm run dev:enterprise
```

### **2. Containerization**
```bash
# Build and run Docker
npm run docker:build
docker run --rm -p 3000:3000 --env-file ./.env.enterprise cyberai:latest
```

### **3. Production Deployment**
1. Push changes to the `main` branch to trigger workflows.  
2. Create `.env` files with LLM/marketplace configurations.  
3. Smoke check APIs:
```bash
curl -X POST http://your-app/api/task -d '{"prompt":"health-check","agent":"admin"}'
```

---

## **Repository Structure**

```plaintext
CyberAi/
├── app/                  # Frontend interface and views
├── server/               # API backend for secure execution
├── src/security/         # Core RBAC controls
├── tests/                # Unit/integration tests
├── .github/workflows/    # CI/CD definitions
└── docs/                 # Documentation assets
```

---

## **Contributing, License, Security**  

- **Contributing**: [See CONTRIBUTING.md](CONTRIBUTING.md)  
- **Security Policy**: [View SECURITY.md](SECURITY.md)  
- **MIT License**: [View LICENSE](LICENSE)  

---