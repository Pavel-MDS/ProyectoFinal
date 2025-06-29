import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Servicios.css';
import axios from 'axios';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const [valoracion, setValoracion] = useState(false);
  const [comentario, setComentario] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [servicioResumen, setServicioResumen] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/registro');
      return;
    }

    axios.get('http://localhost:3001/api/servicios')
      .then(res => setServicios(res.data))
      .catch(err => console.error('Error al cargar servicios:', err));
  }, [navigate]);

  const seleccionarServicio = (servicio) => {
    setDetalle(servicio);
    setValoracion(false);
    setComentario('');
  };

  const cerrarModal = () => {
    setDetalle(null);
    setValoracion(false);
    setComentario('');
  };

  const confirmarServicio = () => {
    if (!detalle) return;
    setServicioResumen({
      nombre: detalle.nombre,
      horario: detalle.horario,
      contacto: detalle.contacto,
      imagen_url: detalle.imagen_url,
      valoracion,
      comentario
    });
    setMostrarResumen(true);
    cerrarModal();
  };

  const cerrarResumen = () => {
    setMostrarResumen(false);
    setServicioResumen(null);
  };

  const pagarServicio = () => {
    navigate('/registro');
  };

  const categorias = [
    'todos',
    'Instalación de productos',
    'Servicio de plomería',
    'Servicio eléctrico',
    'Mantenimiento de herramientas',
    'Corte de materiales',
    'Alquiler de herramientas o maquinaria',
    'Servicios Logísticos',
    'Asesoría técnica personalizada',
    'Fabricación a medida',
    'Instalación de sistemas de seguridad'
  ];

  const filtrarServicios = () => {
    if (categoriaFiltro === 'todos') return servicios;
    return servicios.filter(s => s.categoria === categoriaFiltro);
  };

  return (
    <main className="servicios-container">
      <h2 className="titulo-servicios">Servicios Ofrecidos</h2>

      <div className="filtros-section">
        <label htmlFor="filtro-categoria"><strong>Filtrar por categoría:</strong></label>
        <select
          id="filtro-categoria"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="contenedor-servicios">
        <div className="lista-servicios">
          {filtrarServicios().map((serv, i) => (
            <div className="servicio-card" key={i}>
              <img
                src={serv.imagen_url || '/img/placeholder.jpg'}
                alt={serv.nombre}
                onError={(e) => e.target.src = '/img/placeholder.jpg'}
              />
              <div className="servicio-info">
                <h3>{serv.nombre}</h3>
                <p>{serv.descripcion_corta}</p>
                <p><strong>Horario:</strong> {serv.horario}</p>
                <p><strong>Contacto:</strong> {serv.contacto}</p>
                <button onClick={() => seleccionarServicio(serv)}>Ver Detalle</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalle */}
      {detalle && (
        <div className="modal-detalle">
          <div className="modal-contenido">
            <button onClick={cerrarModal} className="cerrar-modal">×</button>
            <h3>{detalle.nombre}</h3>
            <img
              src={detalle.imagen_url || '/img/placeholder.jpg'}
              alt={detalle.nombre}
              onError={(e) => e.target.src = '/img/placeholder.jpg'}
            />
            <p><strong>Descripción:</strong> {detalle.descripcion_detallada}</p>
            <p><strong>Contacto:</strong> {detalle.contacto}</p>
            <p><strong>Horario:</strong> {detalle.horario}</p>

            <div>
              <label>¿Te gusta este servicio?</label>
              <button onClick={() => setValoracion(!valoracion)}>
                {valoracion ? '👍 Me gusta' : 'Dar me gusta'}
              </button>
            </div>

            <div>
              <label>Comentario:</label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                maxLength="200"
              />
              <div>{comentario.length}/200 caracteres</div>
            </div>

            <button onClick={confirmarServicio}>Adquirir Servicio</button>
          </div>
        </div>
      )}

      {/* Barra lateral de resumen */}
      {mostrarResumen && servicioResumen && (
        <div className="resumen-lateral">
          <div className="resumen-contenido">
            <h3>Resumen del Servicio</h3>
            <img
              src={servicioResumen.imagen_url || '/img/placeholder.jpg'}
              alt={servicioResumen.nombre}
              className="resumen-img"
              onError={(e) => e.target.src = '/img/placeholder.jpg'}
            />
            <p><strong>Servicio:</strong> {servicioResumen.nombre}</p>
            <p><strong>Horario:</strong> {servicioResumen.horario}</p>
            <p><strong>Contacto:</strong> {servicioResumen.contacto}</p>
            <p><strong>Valoración:</strong> {servicioResumen.valoracion ? '👍 Me gusta' : 'Sin valoración'}</p>
            <p><strong>Comentario:</strong> {servicioResumen.comentario || 'Ninguno'}</p>
            <div className="botones-resumen">
              <button onClick={cerrarResumen}>Cancelar</button>
              <button onClick={pagarServicio}>Pagar Servicio</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Servicios;
