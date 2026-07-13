import axios from 'axios';

let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (apiUrl && !apiUrl.endsWith('/api') && !apiUrl.endsWith('/api/')) {
  apiUrl = apiUrl.endsWith('/') ? `${apiUrl}api` : `${apiUrl}/api`;
}

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const resolveCompany = async (query) => {
  const response = await api.post('/companies/resolve', { query });
  return response.data;
};

export const createRun = async (ticker) => {
  const response = await api.post('/runs', { ticker });
  return response.data;
};

export const getRunStatus = async (runId) => {
  const response = await api.get(`/runs/${runId}/status`);
  return response.data;
};

export const getRunReport = async (runId) => {
  const response = await api.get(`/runs/${runId}/report`);
  return { status: response.status, data: response.data };
};
