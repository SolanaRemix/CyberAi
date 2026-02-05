<#
  CyberAi Doctor Script (Read‑Only Diagnostics)
  Hard‑coded for:
    D:\tools\repos\SolanaRemix\CyberAi
#>

$RepoRoot = "D:\tools\repos\SolanaRemix\CyberAi"
$SiteDir  = "$RepoRoot\site"

function Info($m){ Write-Host "[INFO]  $m" -ForegroundColor Gray }
function Pass($m){ Write-Host "[PASS]  $m" -ForegroundColor Green }
function Warn($m){ Write-Host "[WARN]  $m" -ForegroundColor Yellow }
function Fail($m){ Write-Host "[FAIL]  $m" -ForegroundColor Red }

$Global:FAILURES = 0
function MarkFail($msg){ Fail $msg; $Global:FAILURES++ }

Write-Host "`n=== CyberAi Doctor ===" -ForegroundColor Cyan

# -----------------------------
# 1. Repo layout
# -----------------------------
Info "Checking repo layout"

if (Test-Path $RepoRoot) {
    Pass "Repo root exists"
} else {
    MarkFail "Repo root missing: $RepoRoot"
}

if (Test-Path $SiteDir) {
    Pass "Site directory exists"
} else {
    MarkFail "Site directory missing: $SiteDir"
}

# -----------------------------
# 2. Tooling
# -----------------------------
Info "Checking Node and pnpm"

$node = Get-Command node -ErrorAction SilentlyContinue
$pnpm = Get-Command pnpm -ErrorAction SilentlyContinue

if ($node) { Pass "Node found: $($node.Source)" } else { MarkFail "Node not found" }
if ($pnpm) { Pass "pnpm found: $($pnpm.Source)" } else { MarkFail "pnpm not found" }

if ($node -and ($node.Source -match "Portable|scoop|nvm")) {
    Warn "Portable Node detected — native binaries may break"
}

$pnpmVersion = (& pnpm -v)
Info "pnpm version: $pnpmVersion"

if ($pnpmVersion -like "10.*") {
    Warn "pnpm v10 detected — strict security model may block native builds"
}

# -----------------------------
# 3. pnpm metadata
# -----------------------------
Info "Checking pnpm metadata"

$Paths = @{
    "Virtual Store" = "$RepoRoot\node_modules\.pnpm"
    "Ignored Metadata" = "$RepoRoot\node_modules\.ignored"
    "pnpm Workspace Meta" = "$RepoRoot\.pnpm"
    "pnpm Store" = "$RepoRoot\.pnpm-store"
    "Lockfile" = "$RepoRoot\pnpm-lock.yaml"
}

foreach ($label in $Paths.Keys) {
    $path = $Paths[$label]
    if (Test-Path $path) {
        Warn "$label present: $path"
    } else {
        Pass "$label clean"
    }
}

# -----------------------------
# 4. Dangling symlinks
# -----------------------------
function Get-Dangling($path) {
    if (-not (Test-Path $path)) { return @() }
    Get-ChildItem -Recurse -Force $path |
        Where-Object { $_.Attributes -match "ReparsePoint" } |
        Where-Object { -not (Test-Path $_.Target) }
}

Info "Scanning for dangling symlinks"

$dangRoot = Get-Dangling "$RepoRoot\node_modules"
$dangSite = Get-Dangling "$SiteDir\node_modules"

if ($dangRoot.Count -gt 0) { MarkFail "Dangling symlinks in root: $($dangRoot.Count)" } else { Pass "No dangling symlinks in root" }
if ($dangSite.Count -gt 0) { MarkFail "Dangling symlinks in site: $($dangSite.Count)" } else { Pass "No dangling symlinks in site" }

# -----------------------------
# 5. Native binaries
# -----------------------------
function CheckBin($bin, $dir) {
    Info "Checking $bin"
    try {
        $out = pnpm exec --dir $dir $bin --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Pass "$bin OK ($out)"
        } else {
            MarkFail "$bin missing or broken"
        }
    } catch {
        MarkFail "$bin missing or broken"
    }
}

Info "Validating toolchain"

CheckBin "esbuild" $RepoRoot
CheckBin "sharp"   $RepoRoot
CheckBin "vite"    $SiteDir
CheckBin "astro"   $SiteDir

# -----------------------------
# 6. Lockfile
# -----------------------------
Info "Checking lockfile"

if (Test-Path "$RepoRoot\pnpm-lock.yaml") {
    Pass "Lockfile exists"
} else {
    Warn "Lockfile missing — install may not be deterministic"
}

# -----------------------------
# 7. Final report
# -----------------------------
Write-Host "`n=== CyberAi Doctor Report ===" -ForegroundColor Cyan

if ($Global:FAILURES -eq 0) {
    Write-Host "All systems healthy. No failures detected." -ForegroundColor Green
} else {
    Write-Host "$Global:FAILURES subsystem(s) reported failures." -ForegroundColor Red
    Write-Host "Run bootstrap.ps1 to repair the workspace." -ForegroundColor Yellow
}

Write-Host ""
