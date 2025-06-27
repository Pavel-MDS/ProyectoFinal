import React, { useState } from 'react';
import { register, login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [tipoCuenta, setTipoCuenta] = useState('usuario');
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    contacto: '',
    direccion: ''
  });
  const navigate = useNavigate(); //  redirigir

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const payload = { correo: form.correo, contrasena: form.contrasena, tipo: tipoCuenta };
      const { data } = await login(payload);
      // 1) guardar token y tipo
      localStorage.setItem('token', data.token);
      localStorage.setItem('tipo', tipoCuenta);
      // 2) redirigir al dashboard adecuado
      if (tipoCuenta === 'usuario') {
        navigate('/dashboard/usuario');
      } else {
        navigate('/dashboard/emprendimiento');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Error de autenticación');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const payload = {
        nombre: form.nombre,
        correo: form.correo,
        contrasena: form.contrasena,
        tipo: tipoCuenta,
        contacto: form.contacto,
        direccion: form.direccion
      };
      await register(payload);
      alert('Registro exitoso, ahora inicia sesión');
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <main className={`contenedor__todo ${isLogin ? 'login-mode' : 'register-mode'}`}>
      <div className="caja__trasera">
        <div className="caja__trasera-login">
          <h3>¿Ya tienes una cuenta?</h3>
          <p>Inicia sesión para entrar</p>
          <button onClick={() => setIsLogin(true)}>Iniciar Sesión</button>
        </div>
        <div className="caja__trasera-register">
          <h3>¿Aún no tienes una cuenta?</h3>
          <p>Regístrate para entrar</p>
          <button onClick={() => setIsLogin(false)}>Registrarse</button>
        </div>
        <div className="form-container">
          <form
            className={`formulario__login ${isLogin ? 'active' : ''}`}
            onSubmit={handleLogin}
          >
            <h2>Iniciar Sesión</h2>
            <select
              name="tipoCuenta"
              value={tipoCuenta}
              onChange={e => setTipoCuenta(e.target.value)}
            >
              <option value="usuario">Usuario</option>
              <option value="emprendedor">Emprendedor</option>
            </select>
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={form.contrasena}
              onChange={handleChange}
              required
            />
            <button type="submit">Entrar</button>
          </form>

          <form
            className={`formulario__register ${!isLogin ? 'active' : ''}`}
            onSubmit={handleRegister}
          >
            <h2>Registro</h2>
            <select
              name="tipoCuenta"
              value={tipoCuenta}
              onChange={e => setTipoCuenta(e.target.value)}
            >
              <option value="usuario">Usuario</option>
              <option value="emprendedor">Emprendedor</option>
            </select>
            <input
              type="text"
              name="nombre"
              placeholder={tipoCuenta === 'usuario' ? 'Nombre' : 'Nombre del negocio'}
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={form.contrasena}
              onChange={handleChange}
              required
            />
            {tipoCuenta === 'emprendedor' && (
              <>
                <input
                  type="text"
                  name="contacto"
                  placeholder="Contacto"
                  value={form.contacto}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registro;
