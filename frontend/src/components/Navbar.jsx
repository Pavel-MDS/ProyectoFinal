import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { token, tipo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false); // Cerrar menú si cambia a desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const closeMenu = () => {
    if (isMobile) setIsOpen(false);
  };
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/registro');
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img src="/img/logo.png" alt="Ferre Corp" className="navbar-logo" />
        </Link>

        <button
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div
          className={`navbar-overlay ${isOpen ? 'active' : ''}`}
          onClick={closeMenu}
        ></div>

        <nav className={`navbar-nav ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
            {!token && (
              <li><Link to="/registro" onClick={closeMenu}>Registro</Link></li>
            )}
            {token && tipo === 'usuario' && (
              <li><Link to="/dashboard/usuario" onClick={closeMenu}>Perfil</Link></li>
            )}
            {token && tipo === 'emprendimiento' && (
              <li><Link to="/dashboard/emprendimiento" onClick={closeMenu}>Perfil</Link></li>
            )}
            <li><Link to="/productos" onClick={closeMenu}>Productos</Link></li>
            <li><Link to="/servicios" onClick={closeMenu}>Servicios</Link></li>
            <li><Link to="/nosotros" onClick={closeMenu}>Nosotros</Link></li>
            <li><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
            {token && (
              <li>
                <button className="btn-logout" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
