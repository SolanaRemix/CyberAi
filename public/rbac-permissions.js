/**
 * CyberAi Client-Side RBAC Permissions
 *
 * CANONICAL DATA SOURCE: src/security/role-permissions.json
 * This file mirrors that JSON so that static HTML pages can load permissions
 * without a build step.  If you change src/security/role-permissions.json
 * you MUST update the sets below to match.
 *
 * Server-side TypeScript consumer: src/security/permissions.ts
 * HTML consumers: app/layout.html, dashboard/layout.html
 */

window.CYBER_RBAC = {
  rolePermissions: {
    admin: new Set([
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
    ]),
    operator: new Set([
      'manage:workflows',
      'manage:contracts',
      'manage:terminal',
      'manage:agent-tools',
      'view:chat',
      'view:docs',
    ]),
    user: new Set(['view:chat', 'view:docs']),
    guest: new Set([]),
  },
};
