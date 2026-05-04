/**
 * Security AI Layer
 * Independently validates tasks before execution.
 * Blocks malicious inputs before they reach any agent.
 *
 * Defense-in-depth approach:
 *  1. Normalize the input (collapse whitespace, strip zero-width / homoglyph
 *     characters) so that trivial obfuscation like "r m -r f" is caught.
 *  2. Check against the blocked-keyword list on the normalized form.
 *
 * NOTE: This is a rule-based first line of defense.  For production deployments
 * it should be complemented by a semantic/LLM-based classifier that can detect
 * more sophisticated jailbreak attempts and context-dependent threats.
 */

const BLOCKED_KEYWORDS = ["rm -rf", "rm-rf", "drop database", "dropdatabase", "hack"];

/**
 * Normalize a task string to defeat simple obfuscation.
 * - Lowercases the input.
 * - Strips common zero-width and invisible Unicode characters.
 * - Collapses runs of whitespace to a single space.
 *
 * @param {string} input
 * @returns {string}
 */
function normalizeInput(input) {
  return (
    input
      // Remove zero-width / invisible Unicode characters that can split keywords
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F\u007F\u00AD\u200B-\u200D\u2060\uFEFF]/g, "")
      .toLowerCase()
      // Collapse all whitespace (spaces, tabs, newlines) to a single space
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Validate a task prompt before it is executed by an agent.
 *
 * @param {string} task - The task prompt submitted by the user.
 * @param {object} user - The user object (unused for now; reserved for future per-user rules).
 * @returns {Promise<{allowed: boolean, reason?: string}>}
 */
export async function validateTask(task, user) {
  if (typeof task !== "string" || task.trim() === "") {
    return { allowed: false, reason: "Invalid task: empty or non-string input" };
  }

  const normalized = normalizeInput(task);

  for (const word of BLOCKED_KEYWORDS) {
    if (normalized.includes(word)) {
      return {
        allowed: false,
        reason: "Dangerous command detected",
      };
    }
  }
  return { allowed: true };
}
