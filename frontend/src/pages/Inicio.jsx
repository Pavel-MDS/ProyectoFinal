import './Inicio.css';

const Inicio = () => {
  return (
    <main className="inicio-section">
      <div className="caja-translucida">
        <h2>Bienvenido a Ferre Corp</h2>
        <p>
          Somos tu ferretería de confianza, ofreciendo productos y servicios de calidad para tus
          proyectos de construcción, remodelación o mantenimiento.
        </p>
        <img
          src="/img/Ferreteria.jpg"
          alt="Ferretería"
          className="inicio-imagen"
        />
      </div>
    </main>
  );
};

export default Inicio;
