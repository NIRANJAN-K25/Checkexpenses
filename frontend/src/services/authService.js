import { api } from './api.js';
export default {
  getConfig: () => api('/api/auth/config'),
  me: () => api('/api/auth/me'),
  loginWithGoogle: credential => api('/api/auth/google', { method: 'POST', body: JSON.stringify({ credential, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }) }),
  logout: () => api('/api/auth/logout', { method: 'POST' }),
};
