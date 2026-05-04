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
  // In production replace this stub with real JWT decoding
  const user = req.body.user ?? { email: "demo@cyberai", role: "admin" };

  if (!checkRole(user, "developer")) {
    return res.status(403).json({ error: "Insufficient role" });
  }

  const result = await handleTask({ prompt, agent, user, io, socketId: null });
  res.json({ success: true, result });
});

/**
 * Socket.IO — real-time task execution
 */
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("run_task", async (data) => {
    // In production replace this stub with real JWT decoding from socket handshake
    const user = data.user ?? { email: "demo@cyberai", role: "admin" };

    if (!checkRole(user, "developer")) {
      socket.emit("ai_error", "Insufficient role to run tasks");
      return;
    }

    await handleTask({
      ...data,
      user,
      io,
      socketId: socket.id,
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
