import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const DashboardUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [stats, setStats] = useState({ compras: 0, favoritos: 0, reseñas: 0 });
  const [reviews, setReviews] = useState({ productos: [], servicios: [] });
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const API = import.meta.env.VITE_API_URL;

    // Obtener usuario
    axios.get(`${API}/api/usuarios/me`, { headers })
      .then(res => setUsuario(res.data))
      .catch(err => console.error('Error al obtener usuario:', err));

    // Obtener estadísticas
    axios.get(`${API}/api/usuarios/estadisticas`, { headers })
      .then(res => setStats(res.data))
      .catch(err => console.error('Error al obtener estadísticas:', err));

    // Obtener reseñas
    axios.get(`${API}/api/resenas/usuario`, { headers })
      .then(res => setReviews(res.data))
      .catch(err => console.error('Error al obtener reseñas:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    logout(); // Limpia contexto si es necesario
    navigate('/registro');
  };

  return (
    <>
      <Navbar />
      <main className="dashboard">
        <div className="dashboard-header">
          <h1>¡Bienvenido, {usuario?.nombre}!</h1>
          <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>{stats.compras}</h2>
            <p>🛒 Compras realizadas</p>
          </div>
          <div className="stat-card">
            <h2>{stats.favoritos}</h2>
            <p>⭐ Favoritos</p>
          </div>
          <div className="stat-card">
            <h2>{stats.reseñas}</h2>
            <p>📝 Reseñas hechas</p>
          </div>
        </div>

        <section className="mis-reseñas">
          <h2>Mis reseñas</h2>

          <div className="reseñas-productos">
            <h3>Productos</h3>
            {reviews.productos.length === 0
              ? <p>No has reseñado ningún producto aún.</p>
              : reviews.productos.map(r => (
                  <div key={r.id} className="review-card">
                    <strong>{r.nombre_item}</strong> – {r.calificacion}⭐
                    <p>{r.comentario}</p>
                  </div>
                ))
            }
          </div>

          <div className="reseñas-servicios">
            <h3>Servicios</h3>
            {reviews.servicios.length === 0
              ? <p>No has reseñado ningún servicio aún.</p>
              : reviews.servicios.map(r => (
                  <div key={r.id} className="review-card">
                    <strong>{r.nombre_item}</strong> – {r.calificacion}⭐
                    <p>{r.comentario}</p>
                  </div>
                ))
            }
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DashboardUsuario;