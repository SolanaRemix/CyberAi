/**
 * Security AI Layer
 * Independently validates tasks before execution.
 * Blocks malicious inputs before they reach any agent.
 */

const BLOCKED_KEYWORDS = ["rm -rf", "drop database", "hack"];

/**
 * Validate a task prompt before it is executed by an agent.
 *
 * @param {string} task - The task prompt submitted by the user.
 * @param {object} user - The user object (unused for now; reserved for future per-user rules).
 * @returns {Promise<{allowed: boolean, reason?: string}>}
 */
export async function validateTask(task, user) {
  for (const word of BLOCKED_KEYWORDS) {
    if (task.toLowerCase().includes(word)) {
      return {
        allowed: false,
        reason: "Dangerous command detected",
      };
    }
  }
  return { allowed: true };
}
