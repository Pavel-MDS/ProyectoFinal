import './Inicio.css';

const Inicio = () => {
  return (
    <section className="inicio-section">
      <div className="caja-translucida">
        <h1 className="inicio-titulo">
          Bienvenido a <span className="highlight">Ferre Corp</span>
        </h1>
        <p className="inicio-descripcion">
          Somos tu ferretería de confianza, ofreciendo productos y servicios de calidad 
          para tus proyectos de construcción, remodelación o mantenimiento.
        </p>
        <div className="inicio-imagen-container">
          <img
            src="/img/Ferreteria.jpg"
            alt="Ferretería Ferre Corp"
            className="inicio-imagen"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Inicio;