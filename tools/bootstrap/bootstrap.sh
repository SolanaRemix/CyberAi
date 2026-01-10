#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# BOOTSTRAP.SH — CyberAi Bootstrap Script
# Verifies environment, installs dependencies, builds site
# ============================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

log() { printf "\n[bootstrap.sh] %s\n" "$*" >&2; }
error() { printf "\n[bootstrap.sh][ERROR] %s\n" "$*" >&2; exit 1; }
warn() { printf "\n[bootstrap.sh][WARN] %s\n" "$*" >&2; }

log "Starting CyberAi bootstrap process..."

# ============================================================
# Step 1: Verify Node.js installation
# ============================================================
log "Step 1: Verifying Node.js installation..."

if ! command -v node &> /dev/null; then
  error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [[ "$NODE_VERSION" -lt 18 ]]; then
  error "Node.js version must be 18 or higher. Current version: $(node --version)"
fi

log "✓ Node.js $(node --version) detected"

# ============================================================
# Step 2: Verify npm installation
# ============================================================
log "Step 2: Verifying npm installation..."

if ! command -v npm &> /dev/null; then
  error "npm is not installed. Please install npm."
fi

log "✓ npm $(npm --version) detected"

# ============================================================
# Step 3: Install dependencies
# ============================================================
log "Step 3: Installing dependencies..."

if [[ -f "package.json" ]]; then
  npm install
  log "✓ Root dependencies installed"
else
  warn "No package.json found in root"
fi

if [[ -d "site" ]] && [[ -f "site/package.json" ]]; then
  cd site
  npm install
  cd "$ROOT_DIR"
  log "✓ Site dependencies installed"
else
  warn "No site/package.json found"
fi

# ============================================================
# Step 4: Validate contracts
# ============================================================
log "Step 4: Validating contracts..."

if [[ -d "contracts" ]]; then
  # Install ajv-cli if not available
  if ! command -v ajv &> /dev/null; then
    log "Installing ajv-cli for contract validation..."
    npm install -g ajv-cli
  fi
  
  # Validate contracts if schema exists
  if [[ -f "contracts/contract.schema.json" ]]; then
    if ls contracts/agents/*.json 1> /dev/null 2>&1; then
      if ajv validate -s contracts/contract.schema.json -d "contracts/agents/*.json" --strict=false 2>&1 | grep -q "valid"; then
        log "✓ Agent contracts validated"
      else
        warn "Some agent contracts failed validation"
      fi
    fi
    
    if ls contracts/repositories/*.json 1> /dev/null 2>&1; then
      if ajv validate -s contracts/contract.schema.json -d "contracts/repositories/*.json" --strict=false 2>&1 | grep -q "valid"; then
        log "✓ Repository contracts validated"
      else
        warn "Some repository contracts failed validation"
      fi
    fi
    
    log "✓ Contracts validated"
  else
    warn "No contract schema found at contracts/contract.schema.json"
  fi
else
  warn "No contracts directory found"
fi

# ============================================================
# Step 5: Build site
# ============================================================
log "Step 5: Building site..."

if [[ -d "site" ]] && [[ -f "site/package.json" ]]; then
  cd site
  
  # Check if build script exists
  if npm run | grep -q "build"; then
    npm run build
    log "✓ Site built successfully"
  else
    warn "No build script found in site/package.json"
  fi
  
  cd "$ROOT_DIR"
else
  warn "No site directory with package.json found, skipping site build"
fi

# ============================================================
# Step 6: Verify structure
# ============================================================
log "Step 6: Verifying repository structure..."

EXPECTED_DIRS=("contracts" "prompts" "tools" "docs")
for dir in "${EXPECTED_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    log "✓ $dir/ exists"
  else
    warn "$dir/ directory not found"
  fi
done

log ""
log "=========================================="
log "Bootstrap completed successfully!"
log "=========================================="
log ""
log "Next steps:"
log "  - Review contracts in ./contracts/"
log "  - Read prompts in ./prompts/"
log "  - Run audit with: ./tools/audit/audit.sh"
if [[ -d "site" ]]; then
  log "  - Start development server: cd site && npm run dev"
fi
log ""

exit 0
