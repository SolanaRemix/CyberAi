/**
 * RBAC Permissions
 * Defines actions and permission checks for each role.
 *
 * CANONICAL DATA SOURCE: src/security/role-permissions.json
 * The client-side copy in public/rbac-permissions.js is generated from the
 * same JSON file.  Update role-permissions.json to change permissions —
 * do NOT edit the three copies independently.
 */

import { Role } from './roles.js';
import rolePermissionsData from './role-permissions.json' with { type: 'json' };

export type Action =
  | 'view:agents'
  | 'view:repos'
  | 'view:logs'
  | 'view:dashboards'
  | 'view:chat'
  | 'view:docs'
  | 'manage:deploy'
  | 'manage:workflows'
  | 'manage:contracts'
  | 'manage:terminal'
  | 'manage:agent-tools'
  | 'admin:all';

const ROLE_PERMISSIONS: Record<Role, ReadonlySet<Action>> = {
  [Role.Admin]: new Set<Action>(rolePermissionsData.admin as Action[]),
  [Role.Operator]: new Set<Action>(rolePermissionsData.operator as Action[]),
  [Role.User]: new Set<Action>(rolePermissionsData.user as Action[]),
};

/**
 * Check whether a given role has permission to perform an action.
 */
export function hasPermission(role: Role, action: Action): boolean {
  return ROLE_PERMISSIONS[role].has(action);
}
