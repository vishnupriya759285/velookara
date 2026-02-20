import axios from 'axios';

// Extend the global ImportMeta interface for Vite environment variables
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    // add other env variables here if needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  getProfile: () =>
    api.get('/auth/me'),
  
  updateProfile: (data: { name?: string; phone?: string }) =>
    api.put('/auth/profile', data),
};

// Issues API
export const issuesAPI = {
  create: (data: any) =>
    api.post('/issues', data),
  
  getAll: (params?: { status?: string; category?: string; priority?: string; page?: number; limit?: number }) =>
    api.get('/issues', { params }),
  
  getMyIssues: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get('/issues/my-issues', { params }),
  
  getById: (id: string) =>
    api.get(`/issues/${id}`),
  
  update: (id: string, data: any) =>
    api.put(`/issues/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/issues/${id}`),
  
  updateStatus: (id: string, status: string) =>
    api.put(`/issues/${id}/status`, { status }),
  
  assign: (id: string, assignedTo: string) =>
    api.put(`/issues/${id}/assign`, { assignedTo }),
  
  addComment: (id: string, text: string) =>
    api.post(`/issues/${id}/comments`, { text }),
  
  getStats: () =>
    api.get('/issues/stats/overview'),
};

// Notices API
export const noticesAPI = {
  create: (data: any) =>
    api.post('/notices', data),
  
  getAll: (params?: { page?: number; limit?: number }) =>
    api.get('/notices', { params }),
  
  getById: (id: string) =>
    api.get(`/notices/${id}`),
  
  update: (id: string, data: any) =>
    api.put(`/notices/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/notices/${id}`),
};

// Users API (Admin only)
export const usersAPI = {
  getAll: (params?: { page?: number; limit?: number }) =>
    api.get('/users', { params }),
  
  getById: (id: string) =>
    api.get(`/users/${id}`),
  
  updateRole: (id: string, role: string) =>
    api.put(`/users/${id}/role`, { role }),
  
  delete: (id: string) =>
    api.delete(`/users/${id}`),
};

// Events API
export const eventsAPI = {
  create: (data: any) =>
    api.post('/events', data),
  
  getAll: (params?: { district?: string; panchayat?: string; page?: number; limit?: number }) =>
    api.get('/events', { params }),
  
  getById: (id: string) =>
    api.get(`/events/${id}`),
  
  update: (id: string, data: any) =>
    api.put(`/events/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/events/${id}`),
  
  register: (id: string, data: { name: string; phone: string; email?: string; ward?: string; num_attendees?: number }) =>
    api.post(`/events/${id}/register`, data),
  
  getRegistrations: (id: string) =>
    api.get(`/events/${id}/registrations`),
};
