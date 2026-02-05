import axios from 'axios';

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return envUrl.endsWith('/api/v1') ? envUrl : `${envUrl}/api/v1`;
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = import.meta.env.VITE_ADMIN_API_KEY;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (import.meta.env.DEV) {
    console.log('🚀 Request to:', config.baseURL + config.url);
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

export const portfolioService = {
  getProjects: async () => {
    const { data } = await api.get('/projects');
    return data;
  },
  
  getTechnologies: async () => {
    const { data } = await api.get('/technologies');
    return data;
  }
};

export const blogService = {
  getAllPosts: async (skip = 0, limit = 10) => {
    const params = new URLSearchParams({ skip, limit });
    const { data } = await api.get(`/blog/?${params.toString()}`);
    return data;
  },

  getPostBySlug: async (slug) => {
    const { data } = await api.get(`/blog/${slug}`);
    return data;
  }
};