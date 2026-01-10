# CyberAi Bootstrap Script (PowerShell)
# This script sets up the development environment for the CyberAi project

Write-Host "🚀 CyberAi Bootstrap Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Check for Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
    
    # Check version
    $majorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($majorVersion -lt 18) {
        Write-Host "⚠️  Node.js version $majorVersion detected. Version 18+ is recommended." -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "   Visit: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check for npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install dependencies if package.json exists
if (Test-Path "package.json") {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host ""
} else {
    Write-Host "ℹ️  No package.json found. Skipping dependency installation." -ForegroundColor Gray
    Write-Host ""
}

# Check for Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ $pythonVersion detected" -ForegroundColor Green
    
    # Install Python dependencies if requirements.txt exists
    if (Test-Path "requirements.txt") {
        Write-Host "📦 Installing Python dependencies..." -ForegroundColor Yellow
        python -m pip install -r requirements.txt --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Python dependencies installed" -ForegroundColor Green
        }
        Write-Host ""
    }
} catch {
    Write-Host "ℹ️  Python not found. Python dependencies will be skipped." -ForegroundColor Gray
}

# Setup Git hooks if .git directory exists
if (Test-Path ".git") {
    Write-Host "🔧 Setting up Git hooks..." -ForegroundColor Yellow
    
    # Create hooks directory
    $hooksDir = ".git\hooks"
    if (-not (Test-Path $hooksDir)) {
        New-Item -ItemType Directory -Path $hooksDir -Force | Out-Null
    }
    
    # Create pre-commit hook
    $preCommitHook = @"
#!/bin/sh
# Pre-commit hook for CyberAi

echo "Running pre-commit checks..."

# Run linter if available
if [ -f "package.json" ] && npm run lint --if-present > /dev/null 2>&1; then
    echo "✅ Linting passed"
fi

exit 0
"@
    
    Set-Content -Path "$hooksDir\pre-commit" -Value $preCommitHook
    Write-Host "✅ Git hooks configured" -ForegroundColor Green
    Write-Host ""
}

Write-Host "==============================" -ForegroundColor Cyan
Write-Host "✅ Bootstrap complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  - Run 'npm run dev' to start development server (if available)"
Write-Host "  - Run 'npm test' to run tests (if available)"
Write-Host "  - Run 'npm run build' to build the project (if available)"
Write-Host "  - Visit https://cyberai.network for more information"
Write-Host ""
