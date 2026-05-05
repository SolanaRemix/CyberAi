/**
 * Unit tests for server/security/securityAI.js
 * Covers validateTask: allow/block rules, input normalization,
 * obfuscation resistance, and edge-case inputs.
 */

import { describe, it, expect } from 'vitest';
import { validateTask } from '../../../server/security/securityAI.js';

// ─── Safe Tasks ───────────────────────────────────────────────────────────────

describe('validateTask — safe prompts', () => {
  it('should allow a normal task prompt', async () => {
    const result = await validateTask('Deploy the new contract to devnet', undefined);
    expect(result).toEqual({ allowed: true });
  });

  it('should allow a task with no suspicious keywords', async () => {
    const result = await validateTask('Summarize the audit report', undefined);
    expect(result).toEqual({ allowed: true });
  });

  it('should allow "hackathon" (word-boundary guard on hack)', async () => {
    const result = await validateTask('Build a hackathon landing page', undefined);
    expect(result).toEqual({ allowed: true });
  });

  it('should allow "lifehacks" (word-boundary guard on hack)', async () => {
    const result = await validateTask('Generate a list of lifehacks for productivity', undefined);
    expect(result).toEqual({ allowed: true });
  });
});

// ─── Blocked Tasks ────────────────────────────────────────────────────────────

describe('validateTask — blocked prompts', () => {
  it('should block "rm -rf" (normalized form)', async () => {
    const result = await validateTask('Run rm -rf on the server directory', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });

  it('should block "rm-rf" (compact no-space form)', async () => {
    const result = await validateTask('Execute rm-rf now', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });

  it('should block "r m -r f" (spaced-out obfuscated form)', async () => {
    const result = await validateTask('r m -r f /', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });

  it('should block "drop database" (normalized form)', async () => {
    const result = await validateTask('Please drop database production', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });

  it('should block "dropdatabase" (compact form)', async () => {
    const result = await validateTask('dropdatabase now', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });

  it('should block "d r o p   d a t a b a s e" (spaced-out compact form)', async () => {
    const result = await validateTask('d r o p d a t a b a s e', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });

  it('should block standalone "hack" (word-boundary regex)', async () => {
    const result = await validateTask('hack the system', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });

  it('should block "h a c k" alone (compact → "hack", word-boundary match)', async () => {
    // "h a c k" strips spaces to "hack"; /\bhack\b/ matches the whole string
    const result = await validateTask('h a c k', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Dangerous command detected');
  });
});

// ─── Input Normalization / Obfuscation Resistance ────────────────────────────

describe('validateTask — normalization', () => {
  it('should block upper-case variant "RM -RF"', async () => {
    const result = await validateTask('RM -RF /', undefined);
    expect(result.allowed).toBe(false);
  });

  it('should block "rm -rf" hidden behind zero-width characters', async () => {
    // Insert U+200B (zero-width space) between letters
    const obfuscated = 'rm\u200B -\u200Brf';
    const result = await validateTask(obfuscated, undefined);
    expect(result.allowed).toBe(false);
  });

  it('should block "DROP DATABASE" (case-insensitive)', async () => {
    const result = await validateTask('DROP DATABASE users', undefined);
    expect(result.allowed).toBe(false);
  });
});

// ─── Edge Cases ───────────────────────────────────────────────────────────────

describe('validateTask — edge cases', () => {
  it('should reject an empty string', async () => {
    const result = await validateTask('', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Invalid task: empty or non-string input');
  });

  it('should reject a whitespace-only string', async () => {
    const result = await validateTask('   ', undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Invalid task: empty or non-string input');
  });

  it('should reject a non-string input (number)', async () => {
    // @ts-expect-error — intentionally testing JS runtime behaviour
    const result = await validateTask(42, undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Invalid task: empty or non-string input');
  });

  it('should reject null input', async () => {
    // @ts-expect-error — intentionally testing JS runtime behaviour
    const result = await validateTask(null, undefined);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Invalid task: empty or non-string input');
  });

  it('should ignore the _user argument (reserved parameter)', async () => {
    const withUser = await validateTask('Summarize the audit report', { role: 'admin' });
    const withoutUser = await validateTask('Summarize the audit report', undefined);
    expect(withUser).toEqual(withoutUser);
  });
});
