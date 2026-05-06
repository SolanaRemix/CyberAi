/**
 * TypeScript declarations for app/views/admin.js
 *
 * Provides type information for the Admin Panel view module so that
 * TypeScript can type-check imports of `renderAdmin` without TS7016.
 */

/**
 * Return the HTML markup for the Admin Panel view.
 * Must only be rendered after server-side role verification (admin:all).
 */
export function renderAdmin(): string;
