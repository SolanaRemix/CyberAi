/**
 * Admin Panel View
 * Renders the enterprise admin panel with a live audit log display.
 */

/**
 * Return the HTML markup for the Admin Panel view.
 *
 * @returns {string} HTML string for the admin panel.
 */
export function renderAdmin() {
  return `
    <div class="glass">
      <h2>Admin Panel</h2>
      <div>Audit Logs (live)</div>
      <div id="logs"></div>
    </div>
  `;
}
