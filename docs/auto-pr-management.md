# Automated PR Management

## Overview

CyberAi includes comprehensive automation for pull request management, including automatic conflict resolution, testing, and merging. These features streamline the development workflow and ensure code quality.

## Features

### 1. Auto-Resolve Conflicts

Automatically detects and resolves merge conflicts in documentation and configuration files.

**Triggers:**

- Automatically on PR creation/update
- Manual trigger via comment: `@copilot auto resolve conflicts`

**How it works:**

1. Detects merge conflicts in common file types (MD, JSON, YAML, HTML, TS, JS)
2. Applies smart resolution strategies:
   - Keeps HEAD version for documentation conflicts
   - Removes conflict markers
   - Fixes formatting issues (e.g., quadruple backticks)
3. Commits and pushes resolved changes automatically

**Supported file types:**

- Markdown (`.md`)
- JSON (`.json`)
- YAML (`.yml`, `.yaml`)
- HTML (`.html`)
- TypeScript/JavaScript (`.ts`, `.js`)

### 2. Auto-Test

Runs comprehensive automated tests on every PR.

**Tests performed:**

- ESLint code quality checks
- TypeScript compilation
- Unit tests (if configured)
- Configuration sync validation
- Environment health checks

**Results:**
Posted as a comment on the PR with status for each check.

### 3. Auto-Merge

Automatically merges PRs when all requirements are met.

**Requirements:**

- All CI checks passing
- At least one approval from a reviewer
- No merge conflicts

**Triggers:**

- Automatically when PR is approved
- Manual trigger via comment: `@copilot auto merge`

**Merge method:** Squash and merge

### 4. Auto-Comment Responder

Responds to commands in PR comments.

**Supported commands:**

- `@copilot auto resolve conflicts` - Trigger conflict resolution
- `@copilot auto merge` - Check merge requirements and merge if ready
- `@copilot auto test` - Run automated tests
- `@copilot status` - Check PR status

## Usage

### Manual Conflict Resolution

Run the conflict resolution script locally:

```bash
# Make script executable
chmod +x tools/auto-resolve-conflicts.sh

# Run conflict resolution
./tools/auto-resolve-conflicts.sh

# Review changes
git status
git diff

# Commit if satisfied
git add -A
git commit -m "chore: resolve merge conflicts"
git push
```

### Triggering Automation via Comments

On any pull request, add a comment with:

```
@copilot auto resolve conflicts
```

Or:

```
@copilot auto merge
```

The automation will respond and execute the requested action.

### Checking Auto-Test Results

Auto-test runs automatically on every PR update. Results are posted as a comment:

```
🤖 Auto-Test Results

| Check | Status |
|-------|--------|
| Linting | ✅ Passed |
| Build | ✅ Passed |
| Tests | ✅ Passed |
| Config Sync | ✅ Validated |
| Environment | ✅ Healthy |
```

## Configuration

### Workflow Configuration

The automation is configured in `.github/workflows/auto-pr-management.yml`.

**Customization options:**

```yaml
# Change merge method (squash, merge, rebase)
merge_method: 'squash'

# Require minimum approvals
required_approvals: 1

# Enable/disable specific features
auto_resolve_conflicts: true
auto_test: true
auto_merge: true
```

### Conflict Resolution Strategy

The `tools/auto-resolve-conflicts.sh` script uses the following strategy:

1. **Keep HEAD version**: For most conflicts, keeps the current branch version
2. **Smart formatting**: Fixes common formatting issues
3. **Backup**: Creates backups before making changes
4. **Validation**: Ensures resolved files are syntactically correct

**To customize:**

Edit the `resolve_conflicts()` function in `tools/auto-resolve-conflicts.sh`.

## Best Practices

### For Contributors

1. **Pull latest changes** before starting work to minimize conflicts
2. **Use semantic commit messages** for automatic changelog generation
3. **Request reviews early** to enable auto-merge
4. **Monitor auto-test results** and fix issues promptly

### For Reviewers

