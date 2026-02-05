#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# AUTO-RESOLVE-CONFLICTS.SH — Automated Merge Conflict Resolution
# Automatically resolves common merge conflicts in documentation
# and configuration files
# ============================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() { printf "\n[auto-resolve] %s\n" "$*" >&2; }
error() { printf "\n[auto-resolve][ERROR] %s\n" "$*" >&2; exit 1; }
warn() { printf "\n[auto-resolve][WARN] %s\n" "$*" >&2; }
success() { printf "\n[auto-resolve][✓] %s\n" "$*" >&2; }

CONFLICTS_FOUND=0
CONFLICTS_RESOLVED=0

log "Starting automated conflict resolution..."

# ============================================================
# Function: Detect conflicts
# ============================================================
detect_conflicts() {
  local file="$1"
  if grep -q "<<<<<<< HEAD\|=======\|>>>>>>>" "$file" 2>/dev/null; then
    return 0
  fi
  return 1
}

# ============================================================
# Function: Resolve conflicts in file
# ============================================================
resolve_conflicts() {
  local file="$1"
  log "Resolving conflicts in: $file"
  
  # Create a backup
  cp "$file" "$file.backup"
  
  # Strategy: Keep HEAD version (current branch) for most conflicts
  python3 << 'EOF'
import sys
import re

def resolve_conflicts(content):
    """Remove conflict markers and keep HEAD version."""
    lines = content.split('\n')
    resolved_lines = []
    in_conflict = False
    skip_until_end = False
    
    for line in lines:
        if line.startswith('<<<<<<< HEAD'):
            in_conflict = True
            continue
        elif line.startswith('=======') and in_conflict:
            skip_until_end = True
            continue
        elif line.startswith('>>>>>>>') and in_conflict:
            in_conflict = False
            skip_until_end = False
            continue
        elif '> > > > > > >' in line:
            continue
            
        if not skip_until_end:
            # Fix quadruple backticks
            if line.strip() == '````':
                resolved_lines.append('```')
            else:
                resolved_lines.append(line)
    
    # Remove excessive blank lines
    cleaned = '\n'.join(resolved_lines)
    cleaned = re.sub(r'\n\n\n+', '\n\n', cleaned)
    
    return cleaned

# Read from stdin
content = sys.stdin.read()
resolved = resolve_conflicts(content)
print(resolved, end='')
EOF
  
  # Apply resolution
  python3 << 'EOF' < "$file" > "$file.resolved"
import sys
import re

def resolve_conflicts(content):
    lines = content.split('\n')
    resolved_lines = []
    in_conflict = False
    skip_until_end = False
    
    for line in lines:
        if line.startswith('<<<<<<< HEAD'):
            in_conflict = True
            continue
        elif line.startswith('=======') and in_conflict:
            skip_until_end = True
            continue
        elif line.startswith('>>>>>>>') and in_conflict:
            in_conflict = False
            skip_until_end = False
            continue
        elif '> > > > > > >' in line:
            continue
            
        if not skip_until_end:
            if line.strip() == '````':
                resolved_lines.append('```')
            else:
                resolved_lines.append(line)
    
    cleaned = '\n'.join(resolved_lines)
    cleaned = re.sub(r'\n\n\n+', '\n\n', cleaned)
    
    return cleaned

content = sys.stdin.read()
resolved = resolve_conflicts(content)
print(resolved, end='')
EOF
  
  # Replace original with resolved
  mv "$file.resolved" "$file"
  rm -f "$file.backup"
  
  success "Resolved: $file"
  CONFLICTS_RESOLVED=$((CONFLICTS_RESOLVED + 1))
}

# ============================================================
# Main: Scan and resolve conflicts
# ============================================================
log "Scanning repository for merge conflicts..."

# Find all text files with conflicts
while IFS= read -r -d '' file; do
  if detect_conflicts "$file"; then
    log "Found conflicts in: $file"
    CONFLICTS_FOUND=$((CONFLICTS_FOUND + 1))
    resolve_conflicts "$file"
  fi
done < <(find . -type f \( -name "*.md" -o -name "*.json" -o -name "*.yml" -o -name "*.yaml" -o -name "*.html" -o -name "*.ts" -o -name "*.js" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -print0)

# ============================================================
# Summary
# ============================================================
log ""
log "=========================================="
if [[ $CONFLICTS_FOUND -eq 0 ]]; then
  log "✓ No merge conflicts found"
  log "=========================================="
  exit 0
elif [[ $CONFLICTS_RESOLVED -eq $CONFLICTS_FOUND ]]; then
  success "Resolved all $CONFLICTS_RESOLVED conflict(s)"
  log "=========================================="
  log ""
  log "Changes have been made to resolve conflicts."
  log "Please review the changes and commit them:"
  log "  git add -A"
  log "  git commit -m 'chore: auto-resolve merge conflicts'"
  log ""
  exit 0
else
  warn "Resolved $CONFLICTS_RESOLVED of $CONFLICTS_FOUND conflict(s)"
  log "=========================================="
  log ""
  log "Some conflicts require manual resolution."
  log "Please review and fix remaining conflicts."
  log ""
  exit 1
fi
