#!/bin/bash

# Verification script to check if Vercel is fully disconnected
# This script checks for any remaining Vercel integration artifacts

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Vercel Disconnection Verification Tool                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

ISSUES_FOUND=0
WARNINGS=0

# Check 1: .vercel directory
echo -e "${BLUE}[1/6] Checking for .vercel directory...${NC}"
if [ -d ".vercel" ]; then
    echo -e "${YELLOW}  ⚠️  .vercel directory found${NC}"
    echo -e "      This suggests Vercel has been used for deployment"
    echo -e "      You can safely remove it: ${GREEN}rm -rf .vercel${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}  ✅ No .vercel directory found${NC}"
fi
echo ""

# Check 2: vercel.json configuration
echo -e "${BLUE}[2/6] Checking vercel.json configuration...${NC}"
if [ -f "vercel.json" ]; then
    # Check if builds are disabled
    if grep -q '"buildCommand".*:.*null' vercel.json && \
       grep -q '"enabled".*:.*false' vercel.json; then
        echo -e "${GREEN}  ✅ vercel.json exists with builds disabled (correct)${NC}"
        echo -e "      This is the recommended configuration to prevent Vercel builds"
    else
        echo -e "${YELLOW}  ⚠️  vercel.json exists with builds enabled${NC}"
        echo -e "      Consider disabling builds or removing the file after disconnecting Vercel app"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${GREEN}  ✅ No vercel.json found${NC}"
fi
echo ""

# Check 3: Vercel environment variables in .env files
echo -e "${BLUE}[3/6] Checking for Vercel environment variables...${NC}"
VERCEL_ENV_FOUND=0
for file in .env .env.local .env.example .env.production; do
    if [ -f "$file" ]; then
        if grep -qi "VERCEL" "$file"; then
            echo -e "${YELLOW}  ⚠️  Vercel environment variables found in $file${NC}"
            VERCEL_ENV_FOUND=1
        fi
    fi
done
if [ $VERCEL_ENV_FOUND -eq 0 ]; then
    echo -e "${GREEN}  ✅ No Vercel environment variables found${NC}"
else
    echo -e "      You may want to remove Vercel-specific environment variables"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 4: Vercel-specific npm scripts
echo -e "${BLUE}[4/6] Checking package.json for Vercel scripts...${NC}"
if [ -f "package.json" ]; then
    # Ignore the verify-vercel-disconnect helper script itself when checking for Vercel scripts
    if grep "vercel" package.json | grep -vq "verify-vercel-disconnect"; then
        echo -e "${YELLOW}  ⚠️  Vercel-related scripts found in package.json${NC}"
        echo -e "      You may want to remove Vercel-specific scripts if no longer needed"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${GREEN}  ✅ No Vercel scripts in package.json${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠️  No package.json found${NC}"
fi
echo ""

# Check 5: GitHub workflows mentioning Vercel
echo -e "${BLUE}[5/6] Checking GitHub workflows for Vercel references...${NC}"
WORKFLOW_REFS=0
if [ -d ".github/workflows" ]; then
    for workflow in .github/workflows/*.yml .github/workflows/*.yaml; do
        if [ -f "$workflow" ]; then
            if grep -qi "vercel" "$workflow"; then
                echo -e "${YELLOW}  ⚠️  Vercel reference found in $(basename $workflow)${NC}"
                WORKFLOW_REFS=$((WORKFLOW_REFS + 1))
            fi
        fi
    done
fi
if [ $WORKFLOW_REFS -eq 0 ]; then
    echo -e "${GREEN}  ✅ No Vercel references in GitHub workflows${NC}"
else
    echo -e "      Review workflows to ensure they're not attempting Vercel deployments"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 6: GitHub Pages configuration
echo -e "${BLUE}[6/6] Checking GitHub Pages configuration...${NC}"
if [ -f ".github/workflows/pages-deploy.yml" ] || [ -f ".github/workflows/deploy-pages.yml" ]; then
    echo -e "${GREEN}  ✅ GitHub Pages workflow found${NC}"
    echo -e "      Site is configured for GitHub Pages deployment"
elif [ -f ".github/workflows/astro.yml" ]; then
    echo -e "${GREEN}  ✅ Astro deployment workflow found${NC}"
    echo -e "      Site has deployment workflow configured"
else
    echo -e "${YELLOW}  ⚠️  No GitHub Pages workflow found${NC}"
    echo -e "      Consider setting up GitHub Pages deployment"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Summary
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"

if [ $ISSUES_FOUND -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo -e "${GREEN}   Your repository appears to be fully disconnected from Vercel.${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "   1. Verify Vercel bot doesn't comment on new PRs"
    echo "   2. Optionally remove vercel.json and .vercelignore if no longer needed"
    echo "   3. Check GitHub repository settings to confirm Vercel app is disconnected"
elif [ $ISSUES_FOUND -gt 0 ]; then
    echo -e "${RED}❌ Found $ISSUES_FOUND critical issue(s)${NC}"
    echo -e "${RED}   Please address the issues above before considering Vercel disconnected.${NC}"
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $WARNINGS warning(s)${NC}"
    echo -e "${YELLOW}   These are minor issues that won't prevent Vercel disconnection.${NC}"
    echo ""
    echo -e "${BLUE}To fully disconnect Vercel GitHub App:${NC}"
    echo "   1. Go to: https://github.com/SolanaRemix/CyberAi/settings/installations"
    echo "   2. Find 'Vercel' and click 'Configure'"
    echo "   3. Remove this repository from the access list"
    echo "   4. Or visit: https://vercel.com/gxq-studio/cyber-ai/settings"
    echo "   5. Disconnect the Git integration"
    echo ""
    echo -e "   📖 See ${GREEN}docs/DISCONNECT_VERCEL.md${NC} for detailed instructions"
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"

exit 0
