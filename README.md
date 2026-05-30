# **🌐 CyberAi.network**

[![✅ CI](https://github.com/SolanaRemix/CyberAi/workflows/CI/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/ci.yml)  
[![🔒 CodeQL](https://github.com/SolanaRemix/CyberAi/workflows/CodeQL/badge.svg)](https://github.com/SolanaRemix/CyberAi/actions/workflows/codeql.yml)  
[![🛡️ License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![⬆️ Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)  

**🚀 Enterprise AI Platform for Secure Workflow Orchestration**  

CyberAi provides an enterprise-ready orchestration control plane for managing contracts, workflows, and task execution. With powerful role-based access controls (RBAC), live audit streams, and optimized CI pipelines, CyberAi is built for scalability and security.  

---

## **🔑 Key Features**

- **🔐 RBAC Security**: Map user roles to secure task execution layers.  
- **🤖 AI Integrations**: Provision enterprise-grade AI seamlessly.  
- **🛠️ Advanced CI/CD**: Streamlined linting, testing, and builds.  
- **📦 Containerized Deployments**: Robust Docker and Kubernetes integration.  

---

## **🔎 Enterprise Overview**

This repository acts as the control center for secure runtime and delivery. It avoids legacy UI while prioritizing enterprise-ready implementations for modern workflows.

---

## **⚙️ Runtime Parameters**

| **Parameter**  | **Scope**                                | **Default**       | **Description**                                                                 |
|----------------|------------------------------------------|-------------------|---------------------------------------------------------------------------------|
| `NODE_ENV`     | Defines runtime mode in `server.js`      | `development`     | Production disables token stubs and enforces stricter auth.                     |
| `PORT`         | API and WebSocket listener (`index.js`)  | `3000`            | Defines the port exposed by the API service.                                    |
| `ROLE_MODEL`   | Roles within `src/security` + `rbac.js`  | Action-based RBAC | Maps UI roles to backend execution roles for orchestrated tasks.                |

---

## **🔐 Role Mapping**

### User RBAC Mapping  

| **Canonical Role** | **Access**                  | **Backend Role**  | **Permissions**            |
|---------------------|-----------------------------|--------------------|----------------------------|
| `admin`             | Full platform access        | `admin`            | 🔓 Unrestricted task access |
| `operator`          | Workflows and deployments   | `developer`        | 🛠️ Execute workflows         |
| `user`              | Read-only access            | `auditor`          | 👀 View-only permissions     |
| `guest`             | Minimal or public access    | `agent`            | ⛔ Restricted tasks          |

---

## **📋 Environment Variables**

| **Variable**         | **Required**         | **Example**                         | **Purpose**                                  |
|-----------------------|---------------------|-------------------------------------|----------------------------------------------|
| `LLAMA_API_KEY`       | Yes (AI Enabled)    | `llama_live_abcdef123456`           | Authenticate with enterprise AI providers.   |
| `MARKETPLACE_ENABLED` | Yes                 | `true`                              | Enables enterprise marketplace workflows.     |

---

## **🧩 Reproducible Settings**

### **Example `.env` File**
```env
NODE_ENV=production
PORT=3000
LLAMA_API_KEY=llama_live_abcdef123456
MARKETPLACE_ENABLED=true
```

### **Runtime Script Verification**
```bash
node -e "console.log({
  nodeEnv: process.env.NODE_ENV,
  apiKeyPresent: !!process.env.LLAMA_API_KEY,
  port: process.env.PORT
})"
```

---

## **⚡ CI/CD Workflows**

| **Workflow Name**         | **File Location**                     | **Trigger**                             | **Purpose**                                     |
|----------------------------|---------------------------------------|-----------------------------------------|-------------------------------------------------|
| ✅ **Continuous Integration** | `.github/workflows/ci.yml`            | Changes on `main`                       | Lint, typecheck, and test automation.          |
| 🛠️ **Advanced Build Matrix**   | `.github/workflows/advanced-build.yml`| Dispatch / main changes                 | Matrix builds for multiple platforms/versions. |
| ✅ **CodeQL Security**         | `.github/workflows/codeql.yml`        | Weekly / Manual                         | Detect security vulnerabilities automatically. |

---

## **🏗️ Advanced Build System**

CyberAi keeps its enterprise build system deterministic across development, CI, and production containers.  

- **🛠️ Primary Compiler**: `npm run build` (TypeScript `tsc`)  
- **✅ Type Gate**: `npm run typecheck`  
- **🔍 Quality Gate**: `npm run lint && npm run test`  
- **⚡ Optimized Pipeline**: `npm run build:advanced`  
- **🚢 Container Build**: `npm run docker:build`  
- **📚 Full Build Ref**: [BUILD.md](BUILD.md)  

---

## **🖥️ Development Guide**

### **1️⃣ Local Development**
```bash
# Step 1: Install dependencies
npm ci

# Step 2: Pass quality gates
npm run lint 
npm run typecheck
npm run test

# Step 3: Launch in dev mode
npm run dev:enterprise
```

### **2️⃣ Containerization**
```bash
# Build the Docker image
npm run docker:build

# Run the image locally
docker run -p 3000:3000 --env-file ./.env.enterprise cyberai:latest
```

### **3️⃣ Production Deployment**
1. Ensure `.env` is properly configured (see **Example .env File**).  
2. Push changes to `main` to trigger workflows.  
3. Verify deployment via CI/CD pipeline logs.  
4. Perform post-deployment smoke tests:  

   ```bash
   curl -X POST http://host/api/task -H 'Content-Type: application/json' \
   -d '{"prompt": "health-check", "agent": "test-runner"}'
   ```

---

## **📂 Repo Structure**

```plaintext
CyberAi/
├── app/                  # Frontend layer (UI Views)
├── src/                  # Core business logic
├── server/               # Secure API backend + orchestrator
├── contracts/            # Smart Contract definitions
├── tests/                # Unit/system-level tests
├── .github/workflows/    # Action definitions
├── docs/                 # Enterprise documentation
```

---

## **🔗 Contributing, Security, Licensing**

- **🤝 Contributions**: See [CONTRIBUTING.md](CONTRIBUTING.md)  
- **🛡️ Security Policy**: See [SECURITY.md](SECURITY.md)  
- **⚖️ Licensed Under MIT**: See [LICENSE](LICENSE)