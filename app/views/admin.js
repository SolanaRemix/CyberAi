/**
 * Admin Panel View
 * Renders the enterprise admin panel with a live audit log display.
 *
 * Authentication guard:
 *   The caller must verify the current user has the 'admin' role before
 *   invoking renderAdmin(). The returned markup includes a data attribute
 *   (`data-requires-role="admin"`) that client-side route guards should check.
 *   If authentication state is not present, redirect to the login page.
 */

/**
 * Return the HTML markup for the Admin Panel view.
 * Must only be rendered after server-side role verification (admin:all).
 *
 * @returns {string} HTML string for the admin panel.
 */
export function renderAdmin() {
  return `
    <div class="glass" data-requires-role="admin">
      <h2>Admin Panel</h2>
      <div>Audit Logs (live)</div>
      <div id="logs"></div>
    </div>
  `;
}
