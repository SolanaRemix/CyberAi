#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# ENV-HEAL.SH — CyberAi Environment Auto-Healing Script
# Automatically detects and fixes common environment issues
# ============================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() { printf "\n[env-heal.sh] %s\n" "$*" >&2; }
error() { printf "\n[env-heal.sh][ERROR] %s\n" "$*" >&2; }
warn() { printf "\n[env-heal.sh][WARN] %s\n" "$*" >&2; }
success() { printf "\n[env-heal.sh][SUCCESS] %s\n" "$*" >&2; }

ISSUES_FIXED=0

log "Starting CyberAi environment auto-healing..."

# ============================================================
# Step 1: Check and heal Node.js version
# ============================================================
log "Step 1: Validating Node.js environment..."

if ! command -v node &> /dev/null; then
  error "Node.js is not installed. Please install Node.js 20+ from https://nodejs.org/"
  exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [[ "$NODE_VERSION" -lt 20 ]]; then
  warn "Node.js version is $NODE_VERSION, but 20+ is recommended"
  warn "Consider upgrading Node.js for better compatibility"
else
  log "✓ Node.js $(node --version) is compatible"
fi

# ============================================================
# Step 2: Check and heal npm dependencies
# ============================================================
log "Step 2: Checking npm dependencies..."

# Check if package-lock.json is out of sync
if [[ -f "package.json" ]] && [[ -f "package-lock.json" ]]; then
  if ! npm ls &> /dev/null; then
    warn "Dependencies are out of sync, reinstalling..."
    rm -f package-lock.json
    npm install
    ISSUES_FIXED=$((ISSUES_FIXED + 1))
    success "Root dependencies healed"
  else
    log "✓ Root dependencies are healthy"
  fi
fi

# Heal site dependencies
if [[ -d "site" ]] && [[ -f "site/package.json" ]]; then
  cd site
  if ! npm ls &> /dev/null; then
    warn "Site dependencies are out of sync, reinstalling..."
    rm -f package-lock.json
    npm install
    ISSUES_FIXED=$((ISSUES_FIXED + 1))
    success "Site dependencies healed"
  else
    log "✓ Site dependencies are healthy"
  fi
  cd "$ROOT_DIR"
fi

# Heal scripts dependencies
if [[ -d "scripts" ]] && [[ -f "scripts/package.json" ]]; then
  cd scripts
  if ! npm ls &> /dev/null; then
    warn "Scripts dependencies are out of sync, reinstalling..."
    rm -f package-lock.json
    npm install
    ISSUES_FIXED=$((ISSUES_FIXED + 1))
    success "Scripts dependencies healed"
  else
    log "✓ Scripts dependencies are healthy"
  fi
  cd "$ROOT_DIR"
fi

# ============================================================
# Step 3: Check and heal build artifacts
# ============================================================
log "Step 3: Validating build artifacts..."

# Check if TypeScript build is needed
if [[ -f "tsconfig.json" ]] && [[ -f "package.json" ]]; then
  if ! tsc --noEmit &> /dev/null; then
    warn "TypeScript compilation has errors, attempting to heal..."
    # Clean and rebuild
    rm -rf dist
    npm run build || warn "Build issues detected - manual intervention may be needed"
    ISSUES_FIXED=$((ISSUES_FIXED + 1))
  else
    log "✓ TypeScript compilation is healthy"
  fi
fi

# Check site build
if [[ -d "site" ]] && [[ -f "site/package.json" ]]; then
  if [[ ! -d "site/dist" ]]; then
    warn "Site build artifacts missing, rebuilding..."
    cd site
    npm run build
    cd "$ROOT_DIR"
    ISSUES_FIXED=$((ISSUES_FIXED + 1))
    success "Site build artifacts healed"
  else
    log "✓ Site build artifacts exist"
  fi
fi

# ============================================================
# Step 4: Check and heal Git configuration
# ============================================================
log "Step 4: Validating Git configuration..."

if [[ -d ".git" ]]; then
  # Check for uncommitted changes that might cause issues
  if git diff --quiet && git diff --cached --quiet; then
    log "✓ Working tree is clean"
  else
    warn "Uncommitted changes detected in working tree"
  fi
  
  # Check if we're in a valid branch
  if git rev-parse --abbrev-ref HEAD &> /dev/null; then
    log "✓ Git repository is healthy"
  else
    warn "Git repository may have issues"
  fi
fi

# ============================================================
# Step 5: Check and heal permissions
# ============================================================
log "Step 5: Checking file permissions..."

# Ensure scripts are executable
SCRIPTS=("tools/bootstrap/bootstrap.sh" "tools/audit/audit.sh" "tools/config-sync.sh" "tools/env-heal.sh")
for script in "${SCRIPTS[@]}"; do
  if [[ -f "$script" ]]; then
    if [[ ! -x "$script" ]]; then
      warn "Making $script executable..."
      chmod +x "$script"
      ISSUES_FIXED=$((ISSUES_FIXED + 1))
      success "$script permissions healed"
    else
      log "✓ $script is executable"
    fi
  fi
done

# ============================================================
# Step 6: Validate contracts
# ============================================================
log "Step 6: Validating contracts..."

if [[ -f "contracts/contract.schema.json" ]]; then
  log "✓ Contract schema exists"
  
  # Quick validation check
  if command -v ajv &> /dev/null; then
    if ls contracts/agents/*.json 1> /dev/null 2>&1; then
      if ! ajv validate -s contracts/contract.schema.json -d "contracts/agents/*.json" --strict=false &> /dev/null; then
        warn "Some agent contracts may have validation issues"
      else
        log "✓ Agent contracts are valid"
      fi
    fi
  fi
else
  warn "Contract schema not found"
fi

# ============================================================
# Summary
# ============================================================
log ""
log "=========================================="
if [[ $ISSUES_FIXED -eq 0 ]]; then
  log "✓ Environment is healthy - no issues found"
else
  success "Environment healed - fixed $ISSUES_FIXED issue(s)"
fi
log "=========================================="
log ""

exit 0
