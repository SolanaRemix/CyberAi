#!/bin/bash

# Vercel Issue Scanner & Diagnostic Tool
# Helps users identify if they're experiencing Vercel-related problems
# and provides instructions for transitioning to GitHub Pages

set -e

echo "=============================================="
echo "  CyberAi - Vercel Issue Scanner"
echo "=============================================="
echo ""
echo "This tool helps diagnose Vercel-related issues"
echo "and assists with migration to GitHub Pages."
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

VERCEL_ISSUES=0

# Function to check for Vercel configuration files
check_vercel_config() {
    echo -e "${BLUE}[1/5] Checking for Vercel configuration files...${NC}"
    
    if [ -f "vercel.json" ]; then
        # Check if vercel.json is configured to disable builds
        if grep -q '"buildCommand".*:.*null' vercel.json && \
           grep -q '"enabled".*:.*false' vercel.json; then
            echo -e "${GREEN}  ✅ Found vercel.json with builds disabled (intentional)${NC}"
        else
            echo -e "${YELLOW}  ⚠️  Found vercel.json with builds enabled - This should be removed or disabled${NC}"
            VERCEL_ISSUES=$((VERCEL_ISSUES + 1))
        fi
    else
        echo -e "${GREEN}  ✅ No vercel.json found${NC}"
    fi
    
    if [ -d ".vercel" ]; then
        echo -e "${YELLOW}  ⚠️  Found .vercel directory - This should be removed${NC}"
        VERCEL_ISSUES=$((VERCEL_ISSUES + 1))
    else
        echo -e "${GREEN}  ✅ No .vercel directory found${NC}"
    fi
    
    echo ""
}

# Function to check for Vercel-specific code
check_vercel_dependencies() {
    echo -e "${BLUE}[2/5] Checking for Vercel-specific dependencies...${NC}"
    
    if grep -r "@vercel" package.json site/package.json 2>/dev/null | grep -v "package-lock.json" > /dev/null; then
        echo -e "${YELLOW}  ⚠️  Found @vercel dependencies in package.json${NC}"
        VERCEL_ISSUES=$((VERCEL_ISSUES + 1))
    else
        echo -e "${GREEN}  ✅ No direct Vercel dependencies in package.json${NC}"
    fi
    
    # Check for optional Vercel dependencies in lock file (these are OK)
    if grep -q "@vercel" site/package-lock.json 2>/dev/null; then
        echo -e "${GREEN}  ℹ️  Vercel optional peer dependencies found in lock file (OK - not installed)${NC}"
    fi
    
    echo ""
}

# Function to check deployment configuration
check_deployment_config() {
    echo -e "${BLUE}[3/5] Checking deployment configuration...${NC}"
    
    if [ -f ".github/workflows/pages-deploy.yml" ] || [ -f ".github/workflows/deploy-pages.yml" ]; then
        echo -e "${GREEN}  ✅ GitHub Pages workflow configured${NC}"
    else
        echo -e "${YELLOW}  ⚠️  No GitHub Pages workflow found${NC}"
        VERCEL_ISSUES=$((VERCEL_ISSUES + 1))
    fi
    
    if [ -f "site/public/CNAME" ] || [ -f "CNAME" ]; then
        CNAME_DOMAIN=$(cat site/public/CNAME 2>/dev/null || cat CNAME 2>/dev/null)
        if [ -n "$CNAME_DOMAIN" ]; then
            echo -e "${GREEN}  ✅ CNAME configured for: ${CNAME_DOMAIN}${NC}"
        else
            echo -e "${YELLOW}  ⚠️  CNAME file exists but is empty${NC}"
            VERCEL_ISSUES=$((VERCEL_ISSUES + 1))
        fi
    else
        echo -e "${YELLOW}  ⚠️  No CNAME file found${NC}"
        VERCEL_ISSUES=$((VERCEL_ISSUES + 1))
    fi
    
    echo ""
}

