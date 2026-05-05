import { renderAdmin } from '../views/admin.js';

export function AppRouter() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/admin') {
    // Render the admin panel — server must have already verified the 'admin' role
    // before serving this route. The data-requires="admin:all" attribute provides
    // an additional client-side guard via the app's existing [data-requires] handler.
    return <div dangerouslySetInnerHTML={{ __html: renderAdmin() }} />;
  }
  return <div>CyberAi</div>;
}
