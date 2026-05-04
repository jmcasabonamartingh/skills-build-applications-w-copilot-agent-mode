const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('octofit_token');
}

function getHeaders() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  return headers;
}

export async function apiGet(path) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data?.detail || data?.error || `HTTP ${response.status}`;
      throw new Error(message);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con el backend. Verifica que Django este activo en http://localhost:8000 y que MongoDB este levantado en localhost:27017.');
    }
    throw error;
  }
}

export async function apiPost(path, payload) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data?.detail || data?.error || `HTTP ${response.status}`;
      throw new Error(message);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con el backend. Verifica que Django este activo en http://localhost:8000 y que MongoDB este levantado en localhost:27017.');
    }
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.detail || data?.error || `HTTP ${response.status}`;
      throw new Error(message);
    }
    if (data.key) {
      localStorage.setItem('octofit_token', data.key);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con el backend. Verifica que Django este activo en http://localhost:8000 y que MongoDB este levantado en localhost:27017.');
    }
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('octofit_token');
}
