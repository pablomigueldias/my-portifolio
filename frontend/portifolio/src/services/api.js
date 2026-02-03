import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const portfolioService = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  getTechnologies: async () => {
    const response = await api.get('/technologies');
    return response.data;
  }
};