/**
 * Unit tests for the RBAC system: roles, permissions, and guards.
 */

import { describe, it, expect } from 'vitest';
import { Role } from '../../src/security/roles.js';
import { hasPermission } from '../../src/security/permissions.js';
import type { Action } from '../../src/security/permissions.js';
import {
  canAccessRoute,
  canUseFeature,
  getUnauthorizedRedirect,
  assertRouteAccess,
  ROUTE_REQUIREMENTS,
  FEATURE_REQUIREMENTS,
} from '../../src/security/guards.js';

// ────────────────────────────────────────────────────────────
// roles.ts
// ────────────────────────────────────────────────────────────

describe('Role enum', () => {
  it('should have admin, operator, user, and guest values', () => {
    expect(Role.Admin).toBe('admin');
    expect(Role.Operator).toBe('operator');
    expect(Role.User).toBe('user');
    expect(Role.Guest).toBe('guest');
  });
});

// ────────────────────────────────────────────────────────────
// permissions.ts
// ────────────────────────────────────────────────────────────

describe('hasPermission — Admin', () => {
  const adminActions: Action[] = [
    'view:agents',
    'view:repos',
    'view:logs',
    'view:dashboards',
    'view:chat',
    'view:docs',
    'manage:deploy',
    'manage:workflows',
    'manage:contracts',
    'manage:terminal',
    'manage:agent-tools',
    'admin:all',
  ];

  for (const action of adminActions) {
    it(`should grant admin '${action}'`, () => {
      expect(hasPermission(Role.Admin, action)).toBe(true);
    });
  }
});

describe('hasPermission — Operator', () => {
  const grantedActions: Action[] = [
    'manage:workflows',
    'manage:contracts',
    'manage:terminal',
    'manage:agent-tools',
    'view:chat',
    'view:docs',
  ];
  const deniedActions: Action[] = [
    'view:agents',
    'view:repos',
    'view:logs',
    'view:dashboards',
    'manage:deploy',
    'admin:all',
  ];

  for (const action of grantedActions) {
    it(`should grant operator '${action}'`, () => {
      expect(hasPermission(Role.Operator, action)).toBe(true);
    });
  }

  for (const action of deniedActions) {
    it(`should deny operator '${action}'`, () => {
      expect(hasPermission(Role.Operator, action)).toBe(false);
    });
  }
});

describe('hasPermission — User', () => {
  it('should grant user view:chat', () => {
    expect(hasPermission(Role.User, 'view:chat')).toBe(true);
  });

  it('should grant user view:docs', () => {
    expect(hasPermission(Role.User, 'view:docs')).toBe(true);
  });

  const deniedActions: Action[] = [
    'view:agents',
    'view:repos',
    'view:logs',
    'view:dashboards',
    'manage:deploy',
    'manage:workflows',
    'manage:contracts',
    'manage:terminal',
    'manage:agent-tools',
    'admin:all',
  ];

  for (const action of deniedActions) {
    it(`should deny user '${action}'`, () => {
      expect(hasPermission(Role.User, action)).toBe(false);
    });
  }
});

describe('hasPermission — Guest', () => {
  const allActions: Action[] = [
    'view:agents',
    'view:repos',
    'view:logs',
    'view:dashboards',
    'view:chat',
    'view:docs',
    'manage:deploy',
    'manage:workflows',
    'manage:contracts',
    'manage:terminal',
    'manage:agent-tools',
    'admin:all',
  ];

  for (const action of allActions) {
    it(`should deny guest '${action}'`, () => {
      expect(hasPermission(Role.Guest, action)).toBe(false);
    });
  }
});

// ────────────────────────────────────────────────────────────
// guards.ts — ROUTE_REQUIREMENTS
// ────────────────────────────────────────────────────────────

