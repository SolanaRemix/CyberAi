#!/bin/bash
# CyberAi Bootstrap Script
# This script sets up the development environment for the CyberAi project

set -e

echo "🚀 CyberAi Bootstrap Script"
echo "=============================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js version $NODE_VERSION detected. Version 18+ is recommended."
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm --version) detected"
echo ""

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
else
    echo "ℹ️  No package.json found. Skipping dependency installation."
    echo ""
fi

# Check for Python
if command -v python3 &> /dev/null; then
    echo "✅ Python $(python3 --version) detected"
    
    # Install Python dependencies if requirements.txt exists
    if [ -f "requirements.txt" ]; then
        echo "📦 Installing Python dependencies..."
        python3 -m pip install -r requirements.txt --quiet
        echo "✅ Python dependencies installed"
        echo ""
    fi
else
    echo "ℹ️  Python not found. Python dependencies will be skipped."
fi

# Setup Git hooks if .git directory exists
if [ -d ".git" ]; then
    echo "🔧 Setting up Git hooks..."
    
    # Create pre-commit hook
    mkdir -p .git/hooks
    
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook for CyberAi

echo "Running pre-commit checks..."

# Run linter if available
if [ -f "package.json" ] && npm run lint --if-present &> /dev/null; then
    echo "✅ Linting passed"
fi

exit 0
EOF
    
    chmod +x .git/hooks/pre-commit
    echo "✅ Git hooks configured"
    echo ""
fi

echo "=============================="
echo "✅ Bootstrap complete!"
echo ""
echo "Next steps:"
echo "  - Run 'npm run dev' to start development server (if available)"
echo "  - Run 'npm test' to run tests (if available)"
echo "  - Run 'npm run build' to build the project (if available)"
echo "  - Visit https://cyberai.network for more information"
echo ""
