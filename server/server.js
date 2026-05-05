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
 * ⚠️  THIS IS NOT SECURE — the token signature is NOT verified.
 * Replace both helpers with proper JWT verification before any production use.
 *
 * The important property this stub provides: there IS a code path for callers
 * with elevated roles (developer / admin) to pass the RBAC check.  An
 * unauthenticated request still falls back to the `agent` role (level 0)
 * which is below the `developer` minimum, so unauthenticated callers are
 * still rejected.
 */

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { handleTask } from "./core/orchestrator.js";
import { checkRole } from "./core/rbac.js";

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
    const user = resolveSocketUser(socket);

    if (!checkRole(user, "developer")) {
      socket.emit("ai_error", "Insufficient role to run tasks");
      return;
    }

    await handleTask({
      ...data,
      user,
      io,
      socketId: socket.id,
      ip: socket.handshake.address,
      traceId: data.traceId,
    });
  });

  socket.on("disconnect", () => {
    process.stderr.write(
      JSON.stringify({ event: "client_disconnected", socketId: socket.id }) + "\n",
    );
  });
});

export { app, server, io };
