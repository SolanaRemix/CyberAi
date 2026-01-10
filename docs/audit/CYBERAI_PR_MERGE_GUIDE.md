# CyberAi PR Merge Strategy Guide

## Overview

This document provides a comprehensive strategy for identifying, reviewing, and safely merging CyberAi-related pull requests into the SmartContractAudit repository's main branch.

## Understanding the Context

### The Big Picture

The SolanaRemix organization is developing two complementary repositories:

1. **SmartContractAudit** (this repository)
   - Core smart contract security functions
   - Base auditing scripts and tools
   - GitAntivirus workflow
   - Foundation infrastructure

2. **CyberAi** (separate repository, to be created)
   - AI-powered bot orchestration
   - Multi-bot coordination
   - Advanced workflow automation
   - DAO and governance features

### Key Principle: Separation of Concerns

**SmartContracts stay in SmartContractAudit.**  
**CyberAi Bot orchestrates and coordinates.**

This means:
- Don't merge features that belong in CyberAi repository into SmartContractAudit
- Keep SmartContractAudit focused on core security functions
- Merge only what enhances the foundation infrastructure

## Scanning for CyberAi PRs

### Automated Scan

Use the provided scanner script:

```bash
./scripts/scan-cyberai-prs.sh
```

This will identify:
- Branches with CyberAi/CuberAi references
- Commits mentioning CyberAi
- Files containing CyberAi references
- Open PRs related to CyberAi

### Manual Scan

If you prefer manual scanning:

```bash
# List all branches
git branch -a | grep -iE "cyber|cuber"

# Search commit history
git log --all --oneline --grep="cyber\|cuber" -i

# Find modified files
find . -name "*.md" -o -name "*.sh" | xargs grep -l "CyberAi\|CuberAi"

# Check for PRs (requires gh CLI)
gh pr list --search "cyberai OR cuberai" --limit 50
```

## PR Classification System

Classify each CyberAi-related PR into one of these categories:

### Category 1: Foundation Infrastructure ✅ MERGE
**Description**: Core changes that enhance SmartContractAudit's foundation  
**Examples**:
- Improvements to `scripts/master.sh` (SmartBrain orchestrator)
- Enhancements to GitAntivirus workflow
- Core security script improvements
- Base documentation (TRIO.md, SECURITY.md)

**Action**: Safe to merge into main after review

**Review Checklist**:
- [ ] Enhances core security functionality
- [ ] No external dependencies on CyberAi repository
- [ ] Maintains backward compatibility
- [ ] Includes proper tests/documentation
- [ ] Passes all security checks

### Category 2: Documentation & References ⚠️ REVIEW CAREFULLY
**Description**: Documentation referencing CyberAi architecture  
**Examples**:
- `docs/CYBERAI_ARCHITECTURE.md`
- `docs/cuberai-setup.md`
- Updates to TRIO.md mentioning CyberAi
- Partnership documentation

**Action**: Merge if documentation is accurate and helpful

**Review Checklist**:
- [ ] Documentation is accurate
- [ ] Clearly explains separation of concerns
- [ ] Helps users understand architecture
- [ ] No placeholder/incorrect URLs or contacts
- [ ] Consistent naming (CyberAi vs CuberAi)

### Category 3: Orchestration Scripts 🔍 EVALUATE
**Description**: Scripts that coordinate between repositories  
**Examples**:
- `create_cuberai_and_pr.sh` (repository creation)
- Integration scripts
- Bot coordination helpers

**Action**: Evaluate if belongs in SmartContractAudit or CyberAi

**Review Checklist**:
- [ ] Truly belongs in SmartContractAudit
- [ ] Provides value to this repository
- [ ] Not duplicating functionality
- [ ] Safe to run (DRY_RUN mode available)
- [ ] Well documented

### Category 4: CyberAi-Specific Features ❌ DO NOT MERGE
**Description**: Features that belong in CyberAi repository  
**Examples**:
- Advanced AI bot logic
- DAO token distribution mechanisms
- CyberAi web interfaces
- Multi-bot coordination beyond SmartBrain
- Features requiring external CyberAi services

**Action**: Do NOT merge into SmartContractAudit; belongs in CyberAi repository

**Alternative Action**:
- Close PR with explanation
- Redirect to CyberAi repository
- Provide guidance on proper repository

### Category 5: Experimental/WIP 🚧 HOLD
**Description**: Work-in-progress or experimental features  
**Examples**:
- Proof-of-concept implementations
- Experimental integrations
- Draft features without documentation

**Action**: Request more information, testing, or documentation

**Review Checklist**:
- [ ] Feature is complete enough to merge
- [ ] Has proper documentation
- [ ] Includes tests
- [ ] Author confirms it's ready
- [ ] Clear use case

## Safe Merge Process

### Step 1: Review the PR

