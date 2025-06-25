import { useEffect } from 'react';
import './Registro.css';

const Registro = () => {
  useEffect(() => {
    const tipoCuenta = document.getElementById('tipoCuenta');
    const registroUsuario = document.getElementById('registroUsuario');
    const registroEmprendedor = document.getElementById('registroEmprendedor');
    const panelEmprendedor = document.getElementById('panel-emprendedor');
    const btnIniciarSesion = document.getElementById('btn__iniciar-sesion');
    const btnRegistrarse = document.getElementById('btn__registrarse');
    const formularioLogin = document.querySelector('.formulario__login');
    const formularioRegister = document.querySelector('.formulario__register');

    btnIniciarSesion.addEventListener('click', () => {
      formularioLogin.style.display = 'block';
      formularioRegister.style.display = 'none';
    });

    btnRegistrarse.addEventListener('click', () => {
      formularioLogin.style.display = 'none';
      formularioRegister.style.display = 'block';
    });

    tipoCuenta.addEventListener('change', () => {
      if (tipoCuenta.value === 'usuario') {
        registroUsuario.classList.remove('hidden');
        registroEmprendedor.classList.add('hidden');
      } else {
        registroUsuario.classList.add('hidden');
        registroEmprendedor.classList.remove('hidden');
      }
    });

    document.querySelector('.formulario__login').addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = document.getElementById('correoUsuario').value;
      const contrasena = document.getElementById('contrasenaUsuario').value;

      const usuario = JSON.parse(localStorage.getItem('usuarioRegistrado'));
      const emprendedor = JSON.parse(localStorage.getItem('emprendimientoRegistrado'));

      if (usuario && usuario.correo === correo && usuario.contrasena === contrasena) {
        alert('Inicio de sesión como usuario exitoso.');
        localStorage.setItem('usuarioLogin', JSON.stringify(usuario));
      } else if (emprendedor && emprendedor.correo === correo && emprendedor.contrasena === contrasena) {
        alert('Inicio de sesión como emprendedor exitoso.');
        localStorage.setItem('usuarioLogin', JSON.stringify(emprendedor));
        panelEmprendedor.classList.remove('hidden');
      } else {
        alert('Correo o contraseña incorrectos.');
      }
    });

    document.getElementById('form-emprendedor').addEventListener('submit', (e) => {
      e.preventDefault();
      if (tipoCuenta.value === 'usuario') {
        const usuario = {
          tipo: 'usuario',
          nombre: document.getElementById('nombreUsuario').value,
          correo: document.getElementById('correoRegistroUsuario').value,
          contrasena: document.getElementById('contrasenaRegistroUsuario').value,
        };
        localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
        alert('Usuario registrado exitosamente.');
      } else {
        const emprendimiento = {
          tipo: 'emprendedor',
          negocio: document.getElementById('nombreNegocio').value,
          correo: document.getElementById('correoNegocio').value,
          contrasena: document.getElementById('contrasenaNegocio').value,
          contacto: document.getElementById('contactoNegocio').value,
          direccion: document.getElementById('direccionNegocio').value,
        };
        localStorage.setItem('emprendimientoRegistrado', JSON.stringify(emprendimiento));
        alert('Emprendimiento registrado.');
      }
      e.target.reset();
    });

    document.getElementById('form-producto').addEventListener('submit', (e) => {
      e.preventDefault();
      const producto = {
        nombre: document.getElementById('nombreProducto').value,
        precio: parseFloat(document.getElementById('precioProducto').value),
        categoria: document.getElementById('categoriaProducto').value,
        empresa: document.getElementById('empresaProducto').value,
        contacto: document.getElementById('contactoProducto').value,
        unidades: parseInt(document.getElementById('unidadesProducto').value),
        descripcion: document.getElementById('descripcionProducto').value,
        imagen: document.getElementById('imagenProducto').files[0]?.name || 'placeholder.jpg',
      };

      const productos = JSON.parse(localStorage.getItem('productos') || '[]');
      productos.push(producto);
      localStorage.setItem('productos', JSON.stringify(productos));
      alert('Producto guardado.');
      e.target.reset();
    });
  }, []);

  return (
    <main>
      <div className="contenedor__todo">
        {/* Panel izquierdo y derecho */}
        <div className="caja__trasera">
          <div className="caja__trasera-login">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button id="btn__iniciar-sesion">Iniciar Sesión</button>
          </div>
          <div className="caja__trasera-register">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            <button id="btn__registrarse">Registrarse</button>
          </div>
        </div>

        {/* Formularios separados */}
        <div className="contenedor__login-register" id="contenedorLoginRegister">
          <form className="formulario__login">
            <h2>Iniciar Sesión</h2>
            <input type="text" id="correoUsuario" placeholder="Correo Electrónico" required />
            <input type="password" id="contrasenaUsuario" placeholder="Contraseña" required />
            <button type="submit">Entrar</button>
          </form>

          <form className="formulario__register" id="form-emprendedor">
            <h2>Registro</h2>
            <select id="tipoCuenta">
              <option value="usuario">Usuario</option>
              <option value="emprendedor">Emprendedor</option>
            </select>
            <div id="registroUsuario">
              <input type="text" id="nombreUsuario" placeholder="Nombre" />
              <input type="email" id="correoRegistroUsuario" placeholder="Correo electrónico" />
              <input type="password" id="contrasenaRegistroUsuario" placeholder="Contraseña" />
            </div>
            <div id="registroEmprendedor" className="hidden">
              <input type="text" id="nombreNegocio" placeholder="Nombre del negocio" required />
              <input type="email" id="correoNegocio" placeholder="Correo electrónico" required />
              <input type="password" id="contrasenaNegocio" placeholder="Contraseña" required />
              <input type="text" id="contactoNegocio" placeholder="Número de contacto" required />
              <input type="text" id="direccionNegocio" placeholder="Dirección del negocio" required />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>

      {/* Panel de emprendedor */}
      <div id="panel-emprendedor" className="hidden">
        <h3>Panel de Emprendedor</h3>
        <form id="form-producto">
          <h4>Subir Producto</h4>
          <input type="text" id="nombreProducto" placeholder="Nombre del producto" required />
          <input type="number" id="precioProducto" placeholder="Precio" required />
          <input type="text" id="empresaProducto" placeholder="Nombre de la empresa" required />
          <input type="text" id="contactoProducto" placeholder="Contacto de la empresa" required />
          <input type="number" id="unidadesProducto" placeholder="Unidades deseadas" required />
          <select id="categoriaProducto" required>
            <option value="guantes">Guantes</option>
            <option value="cascos">Cascos</option>
            <option value="chalecos">Chalecos</option>
            <option value="botas">Botas</option>
            <option value="otros">Otros</option>
          </select>
          <textarea id="descripcionProducto" placeholder="Descripción"></textarea>
          <input type="file" id="imagenProducto" />
          <button type="submit">Guardar Producto</button>
        </form>
      </div>
    </main>
  );
};

export default Registro;