describe('ROUTE_REQUIREMENTS', () => {
  it('should map /dashboard to view:dashboards', () => {
    expect(ROUTE_REQUIREMENTS.get('/dashboard')).toBe('view:dashboards');
  });

  it('should map /dashboard/admin to admin:all', () => {
    expect(ROUTE_REQUIREMENTS.get('/dashboard/admin')).toBe('admin:all');
  });

  it('should map /app to view:chat', () => {
    expect(ROUTE_REQUIREMENTS.get('/app')).toBe('view:chat');
  });
});

describe('FEATURE_REQUIREMENTS', () => {
  it('should map agent-management to view:agents', () => {
    expect(FEATURE_REQUIREMENTS.get('agent-management')).toBe('view:agents');
  });

  it('should map admin-panel to admin:all', () => {
    expect(FEATURE_REQUIREMENTS.get('admin-panel')).toBe('admin:all');
  });
});

// ────────────────────────────────────────────────────────────
// guards.ts — canAccessRoute
// ────────────────────────────────────────────────────────────

describe('canAccessRoute', () => {
  it('admin can access all protected routes', () => {
    expect(canAccessRoute(Role.Admin, '/dashboard')).toBe(true);
    expect(canAccessRoute(Role.Admin, '/dashboard/admin')).toBe(true);
    expect(canAccessRoute(Role.Admin, '/dashboard/logs')).toBe(true);
    expect(canAccessRoute(Role.Admin, '/operators')).toBe(true);
    expect(canAccessRoute(Role.Admin, '/app')).toBe(true);
  });

  it('operator can access workflow and contract routes', () => {
    expect(canAccessRoute(Role.Operator, '/operators')).toBe(true);
    expect(canAccessRoute(Role.Operator, '/dashboard/workflows')).toBe(true);
    expect(canAccessRoute(Role.Operator, '/app')).toBe(true);
  });

  it('operator cannot access admin-only routes', () => {
    expect(canAccessRoute(Role.Operator, '/dashboard/admin')).toBe(false);
    expect(canAccessRoute(Role.Operator, '/dashboard')).toBe(false);
    expect(canAccessRoute(Role.Operator, '/dashboard/logs')).toBe(false);
  });

  it('user can only access /app (chat)', () => {
    expect(canAccessRoute(Role.User, '/app')).toBe(true);
  });

  it('user cannot access protected dashboard routes', () => {
    expect(canAccessRoute(Role.User, '/dashboard')).toBe(false);
    expect(canAccessRoute(Role.User, '/operators')).toBe(false);
    expect(canAccessRoute(Role.User, '/audit')).toBe(false);
  });

  it('guest cannot access any protected routes', () => {
    expect(canAccessRoute(Role.Guest, '/app')).toBe(false);
    expect(canAccessRoute(Role.Guest, '/dashboard')).toBe(false);
    expect(canAccessRoute(Role.Guest, '/operators')).toBe(false);
    expect(canAccessRoute(Role.Guest, '/audit')).toBe(false);
    expect(canAccessRoute(Role.Guest, '/dashboard/admin')).toBe(false);
  });

  it('guest can access public (unlisted) routes', () => {
    expect(canAccessRoute(Role.Guest, '/')).toBe(true);
    expect(canAccessRoute(Role.Guest, '/docs')).toBe(true);
    expect(canAccessRoute(Role.Guest, '/pricing')).toBe(true);
  });

  it('public routes (not listed) are always accessible', () => {
    expect(canAccessRoute(Role.User, '/')).toBe(true);
    expect(canAccessRoute(Role.User, '/docs')).toBe(true);
    expect(canAccessRoute(Role.User, '/pricing')).toBe(true);
  });
});

// ────────────────────────────────────────────────────────────
// guards.ts — canUseFeature
// ────────────────────────────────────────────────────────────

