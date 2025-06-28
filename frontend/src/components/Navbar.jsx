import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img 
            src="/img/logo.png" 
            alt="Ferre Corp" 
            className="navbar-logo" 
          />
        </Link>

        <nav className="navbar-nav">
          <ul className="navbar-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/registro">Registro</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;