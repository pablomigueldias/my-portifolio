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

  getProjectById: async (id) => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },
  createProject: async (projectData) => {
    const { data } = await api.post('/projects/', projectData);
    return data;
  },
  updateProject: async (id, projectData) => {
    const { data } = await api.patch(`/projects/${id}/`, projectData);
    return data;
  },
  deleteProject: async (id) => {
    await api.delete(`/projects/${id}/`);
  },

  getTechnologies: async () => {
    const { data } = await api.get('/technologies/');
    return data;
  },
  createTechnology: async (data) => {
    const { data: res } = await api.post('/technologies/', data);
    return res;
  },
  updateTechnology: async (id, data) => {
    const { data: res } = await api.patch(`/technologies/${id}/`, data);
    return res;
  },

  deleteTechnology: async (id) => {
    await api.delete(`/technologies/${id}/`);
  }
};

export const blogService = {
  getAllPosts: async (skip = 0, limit = 100, status = 'published') => {
    const { data } = await api.get('/blog/', { 
        params: { skip, limit, status }
    });
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

export const authService = {
  /**
   *
   * @param {string} username 
   * @param {string} password 
   */

  login: async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
  },
};

export const contactService = {
  sendMessage: async (data) => {
    const { data: response } = await api.post('/contact/', data);
    return response;
  },
};


