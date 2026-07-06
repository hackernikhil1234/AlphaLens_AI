import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
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
