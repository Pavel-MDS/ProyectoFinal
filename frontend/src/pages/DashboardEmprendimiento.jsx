import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import './Dashboard.css';

const DashboardEmprendimiento = () => {
  const [emprendimiento, setEmprendimiento] = useState(null);
  const [ventas, setVentas] = useState(0);
  const [calificacion, setCalificacion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/emprendimientos/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setEmprendimiento(res.data))
      .catch(console.error);

    axios.get('/api/emprendimientos/estadisticas', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setVentas(res.data.ventas);
        setCalificacion(res.data.promedio);
      })
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
          <h1>¡Bienvenido, {emprendimiento?.nombre_negocio}!</h1>
          <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
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
          <button className="btn-primary">📦 Subir Producto</button>
          <button className="btn-secondary">🛠 Subir Servicio</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardEmprendimiento;
