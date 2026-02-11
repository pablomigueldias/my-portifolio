import axios from 'axios';

const getBaseURL = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:8000';
};

const getAuthHeader = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('admin_token');

    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const portfolioService = {
  getProjects: async () => {
    const { data } = await api.get('/projects/');
    return data;
  },
  getTechnologies: async () => {
    const { data } = await api.get('/technologies/');
    return data;
  },
};

export const blogService = {
  getAllPosts: async (skip = 0, limit = 10) => {
    const { data } = await api.get('/blog/', { params: { skip, limit } });
    return data;
  },

  getPostBySlug: async (slug) => {
    const { data } = await api.get(`/blog/${slug}/`);
    return data;
  },

  generateDraft: async (notes) => {
    const { data } = await api.post('/blog/generate', { notes });
    return data;
  },

  createPost: async (postData) => {
    const { data } = await api.post('/blog/', postData);
    return data;
  },

  updatePost: async (slug, postData) => {
    const { data } = await api.put(`/blog/${slug}/`, postData);
    return data;
  },

  generateFromFile: async (formData) => {
    const { data } = await api.post('/blog/generate-from-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deletePost: async (slug) => {
    await api.delete(`/blog/${slug}/`); 
  },
};

export const contactService = {
  sendMessage: async (data) => {
    const { data: response } = await api.post('/contact/', data);
    return response;
  },
};
