// frontend/src/services/productoService.js
import axios from 'axios';

const API_PRODUCTOS = 'http://localhost:3001/api/productos';

export const getProductos = () => axios.get(API_PRODUCTOS);

export const createProducto = (data, token) =>
  axios.post(API_PRODUCTOS, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
