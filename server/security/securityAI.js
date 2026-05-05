/**
 * Security AI Layer
 * Independently validates tasks before execution.
 * Blocks malicious inputs before they reach any agent.
 *
 * Defense-in-depth approach:
 *  1. Normalize the input: strip zero-width / invisible Unicode characters,
 *     lowercase, and collapse whitespace.
 *  2. Check the normalized form against blocked patterns.
 *  3. Also check a whitespace-stripped ("compact") form so that spaced-out
 *     variants like "r m -r f" are caught (compact → "rm-rf").
 *
 * Pattern matching:
 *  - String patterns use substring inclusion.
 *  - Regex patterns (e.g. "hack") use word-boundary matching to avoid false
 *    positives: "hackathon landing page" and "lifehacks" are NOT blocked.
 *
 * NOTE: This is a rule-based first line of defense.  For production deployments
 * it should be complemented by a semantic/LLM-based classifier that can detect
 * more sophisticated jailbreak attempts and context-dependent threats.
 * Homoglyph substitution is NOT covered by this layer.
 */

/**
 * Each entry is [normalizedPattern, compactPattern].
 * A string means substring match; a RegExp means regex test.
 *
 * The compact-form entry lets a single rule catch both:
 *   "rm -rf"    (normal typed form, matched by normalized check)
 *   "rm-rf"     (no-space form, matched by compact check)
 *   "r m -r f"  (spaced-out form: compact → "rm-rf", matched by compact check)
 *
 * "hack" uses a word-boundary regex so that "hackathon" and "lifehacks" are
 * not falsely flagged as dangerous.  The compact-form entry also uses
 * word-boundary so that "h a c k" alone (compact → "hack") is still caught.
 *
 * @type {Array<[string|RegExp, string|RegExp]>}
 */
const BLOCKED_PATTERNS = [
  // Catches: "rm -rf" (normalized), "rm-rf" / "r m -r f" (compact → "rm-rf")
  ['rm -rf', 'rm-rf'],
  // Catches: "drop database" (normalized), "dropdatabase" / "d r o p …" (compact → "dropdatabase")
  ['drop database', 'dropdatabase'],
  // Word-boundary regex avoids false positives like "hackathon" or "lifehacks"
  [/\bhack\b/, /\bhack\b/],
];

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
      .replace(/[\u0000-\u001F\u007F\u00AD\u200B-\u200D\u2060\uFEFF]/g, '')
      .toLowerCase()
      // Collapse all whitespace (spaces, tabs, newlines) to a single space
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Validate a task prompt before it is executed by an agent.
 *
 * @param {string} task - The task prompt submitted by the user.
 * @param {object} _user - The user object (reserved for future per-user rules).
 * @returns {Promise<{allowed: boolean, reason?: string}>}
 */
export async function validateTask(task, _user) {
  if (typeof task !== 'string' || task.trim() === '') {
    return { allowed: false, reason: 'Invalid task: empty or non-string input' };
  }

  const normalized = normalizeInput(task);
  // Compact form strips all spaces to catch spaced-out variants like "r m -r f"
  const compact = normalized.replace(/\s/g, '');

  for (const [normPattern, compactPattern] of BLOCKED_PATTERNS) {
    const matchesNorm =
      normPattern instanceof RegExp
        ? normPattern.test(normalized)
        : normalized.includes(normPattern);
    const matchesCompact =
      compactPattern instanceof RegExp
        ? compactPattern.test(compact)
        : compact.includes(compactPattern);

    if (matchesNorm || matchesCompact) {
      return {
        allowed: false,
        reason: 'Dangerous command detected',
      };
    }
  }
  return { allowed: true };
}
