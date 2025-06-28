import React, { useEffect, useState } from 'react';
import './Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [seleccionados, setSeleccionados] = useState([]);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const productosEstaticos = [
      {
        nombre: 'Bota Liviana',
        precio: 25.00,
        categoria: 'botas',
        contacto: 'empresa@ejemplo.com',
        descripcion: 'Flexible y versátil para todo tipo de superficies.',
        imagen: 'bota.jpg'
      },
      {
        nombre: 'Casco para ingeniero',
        precio: 35.00,
        categoria: 'cascos',
        contacto: 'empresa2@ejemplo.com',
        descripcion: 'Con rachet flexible.',
        imagen: 'casco.jpg'
      },
      {
        nombre: 'Guante Superflex',
        precio: 5.00,
        categoria: 'guantes',
        contacto: 'empresa3@ejemplo.com',
        descripcion: 'Color rojo para múltiples usos.',
        imagen: 'guante_superflex-Rojo_T-L.jpg'
      },
      {
        nombre: 'Guante Badana',
        precio: 6.00,
        categoria: 'guantes',
        contacto: 'empresa3@ejemplo.com',
        descripcion: 'Guante para conductor.',
        imagen: 'guante_badana.jpg'
      },
      {
        nombre: 'Guante de Jebe',
        precio: 7.00,
        categoria: 'guantes',
        contacto: 'empresa3@ejemplo.com',
        descripcion: 'Guante de Jebe, talla 8, calibre 35.',
        imagen: 'Gjebe8.jpg'
      }
    ];

    const guardados = JSON.parse(localStorage.getItem('productos') || '[]');
    setProductos([...productosEstaticos, ...guardados]);
  }, []);

  const filtrarProductos = () =>
    productos.filter(p => categoriaFiltro === 'todos' || p.categoria === categoriaFiltro);

  const manejarSeleccion = (producto) => {
    setDetalle({ ...producto, cantidad: 1 });
  };

  const actualizarCantidad = (cantidad) => {
    if (!detalle) return;
    const actualizado = { ...detalle, cantidad: parseInt(cantidad) || 1 };
    const yaExiste = seleccionados.find(p => p.nombre === actualizado.nombre);
    let nuevosSeleccionados;

    if (yaExiste) {
      nuevosSeleccionados = seleccionados.map(p =>
        p.nombre === actualizado.nombre ? actualizado : p
      );
    } else {
      nuevosSeleccionados = [actualizado, ...seleccionados.slice(0, 4)];
    }

    setSeleccionados(nuevosSeleccionados);
  };

  const eliminarSeleccion = (index) => {
    const nuevos = [...seleccionados];
    nuevos.splice(index, 1);
    setSeleccionados(nuevos);
  };

  const comprar = () => {
    localStorage.setItem('carrito', JSON.stringify(seleccionados));
    window.location.href = '/registro';
  };

  return (
    <main className="section">
      <div>
        <label htmlFor="filtro-categoria"><strong>Filtrar por categoría:</strong></label>
        <select
          id="filtro-categoria"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="guantes">Guantes</option>
          <option value="cascos">Cascos</option>
          <option value="chaleco">Chalecos</option>
          <option value="botas">Botas</option>
        </select>
      </div>

      <div className="contenedor-productos">
        <div className="productos">
          {filtrarProductos().map((producto, i) => (
            <div className="producto" key={i}>
              <img src={`/img/${producto.imagen}`} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p><strong>S/ {producto.precio.toFixed(2)}</strong></p>
              <button onClick={() => manejarSeleccion(producto)}>Seleccionar</button>
            </div>
          ))}
        </div>

        <div className="lateral-reciente">
          <h3>Seleccionados recientemente</h3>
          <ul id="seleccion-reciente">
            {seleccionados.map((p, i) => (
              <li key={i}>
                {p.nombre} (x{p.cantidad}) - S/ {(p.precio * p.cantidad).toFixed(2)}
                <button onClick={() => eliminarSeleccion(i)}>X</button>
              </li>
            ))}
          </ul>
          <button onClick={comprar}>Comprar</button>
        </div>
      </div>

      {detalle && (
        <div id="detalle-producto">
          <h3>{detalle.nombre}</h3>
          <p><strong>Descripción:</strong> {detalle.descripcion}</p>
          <p><strong>Contacto:</strong> {detalle.contacto}</p>
          <label htmlFor="det-cantidad">¿Cuántas unidades desea?</label>
          <input
            type="number"
            id="det-cantidad"
            min="1"
            value={detalle.cantidad}
            onChange={(e) => actualizarCantidad(e.target.value)}
          />
        </div>
      )}
    </main>
  );
};

export default Productos;
