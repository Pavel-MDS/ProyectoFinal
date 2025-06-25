import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container-fluid">
        <h1>Ferre Corp</h1>
        <nav>
          <ul className="navbar-links">
            <li><a href="/registro">Registro</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
