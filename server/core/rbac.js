/**
 * Role-Based Access Control (RBAC)
 * Defines the role hierarchy and provides a check helper.
 *
 * Hierarchy (higher number = more privilege):
 *   admin     → 3
 *   developer → 2
 *   auditor   → 1
 *   agent     → 0  (service-level identity; cannot perform user actions)
 */

const ROLE_HIERARCHY = {
  admin: 3,
  developer: 2,
  auditor: 1,
  agent: 0,
};

/**
 * Return true when the user's role meets or exceeds the required role.
 *
 * @param {{ role: string }} user - The user object containing a `role` field.
 * @param {string} requiredRole - The minimum role required to perform the action.
 * @returns {boolean}
 */
export function checkRole(user, requiredRole) {
  const userLevel = ROLE_HIERARCHY[user.role] ?? -1;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? Infinity;
  return userLevel >= requiredLevel;
}
