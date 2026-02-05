# Configuration Sync and Environment Auto-Healing

## Overview

CyberAi includes automated configuration synchronization and environment auto-healing capabilities to ensure stable version updates and consistent deployments across all environments.

## Tools

### 1. Configuration Sync (`tools/config-sync.sh`)

Automatically synchronizes and validates configuration files across the repository.

**Features:**

- Syncs package.json versions across subprojects
- Validates TypeScript configurations
- Validates ESLint and Prettier configurations
- Validates environment files
- Validates GitHub workflow configurations

**Usage:**

```bash
./tools/config-sync.sh
```

**What it does:**

1. Ensures all package.json files have consistent versions
2. Syncs OpenAI dependency versions across subprojects
3. Validates presence of all required configuration files
4. Checks GitHub workflow configurations for completeness

**Exit Codes:**

- `0`: Success - all configurations synchronized
- `1`: Error - configuration sync failed

### 2. Environment Auto-Healing (`tools/env-heal.sh`)

Automatically detects and fixes common environment issues.

**Features:**

- Validates Node.js version compatibility
- Checks and heals npm dependencies
- Validates build artifacts
- Checks Git configuration
- Ensures correct file permissions
- Validates contract files

**Usage:**

```bash
./tools/env-heal.sh
```

**What it does:**

1. **Node.js Validation**: Checks Node.js version (20+ recommended)
2. **Dependency Healing**: Detects out-of-sync dependencies and reinstalls them
3. **Build Artifact Validation**: Ensures TypeScript and site builds are healthy
4. **Git Configuration**: Validates repository health
5. **Permission Healing**: Makes scripts executable automatically
6. **Contract Validation**: Validates contracts against schema

**Exit Codes:**

- `0`: Success - environment is healthy or healed
- `1`: Error - critical environment issue that requires manual intervention

## Integration with CI/CD

Both scripts are designed to be run in CI/CD pipelines:

### GitHub Actions Example

```yaml
- name: Run Environment Auto-Healing
  run: |
    chmod +x tools/env-heal.sh
    ./tools/env-heal.sh

- name: Run Configuration Sync
  run: |
    chmod +x tools/config-sync.sh
    ./tools/config-sync.sh
```

### Pre-commit Hook Example

```bash
#!/bin/bash
# .git/hooks/pre-commit

./tools/config-sync.sh || exit 1
./tools/env-heal.sh || exit 1
```

## Automated Configuration Updates

### Version Synchronization

The config-sync script ensures that:

- Root package.json version is the source of truth
- Site and scripts package.json versions match the root
- OpenAI dependency versions are consistent across all subprojects

### Dependency Healing

The env-heal script automatically:

- Detects when `npm ls` fails (indicating dependency issues)
- Removes stale package-lock.json files
- Reinstalls dependencies to fix conflicts
- Reports the number of issues fixed

## Troubleshooting

### Config Sync Issues

**Problem**: Script reports missing configurations

```
[config-sync.sh][WARN] ESLint configuration not found
```

**Solution**: Create the missing configuration file:

```bash
# For ESLint
cp .eslintrc.json.example .eslintrc.json
```

### Environment Healing Issues

**Problem**: Node.js version too old

```
[env-heal.sh][WARN] Node.js version is 16, but 20+ is recommended
```

**Solution**: Upgrade Node.js to version 20 or higher:

```bash
# Using nvm
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

**Problem**: Dependencies cannot be healed automatically

```
[env-heal.sh][ERROR] Critical dependency issue detected
```

**Solution**: Manual intervention required:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# If issues persist, check for conflicting global packages
npm ls -g --depth=0
```

## Best Practices

1. **Run regularly**: Execute both scripts before committing changes
2. **CI Integration**: Include in your CI pipeline for automated validation
3. **Monitor output**: Pay attention to warnings and fix issues proactively
4. **Version control**: Commit updated lock files after running scripts
5. **Team alignment**: Ensure all team members run scripts regularly

## Manual Override

If you need to skip certain checks:

```bash
# Skip dependency healing (dangerous!)
SKIP_DEPS=true ./tools/env-heal.sh

# Skip version sync (not recommended)
SKIP_VERSION_SYNC=true ./tools/config-sync.sh
```

## Maintenance

These scripts are self-maintaining but should be reviewed:

- After major Node.js version upgrades
- When adding new subprojects
- When modifying the repository structure
- Quarterly for best practices updates

## Related Documentation

- [Bootstrap Script](../tools/bootstrap/README.md)
- [Audit Script](../tools/audit/README.md)
- [CI/CD Workflows](../.github/workflows/README.md)
- [Contributing Guide](../CONTRIBUTING.md)

## Support

For issues or questions:

- GitHub Issues: https://github.com/SolanaRemix/CyberAi/issues
- Documentation: https://cyberai.network/docs
- Security: See SECURITY.md
