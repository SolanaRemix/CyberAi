/**
 * Agent Orchestrator
 * Manages the full task lifecycle:
 *   1. Security AI validation (fail-closed: any block stops execution)
 *   2. Agent execution (timed; errors are caught and logged)
 *   3. Audit logging (always fires with status + duration)
 */

import { validateTask } from '../security/securityAI.js';
import { runAgent } from '../services/aiService.js';
import { logAction } from './auditLogger.js';

/**
 * Handle an incoming task by running it through the security layer,
 * executing the requested agent, and recording the action in the audit log.
 * The audit log always fires — on success, agent errors, AND blocked tasks —
 * so every execution attempt is traceable.
 *
 * @param {{ prompt: string, agent: string, user: object, io: object, socketId: string|null, ip?: string, traceId?: string }} params
 * @returns {Promise<string|null|undefined>} Agent result string on success, null when blocked, undefined when agent errored.
 */
export async function handleTask({ prompt, agent, user, io, socketId, ip, traceId }) {
  // 1. Security Check — fail-closed: blocked tasks never reach the agent layer
  const security = await validateTask(prompt, user);
  if (!security.allowed) {
    if (socketId) {
      io.to(socketId).emit('ai_error', security.reason);
    }
    // Audit the blocked attempt so every security-relevant event is traceable
    logAction(user, 'run_agent', agent, {
      status: 'blocked',
      durationMs: 0,
      socketId: socketId || undefined,
      ip,
      traceId,
    });
    // Return null (not undefined) so callers can distinguish "blocked" from "agent error"
    return null;
  }

  // 2. Execute Agent — capture wall-clock duration for observability
  const startTime = Date.now();
  let result;
  let status = 'success';

  try {
    result = await runAgent(prompt, agent, io, socketId);
  } catch (err) {
    status = 'error';
    if (socketId) {
      const msg = err instanceof Error ? err.message : `Agent '${agent}' execution failed: ${String(err)}`;
      io.to(socketId).emit('ai_error', msg);
    }
  }

  const durationMs = Date.now() - startTime;

  // 3. Audit Log — always fires; includes status + timing for every execution attempt
  logAction(user, 'run_agent', agent, {
    status,
    durationMs,
    socketId: socketId || undefined,
    ip,
    traceId,
  });

  return result;
}
