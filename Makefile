# CyberAi Advanced Build System Makefile
# =======================================================
# Provides cross-platform build automation with advanced features

.PHONY: help install clean build test lint format typecheck dev docker all
.DEFAULT_GOAL := help

# Configuration
NODE_VERSION := 20
DOCKER_IMAGE := cyberai
DOCKER_TAG := latest
BUILD_DIR := dist
LOGS_DIR := logs

# Colors for output
COLOR_RESET := \033[0m
COLOR_BOLD := \033[1m
COLOR_GREEN := \033[32m
COLOR_YELLOW := \033[33m
COLOR_BLUE := \033[34m

# Help target
help: ## Display this help message
	@echo "$(COLOR_BOLD)CyberAi Build System$(COLOR_RESET)"
	@echo "$(COLOR_BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(COLOR_RESET)"
	@echo ""
	@echo "$(COLOR_GREEN)Available targets:$(COLOR_RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(COLOR_YELLOW)%-20s$(COLOR_RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(COLOR_BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(COLOR_RESET)"

# Installation targets
install: ## Install all dependencies
	@echo "$(COLOR_GREEN)Installing dependencies...$(COLOR_RESET)"
	npm ci
	@echo "$(COLOR_GREEN)✓ Dependencies installed$(COLOR_RESET)"

install-dev: ## Install development dependencies
	@echo "$(COLOR_GREEN)Installing development dependencies...$(COLOR_RESET)"
	npm install
	@echo "$(COLOR_GREEN)✓ Development dependencies installed$(COLOR_RESET)"

# Build targets
build: ## Build the project
	@echo "$(COLOR_GREEN)Building project...$(COLOR_RESET)"
	@mkdir -p $(BUILD_DIR)
	npm run build
	@echo "$(COLOR_GREEN)✓ Build completed$(COLOR_RESET)"

build-prod: ## Build for production with optimizations
	@echo "$(COLOR_GREEN)Building for production...$(COLOR_RESET)"
	@mkdir -p $(BUILD_DIR)
	NODE_ENV=production npm run build
	@echo "$(COLOR_GREEN)✓ Production build completed$(COLOR_RESET)"

build-watch: ## Build in watch mode
	@echo "$(COLOR_GREEN)Starting build watcher...$(COLOR_RESET)"
	npm run build -- --watch

# Clean targets
clean: ## Clean build artifacts
	@echo "$(COLOR_YELLOW)Cleaning build artifacts...$(COLOR_RESET)"
	rm -rf $(BUILD_DIR)
	rm -rf node_modules/.cache
	rm -rf site/.astro
	rm -rf site/dist
	@echo "$(COLOR_GREEN)✓ Clean completed$(COLOR_RESET)"

clean-all: clean ## Clean all generated files including node_modules
	@echo "$(COLOR_YELLOW)Cleaning all generated files...$(COLOR_RESET)"
	rm -rf node_modules
	rm -rf site/node_modules
	rm -rf $(LOGS_DIR)
	rm -rf coverage
	@echo "$(COLOR_GREEN)✓ Deep clean completed$(COLOR_RESET)"

# Test targets
test: ## Run all tests
	@echo "$(COLOR_GREEN)Running tests...$(COLOR_RESET)"
	@mkdir -p $(LOGS_DIR)
	npm test 2>&1 | tee $(LOGS_DIR)/test.log
	@echo "$(COLOR_GREEN)✓ Tests completed$(COLOR_RESET)"

test-unit: ## Run unit tests only
	@echo "$(COLOR_GREEN)Running unit tests...$(COLOR_RESET)"
	npm run test:unit

test-integration: ## Run integration tests only
	@echo "$(COLOR_GREEN)Running integration tests...$(COLOR_RESET)"
	npm run test:integration

test-watch: ## Run tests in watch mode
	@echo "$(COLOR_GREEN)Starting test watcher...$(COLOR_RESET)"
	npm run test:watch

test-ui: ## Run tests with UI
	@echo "$(COLOR_GREEN)Starting test UI...$(COLOR_RESET)"
	npm run test:ui

test-coverage: ## Run tests with coverage report
	@echo "$(COLOR_GREEN)Running tests with coverage...$(COLOR_RESET)"
	@mkdir -p $(LOGS_DIR)
	npm test -- --coverage 2>&1 | tee $(LOGS_DIR)/coverage.log
	@echo "$(COLOR_GREEN)✓ Coverage report generated$(COLOR_RESET)"

# Code quality targets
lint: ## Run linter
	@echo "$(COLOR_GREEN)Running linter...$(COLOR_RESET)"
	@mkdir -p $(LOGS_DIR)
	npm run lint 2>&1 | tee $(LOGS_DIR)/lint.log
	@echo "$(COLOR_GREEN)✓ Linting completed$(COLOR_RESET)"

lint-fix: ## Run linter with auto-fix
	@echo "$(COLOR_GREEN)Running linter with auto-fix...$(COLOR_RESET)"
	npm run lint:fix
	@echo "$(COLOR_GREEN)✓ Linting and fixes completed$(COLOR_RESET)"

format: ## Format code
	@echo "$(COLOR_GREEN)Formatting code...$(COLOR_RESET)"
	npm run format
	@echo "$(COLOR_GREEN)✓ Formatting completed$(COLOR_RESET)"

format-check: ## Check code formatting
	@echo "$(COLOR_GREEN)Checking code formatting...$(COLOR_RESET)"
	npm run format:check

typecheck: ## Run TypeScript type checking
	@echo "$(COLOR_GREEN)Running type checker...$(COLOR_RESET)"
	@mkdir -p $(LOGS_DIR)
	npm run typecheck 2>&1 | tee $(LOGS_DIR)/typecheck.log
	@echo "$(COLOR_GREEN)✓ Type checking completed$(COLOR_RESET)"

# Quality gates
quality: lint typecheck test ## Run all quality checks

verify: quality ## Verify project is ready for commit
	@echo "$(COLOR_GREEN)All quality checks passed!$(COLOR_RESET)"

# Development targets
dev: ## Start development server (site)
	@echo "$(COLOR_GREEN)Starting development server...$(COLOR_RESET)"
	cd site && npm run dev

dev-watch: ## Start development with watch mode
	@echo "$(COLOR_GREEN)Starting development with watch mode...$(COLOR_RESET)"
	@make -j2 build-watch dev

# Bootstrap targets
bootstrap: ## Run bootstrap process
	@echo "$(COLOR_GREEN)Running bootstrap...$(COLOR_RESET)"
	@chmod +x tools/bootstrap/bootstrap.sh
	./tools/bootstrap/bootstrap.sh
	@echo "$(COLOR_GREEN)✓ Bootstrap completed$(COLOR_RESET)"

# Docker targets
docker-build: ## Build Docker image
	@echo "$(COLOR_GREEN)Building Docker image...$(COLOR_RESET)"
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .
	@echo "$(COLOR_GREEN)✓ Docker image built$(COLOR_RESET)"

docker-run: ## Run Docker container
	@echo "$(COLOR_GREEN)Running Docker container...$(COLOR_RESET)"
	docker run -p 3000:3000 $(DOCKER_IMAGE):$(DOCKER_TAG)

docker-up: ## Start Docker Compose services
	@echo "$(COLOR_GREEN)Starting Docker Compose services...$(COLOR_RESET)"
	docker-compose up -d
	@echo "$(COLOR_GREEN)✓ Services started$(COLOR_RESET)"

docker-down: ## Stop Docker Compose services
	@echo "$(COLOR_YELLOW)Stopping Docker Compose services...$(COLOR_RESET)"
	docker-compose down
	@echo "$(COLOR_GREEN)✓ Services stopped$(COLOR_RESET)"

docker-logs: ## View Docker Compose logs
	docker-compose logs -f

# CI/CD targets
ci: install quality build ## Run CI pipeline locally
	@echo "$(COLOR_GREEN)✓ CI pipeline completed successfully$(COLOR_RESET)"

ci-fast: ## Run fast CI checks (lint + typecheck only)
	@echo "$(COLOR_GREEN)Running fast CI checks...$(COLOR_RESET)"
	@make lint
	@make typecheck
	@echo "$(COLOR_GREEN)✓ Fast checks completed$(COLOR_RESET)"

# Release targets
release-check: ## Check if ready for release
	@echo "$(COLOR_GREEN)Checking release readiness...$(COLOR_RESET)"
	@make verify
	@make build-prod
	@echo "$(COLOR_GREEN)✓ Ready for release$(COLOR_RESET)"

# Utility targets
info: ## Display project information
	@echo "$(COLOR_BOLD)CyberAi Project Information$(COLOR_RESET)"
	@echo "$(COLOR_BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(COLOR_RESET)"
	@echo "Node Version:    $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "NPM Version:     $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "Build Directory: $(BUILD_DIR)"
	@echo "Logs Directory:  $(LOGS_DIR)"
	@echo "Docker Image:    $(DOCKER_IMAGE):$(DOCKER_TAG)"
	@echo "$(COLOR_BLUE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(COLOR_RESET)"

logs: ## Show build logs
	@echo "$(COLOR_GREEN)Recent logs:$(COLOR_RESET)"
	@ls -lah $(LOGS_DIR)/ 2>/dev/null || echo "No logs found"

# Complete build
all: clean install build test ## Clean, install, build, and test everything
	@echo "$(COLOR_GREEN)✓ Complete build finished$(COLOR_RESET)"
