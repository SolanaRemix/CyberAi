/**
 * Agent Orchestrator
 * Manages the full task lifecycle:
 *   1. Security AI validation
 *   2. Agent execution
 *   3. Audit logging (with trace context)
 */

import { validateTask } from "../security/securityAI.js";
import { runAgent } from "../services/aiService.js";
import { logAction } from "./auditLogger.js";

/**
 * Handle an incoming task by running it through the security layer,
 * executing the requested agent, and recording the action in the audit log.
 *
 * @param {{ prompt: string, agent: string, user: object, io: object, socketId: string|null, ip?: string }} params
 * @returns {Promise<string|undefined>} Agent result, or undefined when blocked.
 */
export async function handleTask({ prompt, agent, user, io, socketId, ip }) {
  // 1. Security Check
  const security = await validateTask(prompt, user);
  if (!security.allowed) {
    if (socketId) {
      io.to(socketId).emit("ai_error", security.reason);
    }
    return;
  }

  // 2. Execute Agent
  const result = await runAgent(prompt, agent, io, socketId);

  // 3. Audit Log — include trace context for observability
  logAction(user, "run_agent", agent, { socketId: socketId || undefined, ip });

  return result;
}
