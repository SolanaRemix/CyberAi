#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# AUDIT.SH — CyberAi Audit Script
# Validates contracts, workflows, and site integrity
# ============================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

# Default to dry-run mode
DRY_RUN="${DRY_RUN:-true}"

log() { printf "\n[audit.sh] %s\n" "$*" >&2; }
warn() { printf "\n[audit.sh][WARN] %s\n" "$*" >&2; }
error() { printf "\n[audit.sh][ERROR] %s\n" "$*" >&2; }

ISSUES_FOUND=0

log "Starting CyberAi audit process (DRY_RUN=${DRY_RUN})..."

# ============================================================
# Step 1: Validate contract schema
# ============================================================
log "Step 1: Validating contracts against schema..."

if [[ ! -f "contracts/contract.schema.json" ]]; then
  error "Contract schema not found at contracts/contract.schema.json"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
  log "✓ Contract schema exists"
  
  # Install ajv-cli if needed
  if ! command -v ajv &> /dev/null; then
    log "Installing ajv-cli..."
    npm install -g ajv-cli
  fi
  
  # Validate agent contracts
  if ls contracts/agents/*.json 1> /dev/null 2>&1; then
    log "Validating agent contracts..."
    VALIDATION_OUTPUT=$(ajv validate -s contracts/contract.schema.json -d "contracts/agents/*.json" --strict=false 2>&1)
    if echo "$VALIDATION_OUTPUT" | grep -q "valid" && ! echo "$VALIDATION_OUTPUT" | grep -q "invalid"; then
      log "✓ All agent contracts are valid"
    else
      warn "Some agent contracts failed validation"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  else
    warn "No agent contracts found"
  fi
  
  # Validate repository contracts
  if ls contracts/repositories/*.json 1> /dev/null 2>&1; then
    log "Validating repository contracts..."
    VALIDATION_OUTPUT=$(ajv validate -s contracts/contract.schema.json -d "contracts/repositories/*.json" --strict=false 2>&1)
    if echo "$VALIDATION_OUTPUT" | grep -q "valid" && ! echo "$VALIDATION_OUTPUT" | grep -q "invalid"; then
      log "✓ All repository contracts are valid"
    else
      warn "Some repository contracts failed validation"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  else
    warn "No repository contracts found"
  fi
  
  # Validate runner contracts
  if ls contracts/runners/*.json 1> /dev/null 2>&1; then
    log "Validating runner contracts..."
    VALIDATION_OUTPUT=$(ajv validate -s contracts/contract.schema.json -d "contracts/runners/*.json" --strict=false 2>&1)
    if echo "$VALIDATION_OUTPUT" | grep -q "valid" && ! echo "$VALIDATION_OUTPUT" | grep -q "invalid"; then
      log "✓ All runner contracts are valid"
    else
      warn "Some runner contracts failed validation"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  else
    log "No runner contracts found (optional)"
  fi
fi

# ============================================================
# Step 2: Validate workflows
# ============================================================
log "Step 2: Validating GitHub Actions workflows..."

WORKFLOW_DIR=".github/workflows"
if [[ ! -d "$WORKFLOW_DIR" ]]; then
  error "Workflows directory not found"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
  REQUIRED_WORKFLOWS=("ci.yml" "pages-deploy.yml" "contracts-validate.yml")
  for workflow in "${REQUIRED_WORKFLOWS[@]}"; do
    if [[ -f "$WORKFLOW_DIR/$workflow" ]]; then
      log "✓ $workflow exists"
    else
      warn "$workflow not found"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  done
fi

# ============================================================
# Step 3: Validate repository structure
# ============================================================
log "Step 3: Validating repository structure..."

REQUIRED_DIRS=("contracts" "prompts" "tools" "docs")
for dir in "${REQUIRED_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    log "✓ $dir/ exists"
  else
    warn "$dir/ directory not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
done

REQUIRED_FILES=("CNAME" "README.md" "contracts/contract.schema.json")
for file in "${REQUIRED_FILES[@]}"; do
  if [[ -f "$file" ]]; then
    log "✓ $file exists"
  else
    warn "$file not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
done

# ============================================================
# Step 4: Check for common vulnerabilities
# ============================================================
log "Step 4: Checking for common security issues..."

# Check for exposed secrets in contracts
if grep -r "password\|secret\|api_key\|token" contracts/ --include="*.json" 2>/dev/null; then
  warn "Potential secrets found in contracts (please review)"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
  log "✓ No obvious secrets in contracts"
fi

# ============================================================
# Step 5: Validate site integrity
# ============================================================
log "Step 5: Validating site..."

if [[ -d "site" ]]; then
  if [[ -f "site/package.json" ]]; then
    log "✓ site/package.json exists"
    
    # Check if build artifacts exist
    if [[ -d "site/dist" ]] || [[ -d "site/.next" ]] || [[ -d "site/build" ]]; then
      log "✓ Site build artifacts found"
    else
      warn "No site build artifacts found - run npm run build"
    fi
  else
    warn "site/package.json not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
else
  warn "site/ directory not found"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# ============================================================
# Summary
# ============================================================
log ""
log "=========================================="
if [[ $ISSUES_FOUND -eq 0 ]]; then
  log "✓ Audit completed successfully - no issues found"
  log "=========================================="
  exit 0
else
  warn "Audit completed with $ISSUES_FOUND issue(s) found"
  log "=========================================="
  
  if [[ "$DRY_RUN" == "true" ]]; then
    log "DRY_RUN mode: No changes were made"
    log "Review warnings above and fix issues"
  fi
  
  exit 1
fi
