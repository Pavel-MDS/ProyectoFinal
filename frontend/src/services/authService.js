// frontend/src/services/authService.js
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/auth';

export const register = (payload) =>
  axios.post(`${API_BASE}/register`, payload);

export const login = (payload) =>
  axios.post(`${API_BASE}/login`, payload);
