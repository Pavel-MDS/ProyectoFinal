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

  // Función para limpiar el formulario de producto
  const limpiarFormularioProducto = () => {
    setNuevoProducto({
      nombre: '',
      categoria: '',
      descripcion: '',
      precio: '',
      imagen: null,
      imagenNombre: '',
      contacto: emprendimiento?.contacto || ''
    });
  };

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

    console.log('📸 Archivo seleccionado:', {
      nombre: file.name,
      tamaño: file.size,
      tipo: file.type
    });

    // Validar tamaño (máximo 500KB para evitar problemas con el servidor)
    if (file.size > 8* 1024 * 1024) {
      alert('La imagen no debe exceder los 8000KB. Por favor, comprime la imagen o selecciona una más pequeña.');
      return;
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // Comprimir la imagen si es necesario
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Definir tamaño máximo
        const maxWidth = 800;
        const maxHeight = 600;
        
        let { width, height } = img;
        
        // Calcular nuevas dimensiones manteniendo proporción
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertir a base64 con compresión
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        
        console.log('📸 Imagen comprimida:', {
          original: reader.result.length,
          comprimida: compressedBase64.length,
          reduccion: ((reader.result.length - compressedBase64.length) / reader.result.length * 100).toFixed(1) + '%'
        });
        
        setNuevoProducto({
          ...nuevoProducto,
          imagen: compressedBase64,
          imagenNombre: file.name
        });
      };
      img.src = reader.result;
    };
    reader.onerror = (error) => {
      console.error('Error al leer la imagen:', error);
      alert('Error al procesar la imagen');
    };
    reader.readAsDataURL(file);
  };

  const handleEditarProducto = (producto) => {
    setProductoEditando(producto.id);
    setNuevoProducto({
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      imagenNombre: '', // opcional si base64
      contacto: producto.contacto
    });
    setMostrarFormulario(true);
  };

  const handleActualizarProducto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!nuevoProducto.nombre || !nuevoProducto.categoria || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.imagen) {
      alert('Completa todos los campos');
      return;
    }

    try {
      console.log('Actualizando producto:', nuevoProducto);

      await axios.put(`http://localhost:3001/api/productos/${productoEditando}`, {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: parseFloat(nuevoProducto.precio),
        imagen: nuevoProducto.imagen,
        categoria: nuevoProducto.categoria,
        contacto: nuevoProducto.contacto
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setProductoEditando(null);
      alert('✅ Producto actualizado');
      setMostrarFormulario(false);
      limpiarFormularioProducto();
     
      const res = await axios.get(`http://localhost:3001/api/emprendimientos/${emprendimiento.id}/contenido`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(res.data.filter(i => i.tipo === 'producto'));
    } catch (err) {
      console.error('❌ Error al actualizar producto:', err.response?.data || err);
      alert('❌ Error al actualizar producto: ' + (err.response?.data?.error || 'Error interno'));
    }
  };

  const handleEliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmar) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('🗑 Producto eliminado');
      const res = await axios.get(`http://localhost:3001/api/emprendimientos/${emprendimiento.id}/contenido`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(res.data.filter(i => i.tipo === 'producto'));
    } catch (err) {
      console.error('❌ Error al eliminar producto:', err);
      alert('Error al eliminar producto');
    }
  };

  const handleAgregarProducto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!nuevoProducto.nombre || !nuevoProducto.categoria || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.imagen) {
      alert('Completa todos los campos');
      return;
    }

    // Validar tamaño del payload antes de enviar
    const payloadSize = JSON.stringify({
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: parseFloat(nuevoProducto.precio),
      imagen: nuevoProducto.imagen,
      categoria: nuevoProducto.categoria,
      contacto: nuevoProducto.contacto || emprendimiento?.contacto || ''
    }).length;

    console.log('📦 Tamaño del payload:', (payloadSize / 1024).toFixed(2) + ' KB');

    if (payloadSize > 8*1024 * 1024) { // 1MB
      alert('Los datos del producto son demasiado grandes. Por favor, usa una imagen más pequeña.');
      return;
    }

    try {
      // Debugging más detallado
      console.log('=== DEBUGGING PRODUCTO ===');
      console.log('Token:', token ? 'Presente' : 'No presente');
      console.log('Emprendimiento ID:', emprendimiento?.id);
      console.log('Producto a enviar:', {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: parseFloat(nuevoProducto.precio),
        categoria: nuevoProducto.categoria,
        contacto: nuevoProducto.contacto,
        imagen_size: nuevoProducto.imagen?.length || 0,
        imagen_preview: nuevoProducto.imagen?.substring(0, 50) + '...'
      });

      const response = await axios.post('http://localhost:3001/api/productos', {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: parseFloat(nuevoProducto.precio),
        imagen: nuevoProducto.imagen,
        categoria: nuevoProducto.categoria,
        contacto: nuevoProducto.contacto || emprendimiento?.contacto || ''
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Respuesta del servidor:', response.data);
      alert('✅ Producto agregado');
      setMostrarFormulario(false);
      limpiarFormularioProducto();
      
      // Refrescar lista
      const res = await axios.get(`http://localhost:3001/api/emprendimientos/${emprendimiento.id}/contenido`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(res.data.filter(i => i.tipo === 'producto'));
    } catch (err) {
      console.error('=== ERROR COMPLETO ===');
      console.error('Error object:', err);
      console.error('Response status:', err.response?.status);
      console.error('Response data:', err.response?.data);
      console.error('Response headers:', err.response?.headers);
      console.error('Request config:', err.config);
      
      let errorMessage = 'Error interno';
      if (err.response?.status === 413) {
        errorMessage = 'La imagen es demasiado grande. Por favor, usa una imagen más pequeña (máximo 500KB).';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.statusText) {
        errorMessage = `${err.response.status}: ${err.response.statusText}`;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert('❌ Error al guardar producto: ' + errorMessage);
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

  // Función para abrir el modal de agregar producto
  const abrirModalAgregarProducto = () => {
    limpiarFormularioProducto();
    setProductoEditando(null);
    setMostrarFormulario(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    limpiarFormularioProducto();
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
        
        <h2>🛒 Productos</h2>
        {productos?.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          <ul>
            {productos.map((p) => (
              <li key={`prod-${p.id}`}>
                <strong>{p.nombre}</strong> – S/. {Number(p.precio).toFixed(2)}<br />
                <span>{p.descripcion}</span>
                <div className="acciones-producto">
                  <button onClick={() => handleEditarProducto(p)}>✏️ Editar</button>
                  <button onClick={() => handleEliminarProducto(p.id)}>🗑 Eliminar</button>
                </div>
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
            onClick={abrirModalAgregarProducto}
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

        {/* Modal para agregar/editar producto */}
        {mostrarFormulario && (
          <div className="modal-overlay">
            <div className="modal-producto">
              <h2>{productoEditando ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
              <form onSubmit={productoEditando ? handleActualizarProducto : handleAgregarProducto}>
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
                  <label htmlFor="imagen-producto">Imagen del producto* (máximo 8MB)</label>
                  <input
                    type="file"
                    id="imagen-producto"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required={!productoEditando} // Solo requerido cuando se agrega nuevo
                  />
                  {nuevoProducto.imagen && (
                    <div className="image-preview">
                      <img 
                        src={nuevoProducto.imagen} 
                        alt="Vista previa" 
                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                      />
                      <div>
                        <span>📎 {nuevoProducto.imagenNombre}</span>
                        <br />
                        <span>📏 Tamaño: {
            nuevoProducto.imagen.length < 1024 * 1024
              ? (nuevoProducto.imagen.length / 1024).toFixed(1) + ' KB'
              : (nuevoProducto.imagen.length / 1024 / 1024).toFixed(2) + ' MB'
          }</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="modal-buttons">
                  <button 
                    type="button" 
                    className="btn-cancelar"
                    onClick={cerrarModal}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn-guardar"
                  >
                    {productoEditando ? 'Actualizar Producto' : 'Guardar Producto'}
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