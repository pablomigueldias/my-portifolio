import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
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