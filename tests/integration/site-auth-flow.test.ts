import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const projectRoot = join(__dirname, '../..');

describe('Site auth and dashboard UX flows', () => {
  it('implements client-side session login with role routing', () => {
    const loginPage = readFileSync(join(projectRoot, 'site/src/pages/login.astro'), 'utf-8');
    expect(loginPage).toContain('window.CYBERAI_AUTH');
    expect(loginPage).toContain('redirectAfterAuth');
    expect(loginPage).toContain('isAdminCredentials');
    expect(loginPage).toContain('persistSession');
    expect(loginPage).toContain("searchParams.get('switch') === '1'");
  });

  it('gates dashboard access and reveals admin panel by role', () => {
    const dashboardPage = readFileSync(
      join(projectRoot, 'site/src/pages/dashboard.astro'),
      'utf-8',
    );
    expect(dashboardPage).toContain('id="auth-required"');
    expect(dashboardPage).toContain('id="dashboard-content"');
    expect(dashboardPage).toContain('id="admin-panel"');
    expect(dashboardPage).toContain('getRoleForSession');
    expect(dashboardPage).toContain('/login?switch=1');
    expect(dashboardPage).toContain("searchParams.get('section') === 'admin'");
  });

  it('centralizes auth session logic in shared helper script', () => {
    const authHelper = readFileSync(join(projectRoot, 'site/public/auth-session.js'), 'utf-8');
    expect(authHelper).toContain("SESSION_KEY = 'cyberai.auth.session.v1'");
    expect(authHelper).toContain('isAdminCredentials');
    expect(authHelper).toContain('getRoleForSession');
    expect(authHelper).toContain('DEMO_AUTH_NOTICE');
    expect(authHelper).toContain('safeGetItem');
  });

  it('adds neo flash glow utility for global UI effects', () => {
    const neoGlowFx = readFileSync(join(projectRoot, 'site/public/neo-glow-fx.css'), 'utf-8');
    expect(neoGlowFx).toContain('@keyframes neo-flash-glow');
    expect(neoGlowFx).toContain('.neo-flash-glow');
  });
});
