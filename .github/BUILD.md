# CyberAi Build System

## Overview
This document describes the full build system for CyberAi, including Docker, Turbo, esbuild, and GitHub Actions.

## Requirements
- Node.js 20+
- npm or pnpm
- Docker
- Turbo

## Build Steps
1. Install dependencies
2. Run typecheck
3. Run tests
4. Build production artifacts
5. Build Docker image

## Docker Build
The project uses a multi-stage Dockerfile with:
- deps stage
- dev-deps stage
- builder stage
- production stage

## GitHub Actions
The repository includes:
- pages-deploy workflow
- advanced-build workflow

## Output Artifacts
- dist/
- build-info.json
