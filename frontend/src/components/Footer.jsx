import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} FerreCorp. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
