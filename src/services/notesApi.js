const BASE = 'https://notes-api.dicoding.dev/v1';

async function request(path, { method = 'GET', body = null, token = null } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  // Note: removed debug logging for production-ready build

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || 'API error');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const register = async ({ name, email, password }) => {
  return request('/register', { method: 'POST', body: { name, email, password } });
};

export const login = async ({ email, password }) => {
  return request('/login', { method: 'POST', body: { email, password } });
};

export const getAllNotes = async (token) => {
  return request('/notes', { token }).then(r => r.data);
};

export const getNote = async (id, token) => {
  return request(`/notes/${id}`, { token }).then(r => r.data);
};

export const createNote = async (note, token) => {
  return request('/notes', { method: 'POST', body: note, token }).then(r => r.data);
};

export const deleteNote = async (id, token) => {
  return request(`/notes/${id}`, { method: 'DELETE', token }).then(r => r.data);
};

export const archiveNote = async (id, token) => {
  return request(`/notes/${id}/archive`, { method: 'POST', token }).then(r => r.data);
};

export const unarchiveNote = async (id, token) => {
  return request(`/notes/${id}/unarchive`, { method: 'POST', token }).then(r => r.data);
};
