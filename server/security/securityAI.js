/**
 * Security AI Layer
 * Independently validates tasks before execution.
 * Blocks malicious inputs before they reach any agent.
 *
 * Defense-in-depth approach:
 *  1. Normalize the input: strip zero-width / invisible Unicode characters,
 *     lowercase, and collapse whitespace.
 *  2. Check the normalized form against blocked keywords.
 *  3. Also check a whitespace-stripped ("compact") form so that spaced-out
 *     variants like "r m -r f" are caught (compact → "rm-rf").
 *
 * NOTE: This is a rule-based first line of defense.  For production deployments
 * it should be complemented by a semantic/LLM-based classifier that can detect
 * more sophisticated jailbreak attempts and context-dependent threats.
 * Homoglyph substitution is NOT covered by this layer.
 */

const BLOCKED_KEYWORDS = ["rm -rf", "rm-rf", "drop database", "dropdatabase", "hack"];

// Space-free versions of each keyword used for the compact-form check.
const BLOCKED_KEYWORDS_COMPACT = BLOCKED_KEYWORDS.map((kw) => kw.replace(/\s/g, ""));

/**
 * Normalize a task string to defeat simple obfuscation.
 * - Strips common zero-width and invisible Unicode characters.
 * - Lowercases the input.
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
  // Compact form strips all spaces to catch spaced-out variants like "r m -r f"
  const compact = normalized.replace(/\s/g, "");

  for (let i = 0; i < BLOCKED_KEYWORDS.length; i++) {
    if (normalized.includes(BLOCKED_KEYWORDS[i]) || compact.includes(BLOCKED_KEYWORDS_COMPACT[i])) {
      return {
        allowed: false,
        reason: "Dangerous command detected",
      };
    }
  }
  return { allowed: true };
}
