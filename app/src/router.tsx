import { useEffect } from 'react';
import { renderAdmin } from '../views/admin.js';

/** Minimal interface for the Socket.IO client returned by `window.io()`. */
interface SocketClient {
  on: (event: string, handler: (data: unknown) => void) => void;
  disconnect: () => void;
}

/** Narrow type for the global `window.io` Socket.IO factory (if loaded). */
interface WindowWithIO extends Window {
  io?: (opts?: { auth?: { token?: string } }) => SocketClient;
}

/**
 * Admin panel sub-component.
 * Renders the static admin markup (via renderAdmin) and sets up the live
 * Socket.IO audit-log subscription via useEffect.
 *
 * Note: inline <script> tags inside dangerouslySetInnerHTML are inert in the
 * browser; the useEffect below provides the actual live subscription instead.
 */
function AdminPanel() {
  useEffect(() => {
    const w = window as WindowWithIO;
    if (typeof w.io !== 'function') {
      const el = document.getElementById('logs');
      if (el) el.textContent = 'Live updates unavailable: Socket.IO not loaded.';
      return;
    }
    // Pass the stored auth token so the server can resolve the admin role
    // and admit this socket to the 'admins' room for audit broadcasts.
    const token =
      typeof localStorage !== 'undefined' ? (localStorage.getItem('cyberai-token') ?? '') : '';
    const socket = w.io({ auth: { token } });
    socket.on('audit_log', entry => {
      const el = document.getElementById('logs');
      if (!el) return;
      const row = document.createElement('pre');
      row.textContent = JSON.stringify(entry, null, 2);
      el.prepend(row);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // Static markup only — the live subscription is handled by the useEffect above.
  return <div dangerouslySetInnerHTML={{ __html: renderAdmin() }} />;
}

export function AppRouter() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/dashboard/admin') {
    // Client-side role guard: read the role that the server baked into the app
    // root element's data-role attribute (set by the app shell before React mounts).
    // This mirrors the action-based ROUTE_REQUIREMENTS guard in src/security/guards.ts
    // which maps '/dashboard/admin' → 'admin:all'.
    const appEl = typeof document !== 'undefined' ? document.getElementById('app') : null;
    const currentRole = appEl?.dataset?.role ?? 'guest';
    if (currentRole !== 'admin') {
      return <div>Access denied. Admin privileges required.</div>;
    }
    return <AdminPanel />;
  }
  return <div>CyberAi</div>;
}
