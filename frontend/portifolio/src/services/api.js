import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
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

export const blogService = {
  getAllPosts: async (skip = 0, limit = 10) => {
    const response = await api.get(`/blog/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getPostBySlug: async (slug) => {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  }
};