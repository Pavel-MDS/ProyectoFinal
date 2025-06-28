import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Productos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [seleccionados, setSeleccionados] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Productos estáticos de ejemplo
    const productosEstaticos = [
      {
        nombre: 'Bota Liviana',
        precio: 25.00,
        categoria: 'botas',
        contacto: 'empresa@ejemplo.com',
        descripcion: 'Flexible y versátil para todo tipo de superficies.',
        imagen: null,
        imagenNombre: 'bota.jpg'
      },
      {
        nombre: 'Casco para ingeniero',
        precio: 35.00,
        categoria: 'cascos',
        contacto: 'empresa2@ejemplo.com',
        descripcion: 'Con rachet flexible.',
        imagen: null,
        imagenNombre: 'casco.jpg'
      }
    ];

    // Cargar productos guardados en localStorage
    const guardados = JSON.parse(localStorage.getItem('productos') || '[]');
    
    // Combinar productos (eliminando duplicados por nombre)
    const todosProductos = [...productosEstaticos, ...guardados];
    const productosUnicos = todosProductos.reduce((acc, current) => {
      const existe = acc.find(item => item.nombre === current.nombre);
      return existe ? acc : [...acc, current];
    }, []);

    setProductos(productosUnicos);
  }, []);

  const filtrarProductos = () => {
    return productos.filter(p => 
      categoriaFiltro === 'todos' || p.categoria === categoriaFiltro
    );
  };

  const manejarSeleccion = (producto) => {
    setDetalle({ ...producto, cantidad: 1 });
  };

  const actualizarCantidad = (cantidad) => {
    if (!detalle) return;
    
    const actualizado = { 
      ...detalle, 
      cantidad: Math.max(1, parseInt(cantidad) || 1) 
    };
    
    setDetalle(actualizado);
    
    const yaExisteIndex = seleccionados.findIndex(p => p.nombre === actualizado.nombre);
    let nuevosSeleccionados;
    
    if (yaExisteIndex >= 0) {
      nuevosSeleccionados = [...seleccionados];
      nuevosSeleccionados[yaExisteIndex] = actualizado;
    } else {
      nuevosSeleccionados = [actualizado, ...seleccionados].slice(0, 5);
    }
    
    setSeleccionados(nuevosSeleccionados);
  };

  const eliminarSeleccion = (index) => {
    const nuevos = [...seleccionados];
    nuevos.splice(index, 1);
    setSeleccionados(nuevos);
  };

  const comprar = () => {
    if (seleccionados.length === 0) {
      alert('Por favor seleccione al menos un producto');
      return;
    }
    
    localStorage.setItem('carrito', JSON.stringify(seleccionados));
    navigate('/checkout');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/registro');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="productos-container">
        <div className="filtros-section">
          <h2>Nuestros Productos</h2>
          <div className="filtro-control">
            <label htmlFor="filtro-categoria">
              <strong>Filtrar por categoría:</strong>
            </label>
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
        </div>

        <div className="contenedor-productos">
          <div className="lista-productos">
            {filtrarProductos().map((producto, i) => (
              <div className="producto-card" key={i}>
                <div className="producto-imagen">
                  <img 
                    src={producto.imagen || `/img/${producto.imagenNombre || 'placeholder.jpg'}`}
                    alt={producto.nombre}
                    onError={(e) => {
                      e.target.src = '/img/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="producto-info">
                  <h3>{producto.nombre}</h3>
                  <p className="descripcion">{producto.descripcion}</p>
                  <p className="precio">
                    <strong>S/ {producto.precio.toFixed(2)}</strong>
                  </p>
                  <button 
                    className="btn-seleccionar"
                    onClick={() => manejarSeleccion(producto)}
                  >
                    Seleccionar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="panel-lateral">
            <div className="resumen-compra">
              <h3>Tu Selección</h3>
              
              {seleccionados.length === 0 ? (
                <p className="mensaje-vacio">No hay productos seleccionados</p>
              ) : (
                <>
                  <ul className="lista-seleccionados">
                    {seleccionados.map((p, i) => (
                      <li key={i} className="item-seleccionado">
                        <span>
                          {p.nombre} (x{p.cantidad}) - S/ {(p.precio * p.cantidad).toFixed(2)}
                        </span>
                        <button 
                          className="btn-eliminar"
                          onClick={() => eliminarSeleccion(i)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="total-section">
                    <h4>
                      Total: S/ {seleccionados.reduce((sum, p) => sum + (p.precio * p.cantidad), 0).toFixed(2)}
                    </h4>
                  </div>
                  
                  <button 
                    className="btn-comprar"
                    onClick={comprar}
                    disabled={seleccionados.length === 0}
                  >
                    Proceder al Pago
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {detalle && (
          <div className="modal-detalle">
            <div className="modal-contenido">
              <button 
                className="cerrar-modal"
                onClick={() => setDetalle(null)}
              >
                ×
              </button>
              
              <h3>{detalle.nombre}</h3>
              <div className="detalle-info">
                <p><strong>Descripción:</strong> {detalle.descripcion}</p>
                <p><strong>Contacto:</strong> {detalle.contacto}</p>
                <p><strong>Precio unitario:</strong> S/ {detalle.precio.toFixed(2)}</p>
                
                <div className="cantidad-control">
                  <label htmlFor="det-cantidad">
                    <strong>Cantidad:</strong>
                  </label>
                  <input
                    type="number"
                    id="det-cantidad"
                    min="1"
                    value={detalle.cantidad}
                    onChange={(e) => actualizarCantidad(e.target.value)}
                  />
                </div>
                
                <button 
                  className="btn-confirmar"
                  onClick={() => {
                    actualizarCantidad(detalle.cantidad);
                    setDetalle(null);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Productos;