#!/usr/bin/env bash
# GOD-SWARM ULTRA — One-line installer
# Usage: curl -fsSL https://cyberai.network/install.sh | bash
# Or:    bash install.sh [--version VERSION] [--dir DIR]

set -euo pipefail

GODSWARM_VERSION="${GODSWARM_VERSION:-latest}"
INSTALL_DIR="${INSTALL_DIR:-$HOME/.godswarm}"
REPO_URL="https://github.com/SolanaRemix/CyberAi.git"
NODE_MIN_VERSION=20

# ─── Colors ───────────────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

log_info() { echo -e "${CYAN}[INFO]${RESET} $1"; }
log_ok()   { echo -e "${GREEN}[OK]${RESET}   $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${RESET} $1"; }
log_err()  { echo -e "${RED}[ERROR]${RESET} $1"; }

# ─── Banner ───────────────────────────────────────────────────────────────────

echo -e "${BOLD}${CYAN}"
echo "   ██████╗  ██████╗ ██████╗       ███████╗██╗    ██╗ █████╗ ██████╗ ███╗   ███╗"
echo "  ██╔════╝ ██╔═══██╗██╔══██╗      ██╔════╝██║    ██║██╔══██╗██╔══██╗████╗ ████║"
echo "  ██║  ███╗██║   ██║██║  ██║█████╗███████╗██║ █╗ ██║███████║██████╔╝██╔████╔██║"
echo "  ██║   ██║██║   ██║██║  ██║╚════╝╚════██║██║███╗██║██╔══██║██╔══██╗██║╚██╔╝██║"
echo "  ╚██████╔╝╚██████╔╝██████╔╝      ███████║╚███╔███╔╝██║  ██║██║  ██║██║ ╚═╝ ██║"
echo "   ╚═════╝  ╚═════╝ ╚═════╝       ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝"
echo ""
echo "                      ULTRA — Autonomous AI Swarm Platform"
echo -e "${RESET}"

# ─── Argument parsing ─────────────────────────────────────────────────────────

while [[ $# -gt 0 ]]; do
  case "$1" in
    --version) GODSWARM_VERSION="$2"; shift 2 ;;
    --dir)     INSTALL_DIR="$2"; shift 2 ;;
    *) log_err "Unknown argument: $1"; exit 1 ;;
  esac
done

# ─── Prerequisite checks ──────────────────────────────────────────────────────

check_command() {
  if ! command -v "$1" &>/dev/null; then
    log_err "$1 is required but not found. Please install $1 first."
    exit 1
  fi
}

check_node_version() {
  local version_str
  version_str=$(node --version 2>/dev/null) || { log_err "Failed to get Node.js version"; exit 1; }
  # Extract major version, handle formats like v20.1.0, v20, etc.
  local version
  version=$(echo "$version_str" | grep -oE '[0-9]+' | head -1)
  if [[ -z "$version" ]] || [[ "$version" -lt "$NODE_MIN_VERSION" ]]; then
    log_err "Node.js >= $NODE_MIN_VERSION required (found ${version_str})"
    exit 1
  fi
}

log_info "Checking prerequisites..."
check_command node
check_command npm
check_command git
check_node_version
log_ok "Prerequisites satisfied"

# ─── Install ──────────────────────────────────────────────────────────────────

log_info "Installing GOD-SWARM ULTRA to: $INSTALL_DIR"

if [[ -d "$INSTALL_DIR" ]]; then
  log_info "Updating existing installation..."
  git -C "$INSTALL_DIR" pull --rebase --autostash
else
  log_info "Cloning repository..."
  git clone --depth 1 "$REPO_URL" "$INSTALL_DIR"
fi

log_info "Installing dependencies..."
cd "$INSTALL_DIR"
# Install all dependencies (including devDependencies) so that tsc is available for the build step
npm install --quiet

log_info "Building project..."
if npm run build; then
  log_ok "Build succeeded"
else
  log_warn "Build step failed — the CLI may not be available until the project is built successfully"
fi

# ─── CLI Symlink ──────────────────────────────────────────────────────────────

CLI_BIN="$INSTALL_DIR/node_modules/.bin/godswarm"

if [[ -x "$CLI_BIN" ]]; then
  if [[ -d /usr/local/bin ]] && [[ -w /usr/local/bin ]]; then
    ln -sf "$CLI_BIN" /usr/local/bin/godswarm 2>/dev/null || true
    log_ok "CLI available globally: godswarm"
  elif [[ -d "$HOME/.local/bin" ]]; then
    mkdir -p "$HOME/.local/bin"
    ln -sf "$CLI_BIN" "$HOME/.local/bin/godswarm" 2>/dev/null || true
    log_ok "CLI available at: ~/.local/bin/godswarm"
    log_warn "Ensure ~/.local/bin is in your PATH"
  fi
else
  log_warn "CLI binary not found at: $CLI_BIN"
  log_warn "The 'godswarm' command may not be available. Please check the installation or documentation."
fi

# ─── Success ──────────────────────────────────────────────────────────────────

echo ""
echo -e "${GREEN}${BOLD}✅ GOD-SWARM ULTRA installed successfully!${RESET}"
echo ""
echo -e "${BOLD}Next steps:${RESET}"
echo "  1. Configure your environment: cp $INSTALL_DIR/.env.example .env"
echo "  2. Initialize a project:       godswarm init my-project"
echo "  3. Start the swarm:            godswarm status"
echo "  4. Run a goal:                 godswarm run \"Build and deploy a TypeScript API\""
echo ""
echo -e "${CYAN}Documentation: https://cyberai.network/docs/godswarm${RESET}"
echo -e "${CYAN}GitHub:        https://github.com/SolanaRemix/CyberAi${RESET}"
echo ""
