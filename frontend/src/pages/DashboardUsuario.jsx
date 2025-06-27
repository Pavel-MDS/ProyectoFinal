import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import './Dashboard.css';

const DashboardUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [stats, setStats] = useState({ compras: 0, favoritos: 0, reseñas: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/usuarios/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsuario(res.data))
      .catch(console.error);

    axios.get('/api/usuarios/estadisticas', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStats(res.data))
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
      </main>
      <Footer />
    </>
  );
};

export default DashboardUsuario;
