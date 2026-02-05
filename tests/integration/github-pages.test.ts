/**
 * Integration tests for GitHub Pages deployment
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const projectRoot = join(__dirname, '../..');

describe('GitHub Pages Configuration', () => {
  it('should have a CNAME file for custom domain', () => {
    const cnamePath = join(projectRoot, 'site/public/CNAME');
    expect(existsSync(cnamePath)).toBe(true);

    const domain = readFileSync(cnamePath, 'utf-8').trim();
    expect(domain).toBe('cyberai.network');
  });

  it('should have GitHub Pages workflow configured', () => {
    const workflowPath = join(projectRoot, '.github/workflows/pages-deploy.yml');
    expect(existsSync(workflowPath)).toBe(true);

    const workflow = readFileSync(workflowPath, 'utf-8');
    expect(workflow).toContain('github-pages');
    expect(workflow).toContain('deploy-pages');
  });

  it('should have Astro config with correct site URL', () => {
    const configPath = join(projectRoot, 'site/astro.config.mjs');
    expect(existsSync(configPath)).toBe(true);

    const config = readFileSync(configPath, 'utf-8');
    expect(config).toContain('https://cyberai.network');
  });

  it('should not have Vercel configuration files', () => {
    const vercelJsonPath = join(projectRoot, 'vercel.json');
    const vercelDirPath = join(projectRoot, '.vercel');

    expect(existsSync(vercelJsonPath)).toBe(false);
    expect(existsSync(vercelDirPath)).toBe(false);
  });

  it('should not have Vercel dependencies in package.json', () => {
    const packagePath = join(projectRoot, 'site/package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const vercelDeps = Object.keys(allDeps).filter(dep => dep.startsWith('@vercel/'));
    expect(vercelDeps).toHaveLength(0);
  });

  it('should have a working vercel-scanner tool', () => {
    const scannerPath = join(projectRoot, 'tools/vercel-scanner.sh');
    expect(existsSync(scannerPath)).toBe(true);

    const scanner = readFileSync(scannerPath, 'utf-8');
    expect(scanner).toContain('Vercel Issue Scanner');
    expect(scanner).toContain('check_vercel_config');
    expect(scanner).toContain('check_vercel_dependencies');
  });
});

describe('Build Configuration', () => {
  it('should have updated version to 1.1.0', () => {
    const packagePath = join(projectRoot, 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));

    expect(packageJson.version).toBe('1.1.0');
  });

  it('should have site package with updated version', () => {
    const sitePackagePath = join(projectRoot, 'site/package.json');
    const sitePackageJson = JSON.parse(readFileSync(sitePackagePath, 'utf-8'));

    expect(sitePackageJson.version).toBe('1.1.0');
  });

  it('should have ESLint v9 configuration', () => {
    const eslintConfigPath = join(projectRoot, 'eslint.config.js');
    expect(existsSync(eslintConfigPath)).toBe(true);

    const config = readFileSync(eslintConfigPath, 'utf-8');
    expect(config).toContain('export default');
  });

  it('should have vitest configuration', () => {
    const vitestConfigPath = join(projectRoot, 'vitest.config.ts');
    expect(existsSync(vitestConfigPath)).toBe(true);
  });
});
