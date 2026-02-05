# CyberAi Tools

This directory contains operational tools for the CyberAi ecosystem.

## Structure

- `bootstrap/` - Bootstrap scripts for setting up the environment
- `audit/` - Audit scripts for validating the repository

## Tools

### Bootstrap (`bootstrap/bootstrap.sh`)

Prepares the environment for development and deployment:

- Verifies Node.js installation (18+)
- Installs dependencies
- Validates contracts against schema
- Builds the site

Usage:

```bash
./tools/bootstrap/bootstrap.sh
```

### Audit (`audit/audit.sh`)

Validates repository integrity:

- Validates all contracts against schema
- Checks for required workflows
- Verifies repository structure
- Scans for security issues
- Validates site integrity

Usage:

```bash
# Dry run (default)
./tools/audit/audit.sh

# Force mode (makes changes)
DRY_RUN=false ./tools/audit/audit.sh
```

## CI Integration

These tools are integrated into CI workflows:

- `ci.yml` - Runs bootstrap and audit on every push
- `contracts-validate.yml` - Validates contracts on changes

## Development

To add new tools:

1. Create a subdirectory under `tools/`
2. Add a shell script with clear documentation
3. Make it executable: `chmod +x tools/yourdir/script.sh`
4. Update this README
5. Integrate into CI workflows if needed
