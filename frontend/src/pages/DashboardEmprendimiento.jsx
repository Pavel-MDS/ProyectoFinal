import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';
import { CgLayoutGrid } from 'react-icons/cg';

const DashboardEmprendimiento = () => {
  const [emprendimiento, setEmprendimiento] = useState(null);
  const [ventas, setVentas] = useState(0);
  const [calificacion, setCalificacion] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioServicio, setMostrarFormularioServicio] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);


  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: '',
    imagen: null,
    imagenNombre: '',
    contacto: ''
  });
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: '',
    descripcion_corta: '',
    descripcion_detallada: '',
    horario: '',
    contacto: '',
    imagen_url: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tipo = localStorage.getItem('tipo');
    
    if (tipo !== 'emprendimiento') {
      navigate('/registro');
      return;
    }

    axios.get('/api/emprendimientos/me', { 
      headers: { Authorization: `Bearer ${token}` } 
    })
    .then(res => {
      setEmprendimiento(res.data);
      setNuevoProducto(prev => ({
        ...prev,
        contacto: res.data.contacto || 'sin contacto'
      }));
    })
    .catch(err => {
      console.error('Error al cargar datos:', err);
      alert('Error al cargar datos del emprendimiento');
    });

    axios.get('/api/emprendimientos/estadisticas', { 
      headers: { Authorization: `Bearer ${token}` } 
    })
    .then(res => {
      setVentas(res.data.ventas);
      setCalificacion(res.data.promedio);
    })
    .catch(console.error);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    navigate('/registro');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen no debe exceder los 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNuevoProducto({
        ...nuevoProducto,
        imagen: reader.result,
        imagenNombre: file.name
      });
    };
    reader.readAsDataURL(file);
  };
/************************************/


