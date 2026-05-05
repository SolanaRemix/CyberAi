/**
 * Admin Panel View
 * Renders the enterprise admin panel with a live audit log display.
 *
 * Authentication guard:
 *   The caller must verify the current user has the 'admin' role before
 *   invoking renderAdmin(). The returned markup uses `data-requires="admin:all"`,
 *   which matches the action-based guard contract used throughout the app
 *   (dashboard/layout.html, app/layout.html). Client-side guard scripts that
 *   process `[data-requires]` attributes will hide this panel for non-admins.
 *
 * Live audit logs:
 *   The inline script connects to the Socket.IO server and subscribes to
 *   'audit_log' events emitted to the 'admins' room by the audit logger.
 *   Entries appear in real time inside the #logs container.
 */

/**
 * Return the HTML markup for the Admin Panel view.
 * Must only be rendered after server-side role verification (admin:all).
 *
 * @returns {string} HTML string for the admin panel.
 */
export function renderAdmin() {
  return `
    <div class="glass" data-requires="admin:all">
      <h2>Admin Panel</h2>
      <div>Audit Logs (live)</div>
      <div id="logs"></div>
    </div>
    <script>
      (function () {
        if (typeof io === 'undefined') {
          var el = document.getElementById('logs');
          if (el) el.textContent = 'Live updates unavailable: Socket.IO not loaded.';
          return;
        }
        var socket = io();
        socket.on('audit_log', function (entry) {
          var el = document.getElementById('logs');
          if (!el) return;
          var row = document.createElement('pre');
          row.textContent = JSON.stringify(entry, null, 2);
          el.prepend(row);
        });
      })();
    </script>
  `;
}
