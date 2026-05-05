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
 *   - A `VALID_ROLES` allowlist that rejects any role string not in the set,
 *     which limits damage if someone sends a non-existent role name.
 *   - An anonymous fallback (`agent`, level 0) for requests with no token, so
 *     unauthenticated callers are still rejected by the RBAC check.
 */

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { handleTask } from "./core/orchestrator.js";
import { checkRole } from "./core/rbac.js";
import { logAction } from "./core/auditLogger.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

// Set of roles the auth stub is allowed to grant.
// Any role value not in this set is discarded and falls back to "agent".
const VALID_ROLES = new Set(["admin", "developer", "auditor", "agent"]);

// ─── Auth helpers ────────────────────────────────────────────────────────────

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
    const authHeader = req.headers.authorization ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (token) {
      const payload = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
      if (
        typeof payload.email === "string" &&
        payload.email &&
        typeof payload.role === "string" &&
        VALID_ROLES.has(payload.role)
      ) {
        return { email: payload.email, role: payload.role };
      }
    }
  } catch {
    // Invalid / missing token — fall through to anonymous default
  }
  return { email: "anonymous", role: "agent" };
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
    const token = socket.handshake.auth?.token ?? "";
    if (token) {
      const payload = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
      if (
        typeof payload.email === "string" &&
        payload.email &&
        typeof payload.role === "string" &&
        VALID_ROLES.has(payload.role)
      ) {
        return { email: payload.email, role: payload.role };
      }
    }
  } catch {
    // Invalid / missing token — fall through to anonymous default
  }
  return { email: "anonymous", role: "agent" };
}

// ─── REST endpoint ────────────────────────────────────────────────────────────

/**
 * POST /api/task
 * Body: { prompt, agent, traceId? }
 * Authorization: Bearer <token>  (stub — see resolveUser above)
 */
app.post("/api/task", async (req, res) => {
  const { prompt, agent, traceId } = req.body;
  const user = resolveUser(req);

  if (!checkRole(user, "developer")) {
    logAction(user, "rbac_denied", "rest:/api/task", { status: "error" });
    return res.status(403).json({ error: "Insufficient role" });
  }

  const result = await handleTask({
    prompt,
    agent,
    user,
    io,
    socketId: null,
    ip: req.ip,
    traceId: traceId || req.headers["x-trace-id"] || undefined,
  });

  if (result === undefined) {
    return res.status(400).json({ error: "Task was blocked or failed to execute" });
  }

  res.json({ success: true, result });
});

// ─── Socket.IO ────────────────────────────────────────────────────────────────

io.on("connection", (socket) => {
  // Operational events go to stderr so they don't pollute the stdout JSON audit stream
  process.stderr.write(JSON.stringify({ event: "client_connected", socketId: socket.id }) + "\n");

  socket.on("run_task", async (data) => {
    // Guard: data must be an object (client may emit null or primitive)
    const safeData = data !== null && typeof data === "object" ? data : {};

    const user = resolveSocketUser(socket);

    if (!checkRole(user, "developer")) {
      logAction(user, "rbac_denied", "socket:run_task", {
        status: "error",
        socketId: socket.id,
        ip: socket.handshake.address,
      });
      socket.emit("ai_error", "Insufficient role to run tasks");
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

  socket.on("disconnect", () => {
    process.stderr.write(
      JSON.stringify({ event: "client_disconnected", socketId: socket.id }) + "\n",
    );
  });
});

export { app, server, io };
