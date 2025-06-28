import { Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Inicio from '../pages/Inicio';
import Registro from '../pages/Registro';
import Productos from '../pages/Productos';
import DashboardUsuario from '../pages/DashboardUsuario';
import DashboardEmprendimiento from '../pages/DashboardEmprendimiento';

const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/productos" element={<Productos />} />
    </Route>
      <Route path="/dashboard/usuario" element={<DashboardUsuario />} />
      <Route path="/dashboard/emprendimiento" element={<DashboardEmprendimiento />} />
  </Routes>
);

export default AppRouter;
