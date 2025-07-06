import React from 'react';
import './Nosotros.css';

const Nosotros = () => {
  return (
    <main className="nosotros-container">
      <section className="nosotros-banner">
        <h1>Sobre FerreCorp</h1>
        <p>Tu aliado en proyectos desde 2023</p>
      </section>

      <section className="nosotros-info">
        <h2>Nuestra Misión</h2>
        <p>
          En FerreCorp, buscamos ser la ferretería de referencia en Perú, brindando productos y servicios de calidad para impulsar los proyectos de nuestros clientes.
        </p>

        <h2>Visión</h2>
        <p>
          Ser líderes en soluciones para construcción, mantenimiento y hogar, destacando por nuestra innovación, compromiso y atención personalizada.
        </p>

        <h2>Valores</h2>
        <ul>
          <li>✅ Confianza</li>
          <li>✅ Compromiso</li>
          <li>✅ Innovación</li>
          <li>✅ Responsabilidad</li>
        </ul>
      </section>

      <section className="nosotros-equipo">
        <h2>Conoce al equipo</h2>
        <div className="miembros">
          <div className="miembro">
            <img src="/img/team1.png" alt="Miembro del equipo" />
            <p>José Antonio C. — Fundador</p>
          </div>
          <div className="miembro">
            <img src="/img/team2.png" alt="Miembro del equipo" />
            <p>Derly H. — Atención al Cliente</p>
          </div>
          <div className="miembro">
            <img src="/img/team3.png" alt="Miembro del equipo" />
            <p>Pavel M. — Jefe de Logística</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;
