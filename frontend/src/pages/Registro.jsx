import React, { useState, useContext } from 'react';
import { register, login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Registro.css';
import axios from 'axios';

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
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const { loginUsuario } = useContext(AuthContext);
  const API = import.meta.env.VITE_API_URL;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const agregarProducto = () => {
    setProductos([...productos, {
      nombre: '',
      categoria: '',
      descripcion: '',
      precio: '',
      imagen: ''
    }]);
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevos = [...productos];
    nuevos[index][campo] = valor;
    setProductos(nuevos);
  };

  const eliminarProducto = (index) => {
    const nuevos = [...productos];
    nuevos.splice(index, 1);
    setProductos(nuevos);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const payload = {
        correo: form.correo,
        contrasena: form.contrasena,
        tipo: tipoCuenta
      };
      const { data } = await login(payload);
      loginUsuario(data.token, tipoCuenta);
      navigate(tipoCuenta === 'usuario' ? '/dashboard/usuario' : '/dashboard/emprendimiento');
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

      const { data } = await login({
        correo: form.correo,
        contrasena: form.contrasena,
        tipo: tipoCuenta
      });

      loginUsuario(data.token, tipoCuenta);

      if (tipoCuenta === 'emprendimiento' && productos.length > 0) {
        for (const producto of productos) {
          if (
            !producto.nombre || !producto.categoria || !producto.descripcion ||
            !producto.precio || !producto.imagen
          ) continue;

          await axios.post(`${API}/api/productos`, {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: parseFloat(producto.precio),
            imagen: producto.imagen,
            categoria: producto.categoria,
        
          }, {
            headers: {
              Authorization: `Bearer ${data.token}`
            }
          });
        }
      }

      navigate(tipoCuenta === 'usuario' ? '/dashboard/usuario' : '/dashboard/emprendimiento');
    } catch (err) {
      console.error(err);
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
          {/* Formulario de Login */}
          <form className={`formulario__login ${isLogin ? 'active' : ''}`} onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <select
              name="tipoCuenta"
              value={tipoCuenta}
              onChange={e => setTipoCuenta(e.target.value)}
            >
              <option value="usuario">Usuario</option>
              <option value="emprendimiento">Emprendedor</option>
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

          {/* Formulario de Registro */}
          <form className={`formulario__register ${!isLogin ? 'active' : ''}`} onSubmit={handleRegister}>
            <h2>Registro</h2>
            <select
              name="tipoCuenta"
              value={tipoCuenta}
              onChange={e => setTipoCuenta(e.target.value)}
            >
              <option value="usuario">Usuario</option>
              <option value="emprendimiento">Emprendedor</option>
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
            {tipoCuenta === 'emprendimiento' && (
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

                <div className="formulario-productos">
                  <h4>Agregar productos</h4>
                  {productos.map((p, i) => (
                    <div key={i} className="producto-form">
                      <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={p.nombre}
                        onChange={(e) => actualizarProducto(i, 'nombre', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Categoría"
                        value={p.categoria}
                        onChange={(e) => actualizarProducto(i, 'categoria', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Descripción"
                        value={p.descripcion}
                        onChange={(e) => actualizarProducto(i, 'descripcion', e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Precio"
                        value={p.precio}
                        onChange={(e) => actualizarProducto(i, 'precio', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Nombre de imagen (ej: producto.jpg o base64)"
                        value={p.imagen}
                        onChange={(e) => actualizarProducto(i, 'imagen', e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => eliminarProducto(i)}>Eliminar</button>
                    </div>
                  ))}
                  <button type="button" onClick={agregarProducto}>➕ Agregar nuevo producto</button>
                </div>
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
