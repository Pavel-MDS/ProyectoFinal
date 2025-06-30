// src/routes/routes.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Inicio   from '../pages/Inicio';
import Registro from '../pages/Registro';
import Productos from '../pages/Productos';
import Servicios from '../pages/Servicios';
import Contacto from '../pages/Contacto';
import DashboardUsuario from '../pages/DashboardUsuario';
import DashboardEmprendimiento from '../pages/DashboardEmprendimiento';
import ProtectedRoute from './ProtectedRoute';

<<<<<<< HEAD
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="registro" element={<Registro />} />
        <Route path="productos" element={<Productos />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="contacto" element={<Contacto />} />
        {/* Dashboards protegidos */}
        <Route
          path="dashboard/usuario"
          element={
            <ProtectedRoute requiredTipo="usuario">
              <DashboardUsuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/emprendimiento"
          element={
            <ProtectedRoute requiredTipo="emprendimiento">
              <DashboardEmprendimiento />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* opcional: ruta 404 */}
      <Route path="*" element={<p>Página no encontrada</p>} />
    </Routes>
  );
}
