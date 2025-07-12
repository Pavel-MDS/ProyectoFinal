import React from 'react';
import './Nosotros.css';
import { motion } from 'framer-motion';
import { FaHandshake, FaLightbulb, FaShieldAlt, FaUserCheck } from 'react-icons/fa';

const Nosotros = () => {
  return (
    <main className="nosotros-container">
      <section className="nosotros-banner">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          Sobre FerreCorp
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Tu aliado en proyectos desde 2023
        </motion.p>
      </section>

      <section className="nosotros-info">
        <motion.div className="nosotros-card" whileHover={{ scale: 1.02 }}>
          <h2>Nuestra Misión</h2>
          <p>
            En FerreCorp, buscamos ser la ferretería de referencia en Perú, brindando productos y servicios de calidad para impulsar los proyectos de nuestros clientes.
          </p>
        </motion.div>

        <motion.div className="nosotros-card" whileHover={{ scale: 1.02 }}>
          <h2>Visión</h2>
          <p>
            Ser líderes en soluciones para construcción, mantenimiento y hogar, destacando por nuestra innovación, compromiso y atención personalizada.
          </p>
        </motion.div>

        <motion.div className="nosotros-card valores" whileHover={{ scale: 1.02 }}>
          <h2>Valores</h2>
          <ul>
            <li><FaUserCheck /> Confianza</li>
            <li><FaHandshake /> Compromiso</li>
            <li><FaLightbulb /> Innovación</li>
            <li><FaShieldAlt /> Responsabilidad</li>
          </ul>
        </motion.div>
      </section>

      <section className="nosotros-equipo">
        <h2>Conoce al equipo</h2>
        <div className="miembros">
          <motion.div className="miembro" whileHover={{ scale: 1.05 }}>
            <img src="/img/team1.png" alt="Miembro del equipo" />
            <p>José Antonio C. — Fundador</p>
          </motion.div>
          <motion.div className="miembro" whileHover={{ scale: 1.05 }}>
            <img src="/img/team2.png" alt="Miembro del equipo" />
            <p>Derly H. — Atención al Cliente</p>
          </motion.div>
          <motion.div className="miembro" whileHover={{ scale: 1.05 }}>
            <img src="/img/team3.png" alt="Miembro del equipo" />
            <p>Pavel M. — Jefe de Logística</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;
