(function () {
  const SESSION_KEY = 'cyberai.auth.session.v1';
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ADMIN_EMAIL_ALLOWLIST = new Set(['admin@cyberai.network']);
  const ADMIN_PASSWORD_SHA256 =
    '21d3a1e091ab80715f5eab32844ae63792ba667e86f4fe31a68a228cc4ba3957';

  const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

  const toSessionName = (email, fallback = 'user') => {
    const prefix = normalizeEmail(email).split('@')[0];
    return prefix || fallback;
  };

  const readSession = () => {
    const stored =
      localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  };

  const persistSession = (session, remember = false) => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    const targetStorage = remember ? localStorage : sessionStorage;
    targetStorage.setItem(SESSION_KEY, JSON.stringify(session));
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const sha256 = async (value) => {
    const encoded = new TextEncoder().encode(String(value || ''));
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  };

  const isAdminCredentials = async (email, password) => {
    const normalizedEmail = normalizeEmail(email);
    if (!ADMIN_EMAIL_ALLOWLIST.has(normalizedEmail)) {
      return false;
    }

    const passwordHash = await sha256(password);
    return passwordHash === ADMIN_PASSWORD_SHA256;
  };

  const getRoleForSession = (session) => {
    if (!session?.email) return 'user';
    const normalizedEmail = normalizeEmail(session.email);
    if (session.adminVerified === true && ADMIN_EMAIL_ALLOWLIST.has(normalizedEmail)) {
      return 'admin';
    }
    return 'user';
  };

  window.CYBERAI_AUTH = {
    SESSION_KEY,
    EMAIL_PATTERN,
    normalizeEmail,
    toSessionName,
    readSession,
    persistSession,
    clearSession,
    isAdminCredentials,
    getRoleForSession,
  };
})();
