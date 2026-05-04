/**
 * CyberAI v4 — Enterprise Server
 * Express + Socket.IO server with:
 *   - Orchestrator integration (security AI → agent → audit log)
 *   - RBAC role checking on socket events
 *   - REST task endpoint
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

/**
 * REST endpoint: POST /api/task
 * Body: { prompt, agent, user? }
 */
app.post("/api/task", async (req, res) => {
  const { prompt, agent } = req.body;
  // NOTE: Replace with real JWT decoding in production.
  // Default to the 'agent' service-level role (level 0) so unauthenticated
  // callers are denied all user-level actions until JWT auth is in place.
  const user = { email: "anonymous", role: "agent" };

  if (!checkRole(user, "developer")) {
    return res.status(403).json({ error: "Insufficient role" });
  }

  const result = await handleTask({ prompt, agent, user, io, socketId: null, ip: req.ip });
  res.json({ success: true, result });
});

/**
 * Socket.IO — real-time task execution
 */
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("run_task", async (data) => {
    // NOTE: Replace with real JWT decoding from socket handshake auth in production.
    // Never trust a role supplied by the client; default to service-level 'agent'
    // role (level 0) so unauthenticated sockets are denied all user-level tasks.
    const user = { email: "anonymous", role: "agent" };

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
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => {
  console.log(`🚀 CyberAI v4 running on http://localhost:${PORT}`);
});

export { app, server, io };
