const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiFetch = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const api = {
  get: (endpoint, headers) => apiFetch(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) => apiFetch(endpoint, { method: 'POST', body, headers }),
  put: (endpoint, body, headers) => apiFetch(endpoint, { method: 'PUT', body, headers }),
  delete: (endpoint, headers) => apiFetch(endpoint, { method: 'DELETE', headers }),
};
