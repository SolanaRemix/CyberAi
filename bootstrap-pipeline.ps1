<#
.SYNOPSIS
    🚀 SolanaRemix Bootstrap: Surgical Loader
    Compiles the Brain and initiates the Protocol in the local context.

.DESCRIPTION
    1. Checks for Rust toolchain (Cargo).
    2. Compiles 'brainctl' locally (Release mode) to ensure latest code is used.
    3. Hydrates the session PATH with the local binary.
    4. Hands off control to 'pipeline.ps1'.

.PARAMETER Fix
    Passes -Fix to the pipeline (Enable Surgeon).

.PARAMETER Rebuild
    Forces a fresh compilation of the brainctl binary.

.EXAMPLE
    .\bootstrap-pipeline.ps1 -Fix -AiAssist
#>

[CmdletBinding()]
param (
    [switch]$Fix = $false,
    [switch]$AiAssist = $false,
    [switch]$Strict = $false,
    [switch]$Rebuild = $false
)

$ErrorActionPreference = "Stop"

# -----------------------------------------------------------------------------
# 🎨 VISUAL STYLES & LOGGING
# -----------------------------------------------------------------------------
function Log-Surgeon ($Type, $Msg) {
    $Color = "Cyan"
    switch ($Type) {
        "INIT"  { $Color = "Magenta" }
        "BUILD" { $Color = "Yellow" }
        "READY" { $Color = "Green" }
        "FAIL"  { $Color = "Red" }
    }
    Write-Host "[$Type] $Msg" -ForegroundColor $Color
}

Write-Host "
   ____        _     _             _      ___  
  |  _ \      | |   | |           | |    / _ \ 
  | |_) | ___ | |__ | |_ _ __ __ _| |   | | | |
  |  _ < / _ \| '_ \| __| '__/ _` | |   | | | |
  | |_) | (_) | |_) | |_| | | (_| | |___| |_| |
  |____/ \___/|_.__/ \__|_|  \__,_|______\___/ 
      SURGEON BOOTSTRAP PROTOCOL v1.0
" -ForegroundColor Cyan

# -----------------------------------------------------------------------------
# PHASE 1: ENVIRONMENT STERILIZATION
# -----------------------------------------------------------------------------
Log-Surgeon "INIT" "Checking sterile field (Dependencies)..."

# 1. Check Root Directory
if (-not (Test-Path "Cargo.toml")) {
    Log-Surgeon "FAIL" "Cargo.toml not found. Execute this from the repository root."
    Exit 1
}

# 2. Check Rust Toolchain
if (-not (Get-Command "cargo" -ErrorAction SilentlyContinue)) {
    Log-Surgeon "FAIL" "Rust toolchain missing. Install via https://rustup.rs"
    Exit 1
}

# -----------------------------------------------------------------------------
# PHASE 2: SYNTHESIZING THE BRAIN (Build)
# -----------------------------------------------------------------------------
$BinPath = ".\target\release"
$ExePath = "$BinPath\brainctl.exe"
$ShouldBuild = $Rebuild -or (-not (Test-Path $ExePath))

if ($ShouldBuild) {
    Log-Surgeon "BUILD" "Compiling Neural Network (brainctl release)..."
    
    # Run Cargo Build
    try {
        & cargo build --release --quiet
        if ($LASTEXITCODE -ne 0) { throw "Compilation failed." }
    } catch {
        Log-Surgeon "FAIL" "Code compilation failed. See rustc errors above."
        Exit 1
    }
} else {
    Log-Surgeon "READY" "Existing binary detected. Skipping build."
}

# -----------------------------------------------------------------------------
# PHASE 3: INJECTION
# -----------------------------------------------------------------------------
Log-Surgeon "INIT" "Injecting local binary into Session PATH..."

# Add local target/release to PATH for this session only
$env:PATH = "$PWD\$BinPath;$env:PATH"

# Verify injection
if (-not (Get-Command "brainctl" -ErrorAction SilentlyContinue)) {
    Log-Surgeon "FAIL" "Injection failed. brainctl not accessible."
    Exit 1
}

$Version = brainctl --version
Log-Surgeon "READY" "Brain loaded: $Version"

# -----------------------------------------------------------------------------
# PHASE 4: OPERATION START
# -----------------------------------------------------------------------------
Log-Surgeon "INIT" "Handing off to Operation Pipeline..."
Write-Host "----------------------------------------------------------------" -ForegroundColor DarkGray

# Forward arguments to the main pipeline
$PipelineArgs = @{}
if ($Fix) { $PipelineArgs["Fix"] = $true }
if ($AiAssist) { $PipelineArgs["AiAssist"] = $true }
if ($Strict) { $PipelineArgs["Strict"] = $true }

# Execute
try {
    .\pipeline.ps1 @PipelineArgs
} catch {
    Log-Surgeon "FAIL" "Operation halted unexpectedly."
    Exit 1
}