describe('canUseFeature', () => {
  it('admin can use all features', () => {
    expect(canUseFeature(Role.Admin, 'agent-management')).toBe(true);
    expect(canUseFeature(Role.Admin, 'admin-panel')).toBe(true);
    expect(canUseFeature(Role.Admin, 'deploy-controls')).toBe(true);
  });

  it('operator can use workflow and contract features', () => {
    expect(canUseFeature(Role.Operator, 'workflow-execution')).toBe(true);
    expect(canUseFeature(Role.Operator, 'contract-management')).toBe(true);
    expect(canUseFeature(Role.Operator, 'terminal-access')).toBe(true);
    expect(canUseFeature(Role.Operator, 'chat-authenticated')).toBe(true);
  });

  it('operator cannot use admin features', () => {
    expect(canUseFeature(Role.Operator, 'admin-panel')).toBe(false);
    expect(canUseFeature(Role.Operator, 'deploy-controls')).toBe(false);
    expect(canUseFeature(Role.Operator, 'agent-management')).toBe(false);
  });

  it('user can use only chat feature', () => {
    expect(canUseFeature(Role.User, 'chat-authenticated')).toBe(true);
    expect(canUseFeature(Role.User, 'agent-management')).toBe(false);
    expect(canUseFeature(Role.User, 'workflow-execution')).toBe(false);
  });

  it('guest cannot use any feature', () => {
    expect(canUseFeature(Role.Guest, 'chat-authenticated')).toBe(false);
    expect(canUseFeature(Role.Guest, 'agent-management')).toBe(false);
    expect(canUseFeature(Role.Guest, 'workflow-execution')).toBe(false);
    expect(canUseFeature(Role.Guest, 'admin-panel')).toBe(false);
    expect(canUseFeature(Role.Guest, 'repo-viewer')).toBe(false);
  });

  it('unknown feature key is always denied', () => {
    expect(canUseFeature(Role.Admin, 'nonexistent-feature')).toBe(false);
    expect(canUseFeature(Role.User, 'nonexistent-feature')).toBe(false);
  });
});

// ────────────────────────────────────────────────────────────
// guards.ts — getUnauthorizedRedirect
// ────────────────────────────────────────────────────────────

describe('getUnauthorizedRedirect', () => {
  it('returns unauthorized redirect for User role', () => {
    const redirect = getUnauthorizedRedirect(Role.User);
    expect(redirect).toContain('/login');
    expect(redirect).toContain('unauthorized');
  });

  it('returns unauthorized redirect for Guest role', () => {
    const redirect = getUnauthorizedRedirect(Role.Guest);
    expect(redirect).toContain('/login');
    expect(redirect).toContain('unauthorized');
  });

  it('returns insufficient-permissions redirect for Admin/Operator', () => {
    const adminRedirect = getUnauthorizedRedirect(Role.Admin);
    expect(adminRedirect).toContain('/login');
    expect(adminRedirect).toContain('insufficient-permissions');

    const operatorRedirect = getUnauthorizedRedirect(Role.Operator);
    expect(operatorRedirect).toContain('/login');
    expect(operatorRedirect).toContain('insufficient-permissions');
  });
});

// ────────────────────────────────────────────────────────────
// guards.ts — assertRouteAccess
// ────────────────────────────────────────────────────────────

describe('assertRouteAccess', () => {
  it('does not throw when access is allowed', () => {
    expect(() => assertRouteAccess(Role.Admin, '/dashboard/admin')).not.toThrow();
    expect(() => assertRouteAccess(Role.User, '/app')).not.toThrow();
    expect(() => assertRouteAccess(Role.User, '/pricing')).not.toThrow();
  });

  it('throws when access is denied', () => {
    expect(() => assertRouteAccess(Role.User, '/dashboard')).toThrow();
    expect(() => assertRouteAccess(Role.Operator, '/dashboard/admin')).toThrow();
    expect(() => assertRouteAccess(Role.User, '/audit')).toThrow();
    expect(() => assertRouteAccess(Role.Guest, '/app')).toThrow();
    expect(() => assertRouteAccess(Role.Guest, '/dashboard')).toThrow();
  });

  it('error message includes role and path', () => {
    expect(() => assertRouteAccess(Role.User, '/dashboard')).toThrow(/user/i);
    expect(() => assertRouteAccess(Role.User, '/dashboard')).toThrow(/dashboard/);
  });
});
