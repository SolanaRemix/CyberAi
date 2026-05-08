/**
 * Audit Logger
 * Records every user action with a structured JSON entry.
 *
 * Log format:
 *   { user, action, agent, status, durationMs, timestamp, [socketId], [ip], [traceId] }
 *
 * - `status`     — "success", "error", or "blocked":
 *                    "success" = agent executed normally
 *                    "error"   = agent threw during execution
 *                    "blocked" = Security AI rejected the prompt before execution
 * - `durationMs` — wall-clock time (ms) the agent took to execute; 0 for blocked tasks.
 * - Trace fields (socketId, ip, traceId) are included only when provided, keeping logs lean
 *   for callers that do not have that context (e.g. background jobs).
 * - Admin socket broadcast: when `setIO()` has been called, every audit entry is also emitted
 *   as an 'audit_log' event to the 'admins' Socket.IO room so the live Admin Panel can
 *   display entries in real time.
 */

/** @type {import('socket.io').Server|null} */
let _io = null;

/**
 * Register the Socket.IO server instance so audit entries are also broadcast
 * to the 'admins' room for the live Admin Panel.
 *
 * @param {import('socket.io').Server | null} ioInstance
 */
export function setIO(ioInstance) {
  _io = ioInstance;
}

/**
 * Log a user action to stdout as structured JSON.
 * When a Socket.IO server has been registered via setIO(), the entry is also
 * emitted as an 'audit_log' event to the 'admins' room.
 *
 * @param {{ email: string }} user - The acting user.
 * @param {string} action - The action performed (e.g. "run_agent").
 * @param {string|null} agent - The agent involved (e.g. "builder"), or null when no agent was dispatched.
 * @param {{ status?: "success"|"error"|"blocked", durationMs?: number, socketId?: string, ip?: string, traceId?: string }} [context] - Execution context.
 */
export function logAction(user, action, agent, context = {}) {
  // Only include context fields that have a defined value to keep logs clean
  const traceFields = Object.fromEntries(
    Object.entries(context).filter(([, v]) => v !== undefined)
  );

  const entry = {
    user: user.email,
    action,
    agent,
    status: context.status ?? 'success',
    durationMs: context.durationMs ?? 0,
    timestamp: new Date().toISOString(),
    ...traceFields,
  };

  console.log(JSON.stringify(entry));

  // Broadcast to admin sockets for live panel — no-op when _io is null or no admins are connected
  if (_io) {
    _io.to('admins').emit('audit_log', entry);
  }
}
