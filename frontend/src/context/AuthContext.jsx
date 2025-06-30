import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  axios.defaults.baseURL = 'http://localhost:3001';
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [tipo, setTipo] = useState(() => localStorage.getItem('tipo'));

  // Configurar axios y localStorage cuando cambie token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Guardar tipo de cuenta
  useEffect(() => {
    if (tipo) {
      localStorage.setItem('tipo', tipo);
    } else {
      localStorage.removeItem('tipo');
    }
  }, [tipo]);

  // ✅ Método loginUsuario para usar en Registro.jsx
  const loginUsuario = (nuevoToken, nuevoTipo) => {
    setToken(nuevoToken);
    setTipo(nuevoTipo);
    axios.defaults.headers.common['Authorization'] = `Bearer ${nuevoToken}`;
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('tipo', nuevoTipo);
  };

  const logout = () => {
    setToken(null);
    setTipo(null);
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, tipo, setTipo, logout, loginUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};
