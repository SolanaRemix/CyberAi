#!/bin/bash

# Availability Check Script
# Checks handle, package, and organization name availability across platforms
#
# Usage:
#   ./availability-check.sh <name>
#   ./availability-check.sh smartcontractaudit
#
# Checks:
#   - GitHub username/org
#   - npm package
#   - PyPI package
#   - Domain availability (basic)
#
# SECURITY: No secrets or API keys required
# DRY RUN: Safe to run, only performs read-only checks

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    
    case $status in
        "available")
            echo -e "${GREEN}✓${NC} $message"
            ;;
        "taken")
            echo -e "${RED}✗${NC} $message"
            ;;
        "unknown")
            echo -e "${YELLOW}?${NC} $message"
            ;;
        "info")
            echo -e "${BLUE}ℹ${NC} $message"
            ;;
    esac
}

# Function to check GitHub
check_github() {
    local name=$1
    print_status "info" "Checking GitHub..."
    
    # Check username
    if curl -s -o /dev/null -w "%{http_code}" "https://github.com/$name" | grep -q "200"; then
        print_status "taken" "GitHub username: $name is TAKEN"
        echo "           URL: https://github.com/$name"
    else
        print_status "available" "GitHub username: $name is AVAILABLE"
    fi
    
    echo ""
}

# Function to check npm
check_npm() {
    local name=$1
    print_status "info" "Checking npm..."
    
    if curl -s "https://registry.npmjs.org/$name" | grep -q "error"; then
        print_status "available" "npm package: $name is AVAILABLE"
    else
        print_status "taken" "npm package: $name is TAKEN"
        echo "           URL: https://www.npmjs.com/package/$name"
    fi
    
    echo ""
}

# Function to check PyPI
check_pypi() {
    local name=$1
    print_status "info" "Checking PyPI..."
    
    if curl -s -o /dev/null -w "%{http_code}" "https://pypi.org/project/$name/" | grep -q "404"; then
        print_status "available" "PyPI package: $name is AVAILABLE"
    else
        print_status "taken" "PyPI package: $name is TAKEN"
        echo "           URL: https://pypi.org/project/$name/"
    fi
    
    echo ""
}

# Function to check domain (basic)
check_domain() {
    local name=$1
    print_status "info" "Checking domain availability (basic check)..."
    
    # Check .com
    if curl -s -o /dev/null -w "%{http_code}" "https://$name.com" | grep -qE "200|301|302"; then
        print_status "taken" "Domain: $name.com appears TAKEN or has DNS"
    else
        print_status "unknown" "Domain: $name.com - DNS not resolving (may be available)"
    fi
    
    # Check .org
    if curl -s -o /dev/null -w "%{http_code}" "https://$name.org" | grep -qE "200|301|302"; then
        print_status "taken" "Domain: $name.org appears TAKEN or has DNS"
    else
        print_status "unknown" "Domain: $name.org - DNS not resolving (may be available)"
    fi
    
    echo ""
}

# Function to check social media (basic)
check_social() {
    local name=$1
    print_status "info" "Checking social media handles..."
    
    # Twitter/X (basic check)
    if curl -s -o /dev/null -w "%{http_code}" "https://twitter.com/$name" | grep -q "200"; then
        print_status "taken" "Twitter/X: @$name is TAKEN"
        echo "           URL: https://twitter.com/$name"
    else
        print_status "unknown" "Twitter/X: @$name - check manually"
    fi
    
    echo ""
}

# Main function
main() {
    if [ $# -eq 0 ]; then
        echo "Usage: $0 <name>"
        echo "Example: $0 smartcontractaudit"
        exit 1
    fi
    
    local name=$1
    
    echo ""
    echo "═══════════════════════════════════════════"
    echo "  Availability Checker"
    echo "═══════════════════════════════════════════"
    echo "  Checking availability for: $name"
    echo "═══════════════════════════════════════════"
    echo ""
    
    # Run checks
    check_github "$name"
    check_npm "$name"
    check_pypi "$name"
    check_domain "$name"
    check_social "$name"
    
    echo "═══════════════════════════════════════════"
    echo "  Check Complete"
    echo "═══════════════════════════════════════════"
    echo ""
    echo "Notes:"
    echo "  ✓ = Available or likely available"
    echo "  ✗ = Taken or in use"
    echo "  ? = Unknown, manual verification recommended"
    echo ""
    echo "IMPORTANT: These checks are basic and may not be 100% accurate."
    echo "Always verify manually before claiming a name."
    echo ""
}

# Run main
main "$@"
