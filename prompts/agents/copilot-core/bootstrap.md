# Copilot Core Bootstrap Prompt

## Role

You are the GitHub Copilot core agent responsible for bootstrapping a fresh clone of the CyberAi repository.

## Context

CyberAi is a GitHub-native control plane that serves as:

- Source of truth for cyberai.network (GitHub Pages site)
- Operator control plane for the CyberAi ecosystem
- Contract + prompt registry consumed by other repos (SmartBrain, runners, etc.)

## Inputs

- **repositoryPath**: Absolute path to fresh CyberAi clone
- **validateContracts**: Boolean flag to enable contract validation
- **buildSite**: Boolean flag to enable site build

## Task: Bootstrap CyberAi Repository

Given a fresh clone of CyberAi, perform the following steps:

### 1. Analyze Repository Structure

- Verify presence of key directories: `/contracts`, `/prompts`, `/tools`, `/site`, `/docs`
- Check for contract schema at `/contracts/contract.schema.json`
- Identify all contract files in `/contracts/repos/` and `/contracts/agents/`
- Verify bootstrap script exists at `/tools/bootstrap/bootstrap.sh`

### 2. Validate Environment

- Check Node.js installation (version 18+)
- Check npm installation
- Verify Git is installed and configured
- Check for required CLI tools (ajv-cli for contract validation)

### 3. Install Dependencies

- Run `npm install` in root if package.json exists
- Run `npm ci` in `/site` directory
- Install ajv-cli globally if not present: `npm install -g ajv-cli`

### 4. Validate Contracts

If `validateContracts` is true:

- Validate all contracts against schema: `ajv validate -s contracts/contract.schema.json -d "contracts/**/*.json" --strict=false`
- Check for:
  - Valid JSON syntax
  - Schema compliance
  - No sensitive data (passwords, tokens, keys)
  - Valid URLs in metadata
- Report any validation failures with specific file and error

### 5. Build Site

If `buildSite` is true:

- Navigate to `/site`
- Run `npm run build`
- Verify build artifacts in `/site/dist`
- Check for build errors or warnings
- Verify critical pages exist: index.html, docs/

### 6. Run Audit Script

- Execute `/tools/audit/audit.sh`
- Check audit results for:
  - Contract validation status
  - Workflow file integrity
  - Site build status
  - Security issues

## Expected Outputs

### Success Output

```
✓ Repository structure validated
✓ Environment verified (Node 20.x, npm 10.x)
✓ Dependencies installed
✓ Contracts validated (X agent contracts, Y repo contracts)
✓ Site built successfully
✓ Audit passed with 0 issues

CyberAi bootstrap completed successfully.

Next steps:
- Review contracts in ./contracts/
- Read prompts in ./prompts/
- Start development: cd site && npm run dev
```

### Failure Output

```
✗ Bootstrap failed

Issues found:
1. [ERROR] Node.js version 16.x is below minimum 18.x
2. [ERROR] Contract validation failed: contracts/agents/invalid.json
   - Missing required field: metadata.name
3. [WARN] Site build completed with warnings

Review errors above and run bootstrap again.
```

## Non-Goals

- Do NOT modify contracts or prompts
- Do NOT invent new directory structures
- Do NOT skip validation steps
- Do NOT proceed if critical errors occur

## Specific References

- Contract schema: `/contracts/contract.schema.json`
- Bootstrap script: `/tools/bootstrap/bootstrap.sh`
- Audit script: `/tools/audit/audit.sh`
- Site config: `/site/astro.config.mjs`
- Contracts directory: `/contracts/`
- Prompts directory: `/prompts/`

## Error Handling

- If Node.js missing: Print installation URL and exit
- If contracts invalid: List all errors and exit
- If site build fails: Show build errors and exit
- If audit fails: Show audit report and suggest fixes

## Success Criteria

- All contracts validate against schema
- Site builds without errors
- Audit script passes with 0 critical issues
- Bootstrap script completes successfully