1. **Review auto-resolved conflicts** carefully
2. **Approve only when tests pass** to enable auto-merge
3. **Use comments** to trigger re-runs if needed
4. **Check auto-test results** before approval

### For Maintainers

1. **Monitor automation logs** for issues
2. **Update conflict resolution strategy** as needed
3. **Configure required checks** in repository settings
4. **Set up branch protection rules** for safety

## Troubleshooting

### Auto-Resolve Doesn't Work

**Problem:** Conflicts not being resolved automatically

**Solutions:**

1. Check if file type is supported
2. Verify the conflict is not too complex
3. Run manual script: `./tools/auto-resolve-conflicts.sh`
4. Check GitHub Actions logs for errors

### Auto-Merge Not Triggering

**Problem:** PR not merging despite approval

**Solutions:**

1. Ensure all CI checks are passing
2. Verify at least one approval exists
3. Check for merge conflicts
4. Review branch protection rules
5. Check if manual merge is required in settings

### Auto-Test Failing

**Problem:** Tests failing unexpectedly

**Solutions:**

1. Review test output in PR comments
2. Run tests locally: `npm test`
3. Check lint errors: `npm run lint`
4. Verify build: `npm run build`
5. Run environment health check: `./tools/env-heal.sh`

## Security Considerations

### Permissions

The automation requires these permissions:

- `contents: write` - To commit resolved conflicts
- `pull-requests: write` - To merge PRs and add comments
- `checks: read` - To verify CI status
- `statuses: read` - To check PR status

### Safety Measures

1. **Read-only by default**: Automation only modifies files when explicitly triggered
2. **Backup before changes**: Creates backups before resolving conflicts
3. **Validation**: Verifies changes before committing
4. **Manual override**: Maintainers can disable automation via repository settings
5. **Audit trail**: All actions logged in GitHub Actions

### Recommended Settings

**Branch Protection:**

- Require status checks to pass
- Require at least 1 approval
- Require up-to-date branches
- Include administrators

**Repository Settings:**

- Enable auto-merge
- Allow squash merging
- Automatically delete head branches

## Advanced Usage

### Custom Conflict Resolution

Create a custom resolver for specific file types:

```bash
# In tools/auto-resolve-conflicts.sh

resolve_custom_file() {
  local file="$1"
  # Your custom logic here
  # Example: prefer incoming changes for specific files
  if [[ "$file" == "config/special.json" ]]; then
    # Keep incoming version (not HEAD)
    sed -i '/<<<<<<< HEAD/,/=======/d' "$file"
    sed -i '/>>>>>>>/d' "$file"
  fi
}
```

### Conditional Auto-Merge

Customize merge conditions:

```yaml
# In .github/workflows/auto-pr-management.yml

- name: Check additional conditions
  run: |
    # Example: Only auto-merge for dependabot
    if [[ "${{ github.actor }}" != "dependabot[bot]" ]]; then
      echo "auto_merge=false" >> $GITHUB_OUTPUT
    fi
```

### Integration with External Tools

Connect to external services:

```yaml
- name: Notify Slack
  if: steps.auto-merge.conclusion == 'success'
  uses: 8398a7/action-slack@v3
  with:
    status: 'PR auto-merged'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Monitoring

### GitHub Actions Dashboard

View automation status:

1. Go to repository → Actions
2. Select "Auto PR Management" workflow
3. Review recent runs and logs

### Metrics to Monitor

- **Success rate**: Percentage of successfully auto-merged PRs
- **Resolution time**: Time from conflict detection to resolution
- **Test pass rate**: Percentage of PRs passing auto-tests
- **Manual interventions**: Number of times manual fixes were needed

## Related Documentation

- [GitHub Actions Workflows](../.github/workflows/README.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)

## Support

For issues or questions:

- GitHub Issues: https://github.com/SolanaRemix/CyberAi/issues
- Discussions: https://github.com/SolanaRemix/CyberAi/discussions
- Documentation: https://cyberai.network/docs