```bash
# List all open PRs
gh pr list

# View specific PR details
gh pr view <PR_NUMBER>

# Check PR diff
gh pr diff <PR_NUMBER>

# Check out PR locally
gh pr checkout <PR_NUMBER>
```

### Step 2: Local Testing

```bash
# Create a test environment
git checkout main
git pull origin main
git checkout -b test-pr-<PR_NUMBER>

# Merge the PR branch
git merge <PR_BRANCH>

# Test in dry-run mode
export DRY_RUN=true

# Run health checks
./scripts/master.sh health

# Run audit (if applicable)
./scripts/master.sh audit

# Run any new scripts added by PR
chmod +x <new_script>.sh
./<new_script>.sh

# Review logs
cat SMARTBRAIN.log
cat AUDIT-REPORT.md
```

### Step 3: Security Review

```bash
# Check for secrets
git diff main --name-only | xargs grep -i "password\|secret\|key\|token" || echo "No secrets found"

# Verify no destructive operations without DRY_RUN
git diff main --name-only | xargs grep -n "rm -rf\|git push\|curl.*-X DELETE" || echo "No obvious destructive ops"

# Run GitAntivirus scan
git diff main --name-only | while read f; do
  if [[ -f "$f" ]]; then
    echo "Scanning $f..."
    # Add your security scanning logic
  fi
done
```

### Step 4: Merge Decision Matrix

| Category | Tests Pass | Docs Included | Security OK | Decision |
|----------|------------|---------------|-------------|----------|
| Foundation ✅ | ✅ | ✅ | ✅ | **MERGE** |
| Foundation ✅ | ❌ | ✅ | ✅ | Request fixes |
| Foundation ✅ | ✅ | ❌ | ✅ | Request docs |
| Foundation ✅ | ✅ | ✅ | ❌ | Request security fixes |
| Documentation ⚠️ | N/A | ✅ | ✅ | **MERGE** |
| Orchestration 🔍 | ✅ | ✅ | ✅ | **MERGE** if belongs here |
| CyberAi-Specific ❌ | Any | Any | Any | **REJECT** (wrong repo) |
| Experimental 🚧 | Any | ❌ | Any | **HOLD** (needs docs) |

### Step 5: Merge to Main

If all checks pass:

```bash
# Ensure you're on main
git checkout main
git pull origin main

# Merge the tested branch
git merge --no-ff test-pr-<PR_NUMBER> -m "Merge PR #<PR_NUMBER>: <description>"

# Push to main
git push origin main

# Clean up test branch
git branch -d test-pr-<PR_NUMBER>
```

### Step 6: Post-Merge Validation

```bash
# Verify main branch still works
git checkout main
git pull origin main

# Run full health check
DRY_RUN=true ./scripts/master.sh health

# Check CI/CD workflows
# Monitor GitHub Actions for any failures

# Verify documentation builds correctly
# Check that all links work
```

## Auto-Merge Considerations

### ❌ DO NOT Auto-Merge All CyberAi PRs

**Reasons:**
1. **Risk of breaking changes**: Untested code could break main
2. **Wrong repository**: Some features belong in CyberAi repo
3. **Coupling issues**: Could create unnecessary dependencies
4. **Security risks**: Bypasses security review
5. **Quality concerns**: No validation of code quality

### ⚠️ Limited Auto-Merge Acceptable

You MAY consider auto-merge ONLY for:
- Documentation-only changes (after review)
- Dependabot security updates
- Pre-approved bot updates with passing tests

**Configuration** (GitHub Actions):
```yaml
# .github/workflows/auto-merge-docs.yml
name: Auto-merge Documentation
on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - 'docs/**/*.md'
      - '*.md'

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: github.actor == 'trusted-bot' || contains(github.event.pull_request.labels.*.name, 'auto-merge-docs')
    steps:
      - name: Check PR
        run: |
          # Verify only docs changed
          # Verify tests pass
          # Auto-approve if safe
      
      - name: Merge PR
        if: success()
        run: gh pr merge ${{ github.event.pull_request.number }} --auto --merge
```

## Handling Naming Conflicts (CyberAi vs CuberAi)

### Standard: Use "CyberAi"

When reviewing PRs:
1. **Prefer "CyberAi"** for all new content
2. **Accept "CuberAi"** in existing files if changing causes breakage
3. **Standardize gradually** in dedicated cleanup PRs

### Migration Strategy

```bash
# Create standardization PR
git checkout -b standardize-cyberai-naming

# Update references (carefully!)
find . -type f \( -name "*.md" -o -name "*.sh" \) \
  -not -path "./.git/*" \
  -exec sed -i 's/CuberAi/CyberAi/g' {} \;

# Review changes
git diff

# Test that nothing breaks
./scripts/master.sh health

# Commit if safe
git add .
git commit -m "Standardize naming: CuberAi → CyberAi"
git push origin standardize-cyberai-naming

# Create PR
gh pr create --title "Standardize naming to CyberAi" --body "Consistent naming convention"
```

