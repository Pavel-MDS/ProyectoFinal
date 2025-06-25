import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Inicio from './pages/Inicio';
import Registro from './pages/Registro';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          {/* agregar más rutas aquí */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
