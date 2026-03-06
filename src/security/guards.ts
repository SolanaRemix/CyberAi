/**
 * RBAC Route and Feature Guards
 * Maps routes and features to required actions, and provides guard helpers.
 */

import { Role } from './roles.js';
import { type Action, hasPermission } from './permissions.js';

/**
 * Maps site paths to the Action required to access them.
 * Paths not listed here are treated as publicly accessible.
 */
export const ROUTE_REQUIREMENTS: ReadonlyMap<string, Action> = new Map([
  ['/dashboard', 'view:dashboards'],
  ['/dashboard/agents', 'view:agents'],
  ['/dashboard/contracts', 'manage:contracts'],
  ['/dashboard/workflows', 'manage:workflows'],
  ['/dashboard/logs', 'view:logs'],
  ['/dashboard/settings', 'manage:deploy'],
  ['/dashboard/admin', 'admin:all'],
  ['/operators', 'manage:workflows'],
  ['/audit', 'view:logs'],
  ['/app', 'view:chat'],
]);

/**
 * Maps UI feature keys to the Action required to use them.
 * Unknown feature keys default to denied.
 */
export const FEATURE_REQUIREMENTS: ReadonlyMap<string, Action> = new Map([
  ['agent-management', 'view:agents'],
  ['workflow-execution', 'manage:workflows'],
  ['contract-management', 'manage:contracts'],
  ['terminal-access', 'manage:terminal'],
  ['admin-panel', 'admin:all'],
  ['chat-authenticated', 'view:chat'],
  ['deploy-controls', 'manage:deploy'],
  ['log-viewer', 'view:logs'],
  ['repo-viewer', 'view:repos'],
]);

/**
 * Returns true when `role` has the required action for the given path.
 * Public routes (not in ROUTE_REQUIREMENTS) always return true.
 */
export function canAccessRoute(role: Role, path: string): boolean {
  const required = ROUTE_REQUIREMENTS.get(path);
  if (required === undefined) return true;
  return hasPermission(role, required);
}

/**
 * Returns true when `role` is allowed to use a named UI feature.
 * Unknown feature keys are treated as denied.
 */
export function canUseFeature(role: Role, feature: string): boolean {
  const required = FEATURE_REQUIREMENTS.get(feature);
  if (required === undefined) return false;
  return hasPermission(role, required);
}

/**
 * Returns the redirect URL for a role that attempts to access a
 * resource it is not authorized for.
 */
export function getUnauthorizedRedirect(role: Role): string {
  if (role === Role.Guest || role === Role.User) {
    return '/login?reason=unauthorized';
  }
  return '/login?reason=insufficient-permissions';
}

/**
 * Asserts that `role` can access `path`.
 * Throws an error (suitable for server-side guard middleware) if not.
 */
export function assertRouteAccess(role: Role, path: string): void {
  if (!canAccessRoute(role, path)) {
    throw new Error(`Role '${role}' is not authorized to access '${path}'`);
  }
}
