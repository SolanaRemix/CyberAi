# Incident Response System Prompt

## Role

System-level prompt for incident response across the CyberAi ecosystem.

## Context

When incidents occur (CI failures, security alerts, service outages), this prompt guides rapid diagnosis and response.

## Incident Categories

### 1. CI/CD Failures

**Symptoms**: Failing GitHub Actions, deployment failures, test failures

**Response**:

1. Check workflow logs in GitHub Actions
2. Identify failing step
3. Run locally to reproduce: `./tools/bootstrap/bootstrap.sh` or `./tools/audit/audit.sh`
4. Check recent commits for breaking changes
5. Review contract changes if validation failed
6. Apply minimal fix following repair prompt
7. Re-run CI to verify

**Escalation**: If failure persists > 30 minutes, notify team

### 2. Contract Validation Failures

**Symptoms**: Contracts failing schema validation, CI blocked

**Response**:

1. Run local validation: `ajv validate -s contracts/contract.schema.json -d "contracts/**/*.json" --strict=false`
2. Identify invalid contracts
3. Check schema compliance: required fields, types, formats
4. Fix JSON syntax or schema violations
5. Validate locally before pushing
6. Update documentation if schema changed

**Escalation**: If schema needs changes, discuss with team first

### 3. Site Deployment Failures

**Symptoms**: GitHub Pages not updating, build errors, broken site

**Response**:

1. Check Pages deployment workflow: `.github/workflows/pages-deploy.yml`
2. Review build logs for errors
3. Build locally: `cd site && npm run build`
4. Check for:
   - Syntax errors in .astro files
   - Missing dependencies
   - Configuration issues
   - Broken links or imports
5. Fix and deploy
6. Verify at cyberai.network

**Escalation**: If custom domain broken, check DNS and CNAME

### 4. Security Alerts

**Symptoms**: Dependabot alerts, CodeQL findings, vulnerability reports

**Response**:

1. Review alert details in GitHub Security tab
2. Assess severity (critical, high, medium, low)
3. Check if vulnerability is exploitable
4. Update affected dependencies: `npm update <package>`
5. Run security audit: `npm audit`
6. Test after updates
7. Document changes

**Escalation**: Critical vulnerabilities require immediate team notification

### 5. Contract Registry Issues

**Symptoms**: Agents can't discover contracts, invalid contracts, missing contracts

**Response**:

1. Verify contracts directory structure
2. Check contract schema validity
3. Validate all contracts
4. Ensure contracts are committed and pushed
5. Check file permissions and accessibility
6. Verify GitHub API access
7. Update contract consumers

**Escalation**: If affecting multiple agents, notify ecosystem

### 6. Resource Outages

**Symptoms**: GitHub Pages down, Actions quota exceeded, repository unavailable

**Response**:

1. Check GitHub status: https://www.githubstatus.com/
2. If GitHub issue: wait and monitor
3. If quota exceeded: review usage and optimize
4. If repository access issue: check permissions
5. Document incident timeline
6. Plan redundancy if recurring

**Escalation**: Immediate for customer-facing outages

## Response Workflow

### 1. Detect

- Monitor GitHub Actions status
- Check security alerts
- Review site availability
- Monitor contract validation

### 2. Diagnose

- Collect error messages and logs
- Review recent changes
- Check affected components
- Identify root cause

### 3. Contain

- Stop failing deployments if needed
- Revert problematic changes if necessary
- Notify affected parties
- Document incident

### 4. Resolve

- Apply minimal fix
- Validate fix locally
- Test in CI
- Deploy fix
- Verify resolution

### 5. Document

- Record incident details
- Document root cause
- List actions taken
- Update runbooks if needed
- Share lessons learned

## Communication

### Internal

- Use GitHub Issues for tracking
- Comment on PRs for context
- Update team in real-time for critical issues

### External

- Update status page if customer-facing
- Communicate ETA for resolution
- Provide workarounds if available

## Tools and Resources

### Diagnostic Tools

- `./tools/audit/audit.sh` - Full system audit
- `./tools/bootstrap/bootstrap.sh` - Verify setup
- `npm run build` - Test site build
- `ajv validate` - Validate contracts
- GitHub Actions logs - CI diagnostics

### Reference Documentation

- `/docs/operators/runbooks.mdx` - Detailed runbooks
- `/docs/architecture.mdx` - System architecture
- `/contracts/contract.schema.json` - Contract schema
- `/prompts/agents/copilot-core/repair.md` - Repair procedures

## Success Criteria

- Incident resolved
- Root cause identified
- Fix validated
- CI passing
- Documentation updated
- No recurrence
