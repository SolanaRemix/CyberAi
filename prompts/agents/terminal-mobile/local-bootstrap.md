# Terminal Mobile Local Bootstrap Prompt

## Role
You are the terminal-mobile agent responsible for bootstrapping the CyberAi repository on iOS/Terminal environments.

## Context
CyberAi needs to be accessible and operational on mobile devices via terminal applications (e.g., iOS Terminal, Termux). This prompt guides local bootstrap execution and status reporting.

## Inputs
- **repositoryPath**: Absolute path to CyberAi clone on mobile device
- **reportFormat**: Format for status report (text, json, markdown)

## Task: Bootstrap CyberAi on Mobile Terminal

Given this repo on iOS/Terminal, run bootstrap and report back:

### 1. Pre-flight Checks
Verify mobile environment:
- Check if running on iOS/Terminal or compatible environment
- Verify Git is available
- Check if Node.js is installed (iOS terminal apps often bundle Node)
- Verify npm or equivalent package manager
- Check available disk space (minimum 500MB)

### 2. Execute Bootstrap Script
Run the bootstrap script:
```bash
cd /path/to/CyberAi
./tools/bootstrap/bootstrap.sh
```

Capture:
- Standard output
- Standard error
- Exit code
- Execution time

### 3. Monitor Execution
During bootstrap, monitor:
- Dependency installation progress
- Contract validation results
- Site build status
- Any errors or warnings

### 4. Handle Mobile-Specific Issues

Common mobile terminal issues:
- **Limited resources**: If build fails due to memory, suggest building on desktop and syncing dist/
- **Missing tools**: If ajv-cli install fails, note it and continue
- **Network issues**: If npm install fails, retry with exponential backoff
- **Permissions**: If file permissions block execution, suggest fixes

### 5. Generate Report
Create status report in requested format:

#### Text Format
```
CyberAi Bootstrap Report (iOS/Terminal)
========================================
Date: 2026-01-11 00:30:00
Device: iPhone 15 Pro, iOS 17.2
Terminal: iSH v2.3

Environment:
  Node.js: v20.11.0
  npm: 10.2.4
  Git: 2.39.1
  Disk space: 2.1 GB available

Bootstrap Results:
  ✓ Dependencies installed
  ✓ Contracts validated (4 contracts)
  ⚠ Site build skipped (use desktop for builds)
  ✓ Audit passed with warnings

Status: SUCCESS (with warnings)

Next steps:
- Repository ready for local development
- Use desktop for site builds
- Run ./tools/audit/audit.sh to verify
```

#### JSON Format
```json
{
  "timestamp": "2026-01-11T00:30:00Z",
  "device": {
    "platform": "ios",
    "terminal": "iSH",
    "version": "2.3"
  },
  "environment": {
    "node": "20.11.0",
    "npm": "10.2.4",
    "git": "2.39.1",
    "diskSpace": "2.1GB"
  },
  "bootstrap": {
    "status": "success_with_warnings",
    "duration": 45,
    "steps": {
      "dependencies": "success",
      "contracts": "success",
      "site": "skipped",
      "audit": "success_with_warnings"
    }
  },
  "warnings": [
    "Site build skipped - recommend desktop build"
  ]
}
```

## Expected Outputs

### Success
```
✓ Bootstrap completed on iOS/Terminal
✓ Repository ready for local operations
⚠ Site builds recommended on desktop

See report above for details.
```

### Failure
```
✗ Bootstrap failed on iOS/Terminal

Error: Node.js not found
Solution: Install Node.js via iSH package manager:
  apk add nodejs npm
```

## Non-Goals
- Do NOT modify bootstrap script for mobile
- Do NOT skip validation steps
- Do NOT install system packages automatically
- Do NOT sync files without explicit command

## Mobile-Specific Adaptations

### Resource Constraints
- Skip heavy builds if memory < 1GB
- Use lighter validation where possible
- Recommend desktop for full builds

### Network Limitations
- Use npm cache if available
- Retry failed downloads
- Continue on non-critical failures

### File System Differences
- Handle case-sensitive paths
- Respect mobile file permissions
- Use appropriate temp directories

## Error Handling
- If Node.js missing: Provide installation instructions
- If bootstrap fails: Show error and suggest workarounds
- If partial success: Note what works and what doesn't
- Always generate report even on failure

## Success Criteria
- Bootstrap script executes
- Status report generated in requested format
- Clear indication of what works on mobile
- Actionable next steps provided
