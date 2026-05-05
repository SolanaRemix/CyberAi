/**
 * CyberAI v4 — Enterprise Server
 * Express + Socket.IO server with:
 *   - Orchestrator integration (security AI → agent → audit log)
 *   - RBAC role checking on socket events and REST endpoint
 *   - Structured audit logging (stdout JSON); operational events go to stderr
 *
 * Authentication stub
 * -------------------
 * `resolveUser` / `resolveSocketUser` read an Authorization Bearer token and
 * try to base64url-decode a JSON payload `{ email, role }`.
 *
 * ⚠️  SECURITY WARNING — THIS STUB MUST NOT BE USED IN PRODUCTION:
 *   - The token is decoded but the signature is NEVER verified.
 *   - Any client can forge a token with `{ "email": "x", "role": "admin" }` and
 *     bypass RBAC entirely.
 *   - Replace both helpers with a proper JWT library (e.g. `jsonwebtoken`) that
 *     verifies the signature against a server-side secret before extracting claims.
 *
 * What the stub does provide:
 *   - A real code path for elevated roles so the API is testable end-to-end.
 *   - Support for both server-layer roles (admin/developer/auditor/agent) AND the
 *     canonical web-app roles (admin/operator/user/guest from src/security/roles.ts);
 *     canonical roles are mapped to their server-layer equivalents via CANONICAL_ROLE_MAP.
 *   - A `VALID_ROLES` set that rejects any role string not in either set, which limits
 *     damage if someone sends a non-existent role name.
 *   - An anonymous fallback (`agent`, level 0) for requests with no token, so
 *     unauthenticated callers are still rejected by the RBAC check.
 */

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { handleTask } from './core/orchestrator.js';
import { checkRole } from './core/rbac.js';
import { logAction, setIO } from './core/auditLogger.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Register the io instance with the audit logger so every audit entry is also
// broadcast to the 'admins' Socket.IO room for the live Admin Panel.
setIO(io);

app.use(express.json());

// ─── Role resolution ──────────────────────────────────────────────────────────

/**
 * Mapping from canonical web-app roles (src/security/roles.ts) to server-layer roles.
 * Allows tokens issued by the existing auth system to work with this server's RBAC.
 *   operator → developer  (can execute tasks)
 *   user     → auditor    (read-only)
 *   guest    → agent      (no task access)
 */
const CANONICAL_ROLE_MAP = {
  operator: 'developer',
  user: 'auditor',
  guest: 'agent',
};

/**
 * Set of role strings accepted in bearer tokens — both server-layer roles and
 * canonical web-app roles. Any role value not in this set is discarded and falls
 * back to 'agent'.
 */
const VALID_ROLES = new Set([
  ...Object.keys(CANONICAL_ROLE_MAP), // operator, user, guest  (canonical web-app roles)
  'admin',
  'developer',
  'auditor',
  'agent', // server-layer roles
]);

/**
 * Map a token role to its server-layer equivalent.
 * Canonical roles are converted; server-layer roles pass through unchanged.
 *
 * @param {string} tokenRole
 * @returns {string}
 */
function resolveRole(tokenRole) {
  return CANONICAL_ROLE_MAP[tokenRole] ?? tokenRole;
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

/**
 * Attempt to extract user identity from an Authorization Bearer token.
 * ⚠️  Stub only — token is NOT cryptographically verified.
 * Replace with a real JWT verification library before production use.
 *
 * @param {import('express').Request} req
 * @returns {{ email: string, role: string }}
 */
function resolveUser(req) {
  try {
    const authHeader = req.headers.authorization ?? '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (token) {
      const payload = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
      if (
        typeof payload.email === 'string' &&
        payload.email &&
        typeof payload.role === 'string' &&
        VALID_ROLES.has(payload.role)
      ) {
        return { email: payload.email, role: resolveRole(payload.role) };
      }
    }
  } catch {
    // Invalid / missing token — fall through to anonymous default
  }
  return { email: 'anonymous', role: 'agent' };
}

