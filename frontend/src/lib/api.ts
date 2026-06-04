import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('campus_token') : null
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('campus_token')
        localStorage.removeItem('campus_user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api

export const authApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: object) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: object) => api.post('/auth/reset-password', data),
  verifyEmail: (token: string) => api.get(`/auth/verify-email/${token}`),
}

export const libraryApi = {
  list: (params?: object) => api.get('/library', { params }),
  get: (id: string) => api.get(`/library/${id}`),
  upload: (formData: FormData) => api.post('/library', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  bookmark: (id: string) => api.post(`/library/${id}/bookmark`),
  updateProgress: (id: string, page: number) => api.patch(`/library/${id}/progress`, { page }),
}

export const audioApi = {
  list: (params?: object) => api.get('/audio', { params }),
  get: (id: string) => api.get(`/audio/${id}`),
  upload: (formData: FormData) => api.post('/audio', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  like: (id: string) => api.post(`/audio/${id}/like`),
}

export const pastQuestionsApi = {
  list: (params?: object) => api.get('/past-questions', { params }),
  get: (id: string) => api.get(`/past-questions/${id}`),
  upload: (formData: FormData) => api.post('/past-questions', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  save: (id: string) => api.post(`/past-questions/${id}/save`),
}

export const eventsApi = {
  list: (params?: object) => api.get('/events', { params }),
  get: (id: string) => api.get(`/events/${id}`),
  register: (id: string) => api.post(`/events/${id}/register`),
  create: (data: object) => api.post('/events', data),
}

export const opportunitiesApi = {
  list: (params?: object) => api.get('/opportunities', { params }),
  get: (id: string) => api.get(`/opportunities/${id}`),
  bookmark: (id: string) => api.post(`/opportunities/${id}/bookmark`),
  create: (data: object) => api.post('/opportunities', data),
}

export const remindersApi = {
  list: () => api.get('/reminders'),
  create: (data: object) => api.post('/reminders', data),
  update: (id: string, data: object) => api.put(`/reminders/${id}`, data),
  delete: (id: string) => api.delete(`/reminders/${id}`),
  complete: (id: string) => api.patch(`/reminders/${id}/complete`),
}

export const notificationsApi = {
  list: () => api.get('/notifications'),
  markRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
}

export const searchApi = {
  global: (q: string) => api.get('/search', { params: { q } }),
}

export const adminApi = {
  stats: () => api.get('/admin/stats'),
  users: (params?: object) => api.get('/admin/users', { params }),
  analytics: () => api.get('/admin/analytics'),
}
