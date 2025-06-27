// frontend/src/services/emprendimientoService.js
import axios from 'axios';
const API_EMPRE = 'http://localhost:3001/api/emprendimientos';
export const getEmprendimientos    = () => axios.get(API_EMPRE);
export const getEmprendimientoById = id => axios.get(`${API_EMPRE}/${id}`);
export const createEmprendimiento  = data => axios.post(API_EMPRE, data);
export const updateEmprendimiento  = (id, data) => axios.put(`${API_EMPRE}/${id}`, data);
export const deleteEmprendimiento  = id => axios.delete(`${API_EMPRE}/${id}`);