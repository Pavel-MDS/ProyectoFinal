import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const DashboardUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [stats, setStats] = useState({ compras: 0, favoritos: 0, reseñas: 0 });
  const [reviews, setReviews] = useState({ productos: [], servicios: [] });
  const { logout }= useContext(AuthContext);
  const navigate = useNavigate();
  const userId= usuario?.id || null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/usuarios/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsuario(res.data))
      .catch(console.error);

    axios.get('/api/usuarios/estadisticas', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

    useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    axios.get('/api/usuarios/me', { headers }).then(res => setUsuario(res.data));
    axios.get('/api/usuarios/estadisticas', { headers }).then(res => setStats(res.data));
    axios.get('/api/resenas/usuario', { headers })
      .then(res => setReviews(res.data))
      .catch(console.error);
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
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
    </>
  );
};

export default DashboardUsuario;