/*******************************/
  const handleAgregarProducto = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!nuevoProducto.nombre || !nuevoProducto.categoria || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.imagen) {
    alert('Completa todos los campos');
    return;
  }

  
  try {
    console.log({nuevoProducto})
    await axios.post('http://localhost:3001/api/productos', {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: parseFloat(nuevoProducto.precio),
      imagen: nuevoProducto.imagen, // cadena base64 o url
      categoria: nuevoProducto.categoria  
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert('✅ Producto agregado');
    setMostrarFormulario(false);
    // Refrescar lista
    const res = await axios.get(`http://localhost:3001/api/emprendimientos/${emprendimiento.id}/contenido`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProductos(res.data.filter(i => i.tipo === 'producto'));
  } catch (err) {
    console.error('❌ Error al guardar producto:', err.response?.data || err);
    alert('❌ Error al guardar producto: ' + (err.response?.data?.error || 'Error interno'));
  }
};


  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!emprendimiento?.id) return;

    axios.get(`/api/emprendimientos/${emprendimiento.id}/contenido`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const contenido = res.data;
      setProductos(contenido.filter(item => item.tipo === 'producto'));
      setServicios(contenido.filter(item => item.tipo === 'servicio'));
    })
    .catch(err => {
      console.error('Error al obtener contenido:', err);
    });

  }, [emprendimiento]);




  const handleAgregarServicio = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!nuevoServicio.nombre || !nuevoServicio.descripcion_corta || !nuevoServicio.descripcion_detallada || !nuevoServicio.horario || !nuevoServicio.imagen_url) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/servicios', {
        ...nuevoServicio,
        emprendimiento_id: emprendimiento?.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ Servicio agregado con éxito');
      setNuevoServicio({
        nombre: '',
        descripcion_corta: '',
        descripcion_detallada: '',
        horario: '',
        contacto: emprendimiento?.contacto || '',
        imagen_url: ''
      });
      setMostrarFormularioServicio(false);
    } catch (error) {
      console.error(error);
      alert('❌ Error al agregar servicio');
    }
  };

  return (
    <>
      <Navbar />
      <main className="dashboard">
        <div className="dashboard-header">
          <h1>¡Bienvenido, {emprendimiento?.nombre_negocio}!</h1>
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
        {/* PROBANDO */}
        <h2>🛒 Productos</h2>
          {productos?.length === 0 ? (
            <p>No hay productos registrados.</p>
          ) : (
            <ul>
              {productos.map((p) => (
                <li key={`prod-${p.id}`}>
                  <strong>{p.nombre}</strong> – S/. {Number(p.precio).toFixed(2)}<br />
                  <span>{p.descripcion}</span>
                </li>
              ))}
            </ul>
          )}

          <h2>🛠 Servicios</h2>
          {servicios?.length === 0 ? (
            <p>No hay servicios registrados.</p>
          ) : (
            <ul>
              {servicios.map((s) => (
                <li key={`serv-${s.id}`}>
                  <strong>{s.nombre}</strong><br />
                  <span>{s.descripcion || s.descripcion_corta}</span><br />
                  <em>Horario: {s.horario}</em>
                </li>
              ))}
            </ul>
          )}

        
        <div className="stats-grid">
          <div className="stat-card">
            <h2>{ventas}</h2>
            <p>📊 Total ventas</p>
          </div>
          <div className="stat-card">
            <h2>{calificacion}/5</h2>
            <p>⭐ Calificación promedio</p>
          </div>
        </div>
        
        <div className="actions">
          <button 
            className="btn-primary" 
            onClick={() => setMostrarFormulario(true)}
          >
            📦 Agregar Producto
          </button>
          <button 
           className="btn-secondary"
           onClick={() => setMostrarFormularioServicio(true)}
            
          >
            🛠 Agregar Servicio
          </button>
        </div>

        {/* Modal para agregar producto */}
        {mostrarFormulario && (
          <div className="modal-overlay">
            <div className="modal-producto">
              <h2>Agregar Nuevo Producto</h2>
              <form onSubmit={handleAgregarProducto}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nombre del producto*"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({
                      ...nuevoProducto,
                      nombre: e.target.value
                    })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <select
                    value={nuevoProducto.categoria}
                    onChange={(e) => setNuevoProducto({
                      ...nuevoProducto,
                      categoria: e.target.value
                    })}
                    required
                  >
                    <option value="">Seleccione categoría*</option>
                    <option value="guantes">Guantes</option>
                    <option value="cascos">Cascos</option>
                    <option value="chaleco">Chalecos</option>
                    <option value="botas">Botas</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <textarea
                    placeholder="Descripción detallada*"
                    value={nuevoProducto.descripcion}
                    onChange={(e) => setNuevoProducto({
                      ...nuevoProducto,
                      descripcion: e.target.value
                    })}
                    required
                    rows={4}
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Precio (S/)*"
                    value={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({
                      ...nuevoProducto,
                      precio: e.target.value
                    })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="imagen-producto">Imagen del producto*</label>
                  <input
                    type="file"
                    id="imagen-producto"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                  />
                  {nuevoProducto.imagen && (
                    <div className="image-preview">
                      <img 
                        src={nuevoProducto.imagen} 
                        alt="Vista previa" 
                      />
                      <span>{nuevoProducto.imagenNombre}</span>
                    </div>
                  )}
                </div>
                
                <div className="modal-buttons">
                  <button 
                    type="button" 
                    className="btn-cancelar"
                    onClick={() => setMostrarFormulario(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn-guardar"
                  >
                    Guardar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Agregar Servicio */}
        {mostrarFormularioServicio && (
          <div className="modal-overlay">
            <div className="modal-producto">
              <h2>Agregar Nuevo Servicio</h2>
              <form onSubmit={handleAgregarServicio}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nombre del servicio*"
                    value={nuevoServicio.nombre}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Descripción corta*"
                    value={nuevoServicio.descripcion_corta}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion_corta: e.target.value })}
                    required
                    rows={2}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Descripción detallada*"
                    value={nuevoServicio.descripcion_detallada}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion_detallada: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Horario*"
                    value={nuevoServicio.horario}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, horario: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Contacto"
                    value={nuevoServicio.contacto}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, contacto: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="URL de la imagen*"
                    value={nuevoServicio.imagen_url}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, imagen_url: e.target.value })}
                    required
                  />
                  {nuevoServicio.imagen_url && (
                    <div className="image-preview">
                      <img src={nuevoServicio.imagen_url} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                    </div>
                  )}
                </div>
                <div className="modal-buttons">
                  <button type="button" className="btn-cancelar" onClick={() => setMostrarFormularioServicio(false)}>Cancelar</button>
                  <button type="submit" className="btn-guardar">Guardar Servicio</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default DashboardEmprendimiento;
      