## Common Scenarios

### Scenario 1: PR adds CyberAi documentation

**Example**: PR adds `docs/CYBERAI_ARCHITECTURE.md`

**Action**:
1. ✅ Review documentation for accuracy
2. ✅ Verify it helps users understand the architecture
3. ✅ Check all links and references work
4. ✅ Merge if helpful and accurate

### Scenario 2: PR adds CyberAi bot logic

**Example**: PR adds `scripts/cyberai-bot-advanced.sh` with complex AI logic

**Action**:
1. ❌ This belongs in CyberAi repository, not SmartContractAudit
2. ❌ Close PR with explanation
3. ✅ Guide author to create PR in CyberAi repository instead

### Scenario 3: PR modifies master.sh for better orchestration

**Example**: PR improves `scripts/master.sh` SmartBrain orchestrator

**Action**:
1. ✅ This is core infrastructure improvement
2. ✅ Test thoroughly in dry-run mode
3. ✅ Review for security issues
4. ✅ Merge if tests pass and no security concerns

### Scenario 4: PR creates CyberAi repository scaffold

**Example**: PR includes `create_cuberai_and_pr.sh` script

**Action**:
1. ⚠️ Evaluate if this script belongs here
2. ✅ If it helps users set up architecture, keep it
3. ✅ Ensure it's safe (DRY_RUN mode available)
4. ✅ Merge with proper documentation

## Workflow Integration

### GitHub Actions Integration

Create a workflow to validate CyberAi PRs:

```yaml
# .github/workflows/validate-cyberai-pr.yml
name: Validate CyberAi PR

on:
  pull_request:
    types: [opened, synchronize, labeled]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Check PR Category
        id: category
        run: |
          # Analyze PR files and categorize
          ./scripts/scan-cyberai-prs.sh
          
          # Determine category based on files changed
          # Set output for next steps
      
      - name: Run Tests
        if: steps.category.outputs.category == 'foundation'
        run: |
          chmod +x scripts/*.sh
          DRY_RUN=true ./scripts/master.sh health
      
      - name: Security Scan
        run: |
          # Run security checks
          git diff origin/main --name-only | xargs grep -i "password\|secret\|key" || true
      
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Validation complete. Category: ${{ steps.category.outputs.category }}'
            })
```

## Best Practices Summary

### ✅ DO:
- Review each PR individually
- Test in dry-run mode before merging
- Classify PRs by category
- Maintain separation of concerns
- Use the scanning script (`./scripts/scan-cyberai-prs.sh`)
- Document merge decisions
- Keep security as top priority

### ❌ DON'T:
- Auto-merge all CyberAi PRs blindly
- Merge CyberAi-specific features into SmartContractAudit
- Skip security review
- Merge without testing
- Create tight coupling between repositories
- Ignore the classification system

## Troubleshooting

### Issue: Too many CyberAi PRs to review

**Solution**:
1. Use the scanner script to categorize
2. Prioritize foundation infrastructure PRs
3. Batch-review documentation PRs
4. Redirect CyberAi-specific PRs to correct repository

### Issue: PR has both foundation and CyberAi-specific changes

**Solution**:
1. Ask author to split PR
2. Merge foundation parts first
3. Move CyberAi-specific parts to separate PR in CyberAi repository

### Issue: Uncertainty about which repository PR belongs to

**Solution**:
1. Ask: "Does this enhance core smart contract security functions?"
   - Yes → SmartContractAudit
   - No → Probably CyberAi
2. Ask: "Could CyberAi Bot use this as a dependency?"
   - Yes → SmartContractAudit
   - No → Probably CyberAi
3. Ask: "Is this orchestration or foundation?"
   - Foundation → SmartContractAudit
   - Orchestration → CyberAi

## Resources

- **Architecture Guide**: docs/CYBERAI_ARCHITECTURE.md
- **Setup Documentation**: docs/cuberai-setup.md
- **Scanner Script**: scripts/scan-cyberai-prs.sh
- **TRIO Framework**: TRIO.md
- **Security Policy**: SECURITY.md
- **Contributing Guide**: CONTRIBUTING.md

## Conclusion

The key to successful CyberAi PR management is:

1. **Understand the separation**: SmartContract functions vs CyberAi orchestration
2. **Classify before merging**: Use the category system
3. **Test thoroughly**: Always use dry-run mode
4. **Maintain focus**: Keep SmartContractAudit focused on its core mission
5. **Be selective**: Not every CyberAi PR belongs in SmartContractAudit

Remember: **Clone SmartContractAudit first, review carefully, merge selectively.**

---

**Last Updated**: 2026-01-02  
**Version**: 1.0.0  
**Maintainer**: SolanaRemix Team
