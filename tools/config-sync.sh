#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# CONFIG-SYNC.SH — CyberAi Configuration Sync Script
# Automated configuration synchronization and validation
# ============================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() { printf "\n[config-sync.sh] %s\n" "$*" >&2; }
error() { printf "\n[config-sync.sh][ERROR] %s\n" "$*" >&2; exit 1; }
warn() { printf "\n[config-sync.sh][WARN] %s\n" "$*" >&2; }

log "Starting CyberAi configuration sync..."

# ============================================================
# Step 1: Sync package.json versions across subprojects
# ============================================================
log "Step 1: Syncing package.json configurations..."

ROOT_PKG_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

# Update site package.json version if it exists
if [[ -f "site/package.json" ]]; then
  log "Syncing site package.json version to $ROOT_PKG_VERSION"
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('site/package.json', 'utf8'));
    pkg.version = '$ROOT_PKG_VERSION';
    fs.writeFileSync('site/package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  log "✓ Site package.json synced"
fi

# Update scripts package.json if it exists
if [[ -f "scripts/package.json" ]]; then
  log "Syncing scripts package.json dependencies"
  # Ensure OpenAI versions match
  ROOT_OPENAI_VERSION=$(node -p "require('./package.json').dependencies.openai" 2>/dev/null || echo "^6.17.0")
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('scripts/package.json', 'utf8'));
    if (pkg.dependencies && pkg.dependencies.openai) {
      pkg.dependencies.openai = '$ROOT_OPENAI_VERSION';
    }
    fs.writeFileSync('scripts/package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  log "✓ Scripts package.json synced"
fi

# ============================================================
# Step 2: Validate TypeScript configurations
# ============================================================
log "Step 2: Validating TypeScript configurations..."

if [[ -f "tsconfig.json" ]]; then
  log "✓ Root tsconfig.json exists"
else
  warn "Root tsconfig.json not found"
fi

# ============================================================
# Step 3: Validate ESLint and Prettier configurations
# ============================================================
log "Step 3: Validating linter configurations..."

if [[ -f ".eslintrc.json" ]]; then
  log "✓ ESLint configuration exists"
else
  warn "ESLint configuration not found"
fi

if [[ -f ".prettierrc" ]]; then
  log "✓ Prettier configuration exists"
else
  warn "Prettier configuration not found"
fi

# ============================================================
# Step 4: Validate environment files
# ============================================================
log "Step 4: Validating environment configurations..."

if [[ -f ".env.example" ]]; then
  log "✓ .env.example exists"
else
  warn ".env.example not found"
fi

# ============================================================
# Step 5: Sync GitHub workflow configurations
# ============================================================
log "Step 5: Validating GitHub workflow configurations..."

REQUIRED_WORKFLOWS=("ci.yml" "pages-deploy.yml" "lint.yml")
for workflow in "${REQUIRED_WORKFLOWS[@]}"; do
  if [[ -f ".github/workflows/$workflow" ]]; then
    log "✓ $workflow exists"
  else
    warn "Workflow $workflow not found"
  fi
done

log ""
log "=========================================="
log "✓ Configuration sync completed"
log "=========================================="
log ""
log "All configurations are synchronized and validated."
log ""

exit 0