# Function to check for common Vercel-specific code patterns
check_vercel_code_patterns() {
    echo -e "${BLUE}[4/5] Checking for Vercel-specific code patterns...${NC}"
    
    VERCEL_PATTERNS=(
        "vercel.json"
        "VERCEL_URL"
        "@vercel/node"
        "vercel deploy"
        "vercel.app"
    )
    
    FOUND_PATTERNS=0
    SEARCH_DIRS=()
    
    # Only search directories that exist
    for dir in src site/src scripts; do
        if [ -d "$dir" ]; then
            SEARCH_DIRS+=("$dir")
        fi
    done
    
    if [ ${#SEARCH_DIRS[@]} -eq 0 ]; then
        echo -e "${GREEN}  ✅ No source directories to scan${NC}"
        echo ""
        return
    fi
    
    for pattern in "${VERCEL_PATTERNS[@]}"; do
        if grep -r "$pattern" "${SEARCH_DIRS[@]}" 2>/dev/null | grep -v "node_modules" | grep -v ".git" > /dev/null; then
            echo -e "${YELLOW}  ⚠️  Found '$pattern' in code${NC}"
            FOUND_PATTERNS=$((FOUND_PATTERNS + 1))
        fi
    done
    
    if [ $FOUND_PATTERNS -eq 0 ]; then
        echo -e "${GREEN}  ✅ No Vercel-specific code patterns detected${NC}"
    else
        VERCEL_ISSUES=$((VERCEL_ISSUES + FOUND_PATTERNS))
    fi
    
    echo ""
}

# Function to provide migration guidance
provide_guidance() {
    echo -e "${BLUE}[5/5] Generating report...${NC}"
    echo ""
    
    if [ $VERCEL_ISSUES -eq 0 ]; then
        echo -e "${GREEN}=============================================="
        echo -e "  ✅ All Clear! No Vercel Issues Found"
        echo -e "==============================================${NC}"
        echo ""
        echo "Your repository is properly configured for GitHub Pages."
        echo ""
        echo "🚀 Current Setup:"
        echo "  • GitHub Pages deployment: Configured"
        echo "  • Custom domain: cyberai.network"
        echo "  • Build system: Astro"
        echo ""
        echo "📚 Useful Commands:"
        echo "  • Build site: cd site && npm run build"
        echo "  • Preview site: cd site && npm run preview"
        echo "  • Deploy: Push to main branch (automatic)"
        echo ""
    else
        echo -e "${YELLOW}=============================================="
        echo -e "  ⚠️  Found ${VERCEL_ISSUES} Vercel Issue(s)"
        echo -e "==============================================${NC}"
        echo ""
        echo "🔧 Recommended Actions:"
        echo ""
        echo "1. Remove Vercel Configuration Files:"
        echo "   rm -rf .vercel"
        echo "   # Keep vercel.json if it disables builds (buildCommand: null, github.enabled: false)"
        echo "   # Remove vercel.json only if it enables builds"
        echo ""
        echo "2. Remove Vercel Dependencies:"
        echo "   Edit package.json and remove @vercel/* packages"
        echo "   npm install"
        echo ""
        echo "3. Update Environment Variables:"
        echo "   Replace VERCEL_* variables with GitHub Pages equivalents"
        echo ""
        echo "4. Test Build Locally:"
        echo "   cd site && npm run build"
        echo ""
        echo "5. Verify GitHub Pages Deployment:"
        echo "   Check .github/workflows/pages-deploy.yml"
        echo ""
        echo "📖 Migration Guide:"
        echo "   See MIGRATION.md for detailed instructions"
        echo ""
    fi
    
    echo "=============================================="
    echo "  Need Help?"
    echo "=============================================="
    echo ""
    echo "🐛 Report Issues:"
    echo "   https://github.com/SolanaRemix/CyberAi/issues"
    echo ""
    echo "💬 Discussions:"
    echo "   https://github.com/SolanaRemix/CyberAi/discussions"
    echo ""
    echo "📚 Documentation:"
    echo "   https://cyberai.network/docs"
    echo ""
}

# Run all checks
check_vercel_config
check_vercel_dependencies
check_deployment_config
check_vercel_code_patterns
provide_guidance

exit 0
