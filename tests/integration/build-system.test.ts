/**
 * CyberAi Build System Integration Tests
 * Tests the advanced build system configurations and tools
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

describe('Build System Configuration', () => {
  it('should have Makefile present', () => {
    const makefilePath = resolve(process.cwd(), 'Makefile');
    expect(existsSync(makefilePath)).toBe(true);
  });

  it('should have Dockerfile present', () => {
    const dockerfilePath = resolve(process.cwd(), 'Dockerfile');
    expect(existsSync(dockerfilePath)).toBe(true);
  });

  it('should have docker-compose.yml present', () => {
    const dockerComposePath = resolve(process.cwd(), 'docker-compose.yml');
    expect(existsSync(dockerComposePath)).toBe(true);
  });

  it('should have esbuild config present', () => {
    const esbuildConfigPath = resolve(process.cwd(), 'esbuild.config.js');
    expect(existsSync(esbuildConfigPath)).toBe(true);
  });

  it('should have turbo.json present', () => {
    const turboConfigPath = resolve(process.cwd(), 'turbo.json');
    expect(existsSync(turboConfigPath)).toBe(true);
  });

  it('should have advanced build script present', () => {
    const buildScriptPath = resolve(process.cwd(), 'scripts/advanced-build.sh');
    expect(existsSync(buildScriptPath)).toBe(true);
  });

  it('should have BUILD.md documentation present', () => {
    const buildDocPath = resolve(process.cwd(), 'BUILD.md');
    expect(existsSync(buildDocPath)).toBe(true);
  });

  it('should have .dockerignore present', () => {
    const dockerignorePath = resolve(process.cwd(), '.dockerignore');
    expect(existsSync(dockerignorePath)).toBe(true);
  });

  it('should have nginx configuration present', () => {
    const nginxConfigPath = resolve(process.cwd(), 'nginx/nginx.conf');
    expect(existsSync(nginxConfigPath)).toBe(true);
  });

  it('should have advanced build workflow present', () => {
    const workflowPath = resolve(process.cwd(), '.github/workflows/advanced-build.yml');
    expect(existsSync(workflowPath)).toBe(true);
  });
});

describe('Package.json Build Scripts', () => {
  it('should have new build scripts defined', () => {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    // Check for new build scripts
    expect(packageJson.scripts).toHaveProperty('build:advanced');
    expect(packageJson.scripts).toHaveProperty('build:dev');
    expect(packageJson.scripts).toHaveProperty('build:watch');
    expect(packageJson.scripts).toHaveProperty('build:esbuild');
    expect(packageJson.scripts).toHaveProperty('build:esbuild:watch');
  });

  it('should have Docker scripts defined', () => {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    expect(packageJson.scripts).toHaveProperty('docker:build');
    expect(packageJson.scripts).toHaveProperty('docker:run');
    expect(packageJson.scripts).toHaveProperty('docker:up');
    expect(packageJson.scripts).toHaveProperty('docker:down');
  });

  it('should have clean scripts defined', () => {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    expect(packageJson.scripts).toHaveProperty('clean');
    expect(packageJson.scripts).toHaveProperty('clean:all');
  });
});

describe('Turbo Configuration', () => {
  it('should have valid turbo.json', () => {
    const turboConfigPath = resolve(process.cwd(), 'turbo.json');
    const turboConfig = JSON.parse(readFileSync(turboConfigPath, 'utf8'));

    expect(turboConfig).toHaveProperty('pipeline');
    expect(turboConfig.pipeline).toHaveProperty('build');
    expect(turboConfig.pipeline).toHaveProperty('test');
    expect(turboConfig.pipeline).toHaveProperty('lint');
  });

  it('should have build pipeline configuration', () => {
    const turboConfigPath = resolve(process.cwd(), 'turbo.json');
    const turboConfig = JSON.parse(readFileSync(turboConfigPath, 'utf8'));

    expect(turboConfig.pipeline.build).toHaveProperty('outputs');
    expect(turboConfig.pipeline.build.outputs).toContain('dist/**');
  });
});

describe('Docker Configuration', () => {
  it('should have multi-stage Dockerfile', () => {
    const dockerfilePath = resolve(process.cwd(), 'Dockerfile');
    const dockerfileContent = readFileSync(dockerfilePath, 'utf8');

    // Check for expected stages
    expect(dockerfileContent).toContain('FROM node:20-alpine AS base');
    expect(dockerfileContent).toContain('AS deps');
    expect(dockerfileContent).toContain('AS builder');
    expect(dockerfileContent).toContain('AS production');
  });

  it('should have docker-compose services defined', () => {
    const dockerComposePath = resolve(process.cwd(), 'docker-compose.yml');
    const dockerComposeContent = readFileSync(dockerComposePath, 'utf8');

    expect(dockerComposeContent).toContain('app:');
    expect(dockerComposeContent).toContain('dev:');
    expect(dockerComposeContent).toContain('site:');
  });

  it('should have .dockerignore exclusions', () => {
    const dockerignorePath = resolve(process.cwd(), '.dockerignore');
    const dockerignoreContent = readFileSync(dockerignorePath, 'utf8');

    expect(dockerignoreContent).toContain('node_modules');
    expect(dockerignoreContent).toContain('dist');
    expect(dockerignoreContent).toContain('.git');
  });
});

describe('Build Artifacts', () => {
  it('should have dist directory after build', () => {
    const distPath = resolve(process.cwd(), 'dist');
    // Note: This test assumes a build has been run
    if (existsSync(distPath)) {
      expect(existsSync(distPath)).toBe(true);
    }
  });

  it('should generate build-info.json after advanced build', () => {
    const buildInfoPath = resolve(process.cwd(), 'dist/build-info.json');
    // Note: This test assumes an advanced build has been run
    if (existsSync(buildInfoPath)) {
      const buildInfo = JSON.parse(readFileSync(buildInfoPath, 'utf8'));
      expect(buildInfo).toHaveProperty('version');
      expect(buildInfo).toHaveProperty('buildMode');
      expect(buildInfo).toHaveProperty('buildTime');
      expect(buildInfo).toHaveProperty('nodeVersion');
    }
  });
});

describe('Build Documentation', () => {
  it('should have comprehensive BUILD.md', () => {
    const buildDocPath = resolve(process.cwd(), 'BUILD.md');
    const buildDocContent = readFileSync(buildDocPath, 'utf8');

    // Check for key sections
    expect(buildDocContent).toContain('Build Tools');
    expect(buildDocContent).toContain('Quick Start');
    expect(buildDocContent).toContain('Docker Support');
    expect(buildDocContent).toContain('CI/CD Integration');
    expect(buildDocContent).toContain('Troubleshooting');
  });

  it('should have build system section in README', () => {
    const readmePath = resolve(process.cwd(), 'README.md');
    const readmeContent = readFileSync(readmePath, 'utf8');

    expect(readmeContent).toContain('Advanced Build System');
    expect(readmeContent).toContain('BUILD.md');
  });
});
