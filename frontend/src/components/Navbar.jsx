import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Cerrar menú al hacer clic en un enlace (móvil)
  const closeMenu = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Toggle del menú hamburguesa
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img 
            src="/img/logo.png" 
            alt="Ferre Corp" 
            className="navbar-logo" 
          />
        </Link>

        {/* Botón hamburguesa */}
        <button 
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Overlay para cerrar menú en móvil */}
        <div 
          className={`navbar-overlay ${isOpen ? 'active' : ''}`}
          onClick={closeMenu}
        ></div>

        {/* Menú de navegación */}
        <nav className={`navbar-nav ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/registro" onClick={closeMenu}>Registro</Link></li>
            <li><Link to="/productos" onClick={closeMenu}>Productos</Link></li>
            <li><Link to="/servicios" onClick={closeMenu}>Servicios</Link></li>
            <li><Link to="/nosotros" onClick={closeMenu}>Nosotros</Link></li>
            <li><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;