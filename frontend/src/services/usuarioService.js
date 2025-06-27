// frontend/src/services/usuarioService.js
import axios from 'axios';
const API_USERS = 'http://localhost:3001/api/usuarios';
export const getUsuarios     = () => axios.get(API_USERS);
export const getUsuarioById  = id => axios.get(`${API_USERS}/${id}`);
export const createUsuario   = data => axios.post(API_USERS, data);
export const updateUsuario   = (id, data) => axios.put(`${API_USERS}/${id}`, data);
export const deleteUsuario   = id => axios.delete(`${API_USERS}/${id}`);