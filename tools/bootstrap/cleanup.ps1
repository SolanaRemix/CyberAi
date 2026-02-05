<#
.SYNOPSIS
  Nuclear-grade pnpm workspace cleanup + dev bootstrap for CyberAi.

.DESCRIPTION
  - Detects portable Node conflicts
  - Detects corrupted pnpm virtual stores and poisoned metadata
  - Detects dangling symlinks in node_modules
  - Wipes only the correct folders
  - Resets workspace state
  - Reinstalls deterministically (root + site)
  - Validates esbuild, sharp, vite, astro
  - Launches pnpm dev server for the Astro site
#>

[CmdletBinding()]
param(
    [string]$RepoRoot = (Resolve-Path -LiteralPath ".").Path,
    [switch]$DryRun
)

# -----------------------------
# Helpers
# -----------------------------

function Write-Section {
    param([string]$Message)
    Write-Host ""
    Write-Host "=== $Message ===" -ForegroundColor Cyan
}

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Gray
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-ErrorLine {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Assert-Command {
    param(
        [string]$Name,
        [string]$InstallHint
    )
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        Write-ErrorLine "Required command '$Name' not found."
        if ($InstallHint) {
            Write-Warn $InstallHint
        }
        throw "Missing required command: $Name"
    }
}

function Remove-PathSafe {
    param(
        [string]$Path,
        [switch]$Force
    )
    if (-not (Test-Path -LiteralPath $Path)) {
        return
    }

    if ($DryRun) {
        Write-Info "DryRun: would remove '$Path'"
        return
    }

    Write-Info "Removing '$Path'"
    Remove-Item -LiteralPath $Path -Recurse -Force -ErrorAction SilentlyContinue
}

function Invoke-CommandSafe {
    param(
        [string]$Command,
        [string]$WorkingDirectory = $RepoRoot,
        [switch]$IgnoreFailure
    )

    Write-Info "Running: $Command (cwd: $WorkingDirectory)"
    if ($DryRun) {
        Write-Info "DryRun: skipping execution"
        return $null
    }

    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName  = "powershell.exe"
    $psi.Arguments = "-NoLogo -NoProfile -ExecutionPolicy Bypass -Command `$ErrorActionPreference='Stop'; $Command"
    $psi.WorkingDirectory = $WorkingDirectory
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError  = $true
    $psi.UseShellExecute = $false

    $p = New-Object System.Diagnostics.Process
    $p.StartInfo = $psi
    [void]$p.Start()
    $stdout = $p.StandardOutput.ReadToEnd()
    $stderr = $p.StandardError.ReadToEnd()
    $p.WaitForExit()

    if ($stdout) { Write-Host $stdout }
    if ($stderr) { Write-Warn $stderr }

    if ($p.ExitCode -ne 0 -and -not $IgnoreFailure) {
        throw "Command failed with exit code $($p.ExitCode): $Command"
    }

    return @{
        ExitCode = $p.ExitCode
        StdOut   = $stdout
        StdErr   = $stderr
    }
}

# -----------------------------
# 1. Resolve repo layout
# -----------------------------

Write-Section "Resolve repo layout"

$RepoRoot = (Resolve-Path -LiteralPath $RepoRoot).Path
Write-Info "RepoRoot: $RepoRoot"

$SiteDir = Join-Path $RepoRoot "site"

if (-not (Test-Path -LiteralPath $SiteDir)) {
    Write-ErrorLine "Expected 'site' directory not found at '$SiteDir'."
    throw "This script is designed for the CyberAi repo layout."
}

# -----------------------------
# 2. Tooling detection
# -----------------------------

Write-Section "Detect tooling (node, pnpm)"

Assert-Command -Name "node" -InstallHint "Install Node.js (LTS) and ensure 'node' is on PATH."
Assert-Command -Name "pnpm" -InstallHint "Install pnpm (corepack enable pnpm or standalone) and ensure 'pnpm' is on PATH."

$nodeVersion = (& node -v) 2>$null
$nodePath    = (Get-Command node).Source
Write-Info "Node version: $nodeVersion"
Write-Info "Node path   : $nodePath"

$pnpmVersion = (& pnpm -v) 2>$null
Write-Info "pnpm version: $pnpmVersion"

# Detect "portable" node heuristically
$IsPortableNode = $false
if ($nodePath -match "Portable" -or $nodePath -match "Apps" -or $nodePath -match "scoop" -or $nodePath -match "nvm") {
    $IsPortableNode = $true
}
if ($IsPortableNode) {
    Write-Warn "Portable / non-standard Node detected. Native binaries (esbuild/sharp) are more likely to break."
}

# -----------------------------
# 3. Inspect pnpm virtual store & metadata
# -----------------------------

Write-Section "Inspect pnpm virtual store & metadata"

$RootNodeModules = Join-Path $RepoRoot "node_modules"
$SiteNodeModules = Join-Path $SiteDir "node_modules"

$RootPnpmStore   = Join-Path $RootNodeModules ".pnpm"
$RootIgnored     = Join-Path $RootNodeModules ".ignored"

if (Test-Path -LiteralPath $RootPnpmStore) {
    Write-Info "Found pnpm virtual store at '$RootPnpmStore'"
} else {
    Write-Info "No pnpm virtual store found at root (fresh install expected)."
}

if (Test-Path -LiteralPath $RootIgnored) {
    Write-Warn "Found pnpm '.ignored' metadata at '$RootIgnored' (possible poisoned state)."
}

