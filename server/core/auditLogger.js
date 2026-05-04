/**
 * Audit Logger
 * Records every user action with a structured JSON entry.
 * Log format: { user, action, agent, timestamp, traceId, socketId, ip }
 *
 * The optional `context` parameter enriches log entries with trace information
 * that improves observability in production (log correlation, incident response).
 */

/**
 * Log a user action to stdout as structured JSON.
 *
 * @param {{ email: string }} user - The acting user.
 * @param {string} action - The action performed (e.g. "run_agent").
 * @param {string} agent - The agent involved (e.g. "builder").
 * @param {{ socketId?: string, ip?: string, traceId?: string }} [context] - Optional trace context.
 */
export function logAction(user, action, agent, context = {}) {
  console.log(
    JSON.stringify({
      user: user.email,
      action,
      agent,
      timestamp: new Date().toISOString(),
      ...(context.traceId !== undefined && { traceId: context.traceId }),
      ...(context.socketId !== undefined && { socketId: context.socketId }),
      ...(context.ip !== undefined && { ip: context.ip }),
    }),
  );
}
