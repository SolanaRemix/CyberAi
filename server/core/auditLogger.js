/**
 * Audit Logger
 * Records every user action with a structured JSON entry.
 *
 * Log format:
 *   { user, action, agent, status, durationMs, timestamp, [socketId], [ip], [traceId] }
 *
 * - `status`     — "success" or "error" so that every log entry is queryable by outcome.
 * - `durationMs` — wall-clock time (ms) the agent took to execute; helps spot latency regressions.
 * - Trace fields (socketId, ip, traceId) are included only when provided, keeping logs lean
 *   for callers that do not have that context (e.g. background jobs).
 */

/**
 * Log a user action to stdout as structured JSON.
 *
 * @param {{ email: string }} user - The acting user.
 * @param {string} action - The action performed (e.g. "run_agent").
 * @param {string} agent - The agent involved (e.g. "builder").
 * @param {{ status?: "success"|"error"|"blocked", durationMs?: number, socketId?: string, ip?: string, traceId?: string }} [context] - Execution context.
 */
export function logAction(user, action, agent, context = {}) {
  // Only include context fields that have a defined value to keep logs clean
  const traceFields = Object.fromEntries(
    Object.entries(context).filter(([, v]) => v !== undefined),
  );

  console.log(
    JSON.stringify({
      user: user.email,
      action,
      agent,
      status: context.status ?? "success",
      durationMs: context.durationMs ?? 0,
      timestamp: new Date().toISOString(),
      ...traceFields,
    }),
  );
}
