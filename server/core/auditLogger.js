/**
 * Audit Logger
 * Records every user action with a structured JSON entry.
 * Log format: { user, action, agent, timestamp }
 */

/**
 * Log a user action to stdout as structured JSON.
 *
 * @param {{ email: string }} user - The acting user.
 * @param {string} action - The action performed (e.g. "run_agent").
 * @param {string} agent - The agent involved (e.g. "builder").
 */
export function logAction(user, action, agent) {
  console.log(
    JSON.stringify({
      user: user.email,
      action,
      agent,
      timestamp: new Date().toISOString(),
    }),
  );
}
