#!/bin/bash
# CyberAi Advanced Build Script
# =======================================================
# Orchestrates complex build processes with optimization

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BUILD_MODE="${1:-production}"
VERBOSE="${VERBOSE:-false}"
PARALLEL="${PARALLEL:-true}"
SKIP_TESTS="${SKIP_TESTS:-false}"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_banner() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}   CyberAi Advanced Build System${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

check_dependencies() {
    log_info "Checking build dependencies..."
    
    local missing_deps=()
    
    command -v node >/dev/null 2>&1 || missing_deps+=("node")
    command -v npm >/dev/null 2>&1 || missing_deps+=("npm")
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "Missing required dependencies: ${missing_deps[*]}"
        exit 1
    fi
    
    log_success "All dependencies found"
}

clean_build() {
    log_info "Cleaning previous build artifacts..."
    
    rm -rf dist/
    rm -rf build/
    rm -rf .cache/
    rm -rf node_modules/.cache/
    
    log_success "Clean completed"
}

setup_environment() {
    log_info "Setting up build environment..."
    
    export NODE_ENV="$BUILD_MODE"
    
    if [ "$BUILD_MODE" = "production" ]; then
        export NODE_OPTIONS="--max-old-space-size=4096"
    fi
    
    mkdir -p dist
    mkdir -p logs
    
    log_success "Environment configured for $BUILD_MODE mode"
}

install_dependencies() {
    log_info "Installing dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci --prefer-offline --no-audit
    else
        npm install --prefer-offline --no-audit
    fi
    
    log_success "Dependencies installed"
}

run_linting() {
    log_info "Running linter..."
    
    if npm run lint 2>&1 | tee logs/lint.log; then
        log_success "Linting passed"
    else
        log_warning "Linting failed - attempting auto-fix..."
        npm run lint:fix 2>&1 | tee logs/lint-fix.log || true
    fi
}

run_typecheck() {
    log_info "Running type checker..."
    
    if npm run typecheck 2>&1 | tee logs/typecheck.log; then
        log_success "Type checking passed"
    else
        log_error "Type checking failed"
        exit 1
    fi
}

run_tests() {
    if [ "$SKIP_TESTS" = "true" ]; then
        log_warning "Skipping tests (SKIP_TESTS=true)"
        return 0
    fi
    
    log_info "Running tests..."
    
    if npm test 2>&1 | tee logs/test.log; then
        log_success "All tests passed"
    else
        log_error "Tests failed"
        exit 1
    fi
}

build_typescript() {
    log_info "Building TypeScript..."
    
    local start_time=$(date +%s)
    
    if npm run build 2>&1 | tee logs/build.log; then
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        log_success "TypeScript build completed in ${duration}s"
    else
        log_error "TypeScript build failed"
        exit 1
    fi
}

optimize_build() {
    if [ "$BUILD_MODE" != "production" ]; then
        log_info "Skipping optimization (not production mode)"
        return 0
    fi
    
    log_info "Optimizing production build..."
    
    # Run any additional optimization steps
    # Example: minification, tree-shaking, etc.
    
    log_success "Build optimization completed"
}

generate_build_info() {
    log_info "Generating build information..."
    
    cat > dist/build-info.json <<EOF
{
  "version": "$(node -p "require('./package.json').version")",
  "buildMode": "$BUILD_MODE",
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "nodeVersion": "$(node --version)",
  "platform": "$(uname -s)",
  "arch": "$(uname -m)",
  "commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "branch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
}
EOF
    
    log_success "Build info generated"
}

verify_build() {
    log_info "Verifying build output..."
    
    if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
        log_error "Build output directory is empty"
        exit 1
    fi
    
    log_success "Build verification passed"
}

print_summary() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}   Build Summary${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "Mode:         ${GREEN}$BUILD_MODE${NC}"
    echo -e "Output:       ${GREEN}dist/${NC}"
    echo -e "Logs:         ${GREEN}logs/${NC}"
    echo -e "Node Version: ${GREEN}$(node --version)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Main execution
main() {
    local start_time=$(date +%s)
    
    print_banner
    
    # Build steps
    check_dependencies
    clean_build
    setup_environment
    install_dependencies
    
    # Quality checks
    run_linting
    run_typecheck
    
    # Build
    build_typescript
    optimize_build
    
    # Tests
    run_tests
    
    # Finalization
    generate_build_info
    verify_build
    
    local end_time=$(date +%s)
    local total_duration=$((end_time - start_time))
    
    print_summary
    
    log_success "Build completed successfully in ${total_duration}s 🎉"
}

# Run main function
main "$@"