/**
 * Attempt to extract user identity from a Socket.IO handshake auth token.
 * ⚠️  Stub only — token is NOT cryptographically verified.
 * Replace with a real JWT verification library before production use.
 *
 * @param {import('socket.io').Socket} socket
 * @returns {{ email: string, role: string }}
 */
function resolveSocketUser(socket) {
  try {
    const token = socket.handshake.auth?.token ?? '';
    if (token) {
      const payload = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
      if (
        typeof payload.email === 'string' &&
        payload.email &&
        typeof payload.role === 'string' &&
        VALID_ROLES.has(payload.role)
      ) {
        return { email: payload.email, role: resolveRole(payload.role) };
      }
    }
  } catch {
    // Invalid / missing token — fall through to anonymous default
  }
  return { email: 'anonymous', role: 'agent' };
}

// ─── REST endpoint ────────────────────────────────────────────────────────────

/**
 * POST /api/task
 * Body: { prompt, agent, traceId? }
 * Authorization: Bearer <token>  (stub — see resolveUser above)
 *
 * Response status codes:
 *   200 — Task executed successfully.
 *   400 — Task was blocked by Security AI (body.error = "Task was blocked by security policy").
 *   400 — Agent execution failed   (body.error = "Agent execution failed").
 *         Both prompt-policy failures and agent-level failures use 400 because both are
 *         client-input errors in this API (bad prompt or unknown agent name). Callers can
 *         distinguish the two cases by inspecting the `error` field in the response body.
 *   403 — Caller's role is insufficient (RBAC denial, audit-logged).
 */
app.post('/api/task', async (req, res) => {
  const { prompt, traceId } = req.body;
  // Normalise agent to string-or-null to avoid logging `undefined` in the audit trail
  const agent = typeof req.body.agent === 'string' ? req.body.agent : null;
  const user = resolveUser(req);

  if (!checkRole(user, 'developer')) {
    // Log the denial with the requested agent name so the audit trail shows what was attempted
    logAction(user, 'rbac_denied', agent ?? null, { status: 'error', ip: req.ip });
    return res.status(403).json({ error: 'Insufficient role' });
  }

  const result = await handleTask({
    prompt,
    agent,
    user,
    io,
    socketId: null,
    ip: req.ip,
    traceId: traceId || req.headers['x-trace-id'] || undefined,
  });

  if (result === null) {
    // Security AI blocked the prompt (bad user input)
    return res.status(400).json({ error: 'Task was blocked by security policy' });
  }
  if (result === undefined) {
    // Agent threw during execution
    return res.status(400).json({ error: 'Agent execution failed' });
  }

  res.json({ success: true, result });
});

// ─── Socket.IO ────────────────────────────────────────────────────────────────

io.on('connection', socket => {
  // Operational events go to stderr so they don't pollute the stdout JSON audit stream
  process.stderr.write(JSON.stringify({ event: 'client_connected', socketId: socket.id }) + '\n');

  // Admins join the 'admins' room to receive live audit_log broadcasts for the Admin Panel
  const connectedUser = resolveSocketUser(socket);
  if (connectedUser.role === 'admin') {
    socket.join('admins');
  }

  socket.on('run_task', async data => {
    // Guard: data must be an object (client may emit null or primitive)
    const safeData = data !== null && typeof data === 'object' ? data : {};

    const user = resolveSocketUser(socket);

    if (!checkRole(user, 'developer')) {
      // Log the denial with the requested agent name so the audit trail shows what was attempted
      logAction(user, 'rbac_denied', safeData.agent ?? null, {
        status: 'error',
        socketId: socket.id,
        ip: socket.handshake.address,
      });
      socket.emit('ai_error', 'Insufficient role to run tasks');
      return;
    }

    await handleTask({
      ...safeData,
      user,
      io,
      socketId: socket.id,
      ip: socket.handshake.address,
      traceId: safeData.traceId,
    });
  });

  socket.on('disconnect', () => {
    process.stderr.write(
      JSON.stringify({ event: 'client_disconnected', socketId: socket.id }) + '\n',
    );
  });
});

export { app, server, io };