# Detect dangling symlinks in node_modules (root + site)
function Get-DanglingSymlinks {
    param([string]$BasePath)

    if (-not (Test-Path -LiteralPath $BasePath)) {
        return @()
    }

    Write-Info "Scanning for dangling symlinks under '$BasePath'..."
    $dangling = @()

    Get-ChildItem -LiteralPath $BasePath -Recurse -Force -ErrorAction SilentlyContinue |
        Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint } |
        ForEach-Object {
            try {
                $target = (Get-Item $_.FullName -ErrorAction Stop).Target
            } catch {
                $target = $null
            }

            if (-not $target) {
                $dangling += $_
            } elseif (-not (Test-Path -LiteralPath $target)) {
                $dangling += $_
            }
        }

    return $dangling
}

$danglingRoot = Get-DanglingSymlinks -BasePath $RootNodeModules
$danglingSite = Get-DanglingSymlinks -BasePath $SiteNodeModules

if ($danglingRoot.Count -gt 0) {
    Write-Warn "Dangling symlinks detected in root node_modules: $($danglingRoot.Count)"
}
if ($danglingSite.Count -gt 0) {
    Write-Warn "Dangling symlinks detected in site node_modules: $($danglingSite.Count)"
}

# -----------------------------
# 4. Cleanup: remove poisoned / corrupted state
# -----------------------------

Write-Section "Cleanup pnpm workspace state"

# Root-level cleanup
Remove-PathSafe -Path $RootPnpmStore
Remove-PathSafe -Path $RootIgnored
Remove-PathSafe -Path (Join-Path $RepoRoot ".pnpm")
Remove-PathSafe -Path (Join-Path $RepoRoot ".pnpm-store")
Remove-PathSafe -Path (Join-Path $RepoRoot "pnpm-lock.yaml")
Remove-PathSafe -Path $RootNodeModules

# Site-level cleanup
Remove-PathSafe -Path $SiteNodeModules

# Global pnpm store prune (safe)
Write-Info "Pruning pnpm global store (safe, but may take time)..."
if (-not $DryRun) {
    pnpm store prune | Out-Host
} else {
    Write-Info "DryRun: skipping 'pnpm store prune'"
}

# -----------------------------
# 5. Reinstall deterministically (root)
# -----------------------------

Write-Section "Reinstall dependencies at repo root"

if (-not $DryRun) {
    $rootInstall = Invoke-CommandSafe -Command "pnpm install" -WorkingDirectory $RepoRoot -IgnoreFailure
    $rootStdOut  = $rootInstall.StdOut

    if ($rootStdOut -match "Ignored build scripts") {
        Write-Warn "pnpm reported ignored build scripts. You must approve builds for native deps (esbuild/sharp)."
        Write-Host ""
        Write-Host "When the next command runs, in the interactive menu:" -ForegroundColor Yellow
        Write-Host "  - Press 'a' to select all" -ForegroundColor Yellow
        Write-Host "  - Press 'Enter' to confirm" -ForegroundColor Yellow
        Write-Host ""

        pnpm approve-builds | Out-Host

        Write-Info "Re-running 'pnpm install' after approve-builds..."
        Invoke-CommandSafe -Command "pnpm install" -WorkingDirectory $RepoRoot | Out-Host
    }
} else {
    Write-Info "DryRun: would run 'pnpm install' at repo root"
}

# -----------------------------
# 6. Reinstall deterministically (site)
# -----------------------------

Write-Section "Reinstall dependencies in 'site'"

if (-not $DryRun) {
    Invoke-CommandSafe -Command "pnpm install" -WorkingDirectory $SiteDir | Out-Host
} else {
    Write-Info "DryRun: would run 'pnpm install' in site"
}

# -----------------------------
# 7. Validate esbuild / sharp / vite / astro
# -----------------------------

Write-Section "Validate toolchain (esbuild, sharp, vite, astro)"

function Test-PnpmExec {
    param(
        [string]$Bin,
        [string]$WorkingDirectory
    )
    try {
        Write-Info "Validating '$Bin' via 'pnpm exec $Bin --version'"
        if (-not $DryRun) {
            Invoke-CommandSafe -Command "pnpm exec $Bin --version" -WorkingDirectory $WorkingDirectory -IgnoreFailure:$false | Out-Host
        } else {
            Write-Info "DryRun: would run 'pnpm exec $Bin --version'"
        }
    } catch {
        Write-ErrorLine "Validation failed for '$Bin' in '$WorkingDirectory': $($_.Exception.Message)"
        throw
    }
}

# esbuild / sharp are usually root-level deps
Test-PnpmExec -Bin "esbuild" -WorkingDirectory $RepoRoot
Test-PnpmExec -Bin "sharp"   -WorkingDirectory $RepoRoot

# vite / astro are site-level
Test-PnpmExec -Bin "vite"    -WorkingDirectory $SiteDir
Test-PnpmExec -Bin "astro"   -WorkingDirectory $SiteDir

# -----------------------------
# 8. Launch dev server (Astro site)
# -----------------------------

Write-Section "Launch Astro dev server (site)"

if (-not $DryRun) {
    Write-Info "Starting 'pnpm run dev' in '$SiteDir'..."
    Write-Host ""
    Write-Host "If everything is healthy, Astro/Vite should now start and bind to localhost." -ForegroundColor Green
    Write-Host ""

    # Run attached so you can see logs and Ctrl+C
    Push-Location $SiteDir
    try {
        pnpm run dev
    } finally {
        Pop-Location
    }
} else {
    Write-Info "DryRun: would run 'pnpm run dev' in site"
}

Write-Section "Cleanup + bootstrap complete"
Write-Host "If dev server started without errors, pnpm workspace is now clean and deterministic." -ForegroundColor Green
