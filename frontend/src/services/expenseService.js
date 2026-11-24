import { api } from './api.js';
export default {
  list: () => api('/api/expenses'),
  create: data => api('/api/expenses', { method: 'POST', body: JSON.stringify(data) }),
  remove: id => api('/api/expenses/' + id, { method: 'DELETE' }),
};
