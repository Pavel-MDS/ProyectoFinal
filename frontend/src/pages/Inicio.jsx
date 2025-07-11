import { useEffect, useState } from 'react';
import './Inicio.css';
import axios from 'axios';

const Inicio = () => {
  const [productosEstrella, setProductosEstrella] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/productos')
      .then(res => {
        // Selección arbitraria: productos con precio > 100
        const destacados = res.data.filter(p => p.precio >= 100).slice(0, 4);
        setProductosEstrella(destacados);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="inicio-section">
      <div className="caja-translucida">
        <h1 className="inicio-titulo">
          Bienvenido a <span className="highlight">FerreCorp</span>
        </h1>
        <p className="inicio-descripcion">
          Todo lo que necesitas para tus proyectos de construcción, remodelación o mantenimiento.
        </p>
        <a href="/productos" className="btn-ver-productos">Ver Productos</a>
        <div className="inicio-imagen-container">
          <img
            src="/img/Ferreteria.jpg"
            alt="Ferretería Ferre Corp"
            className="inicio-imagen"
            loading="lazy"
          />
        </div>
      </div>

      <section className="ofertas-especiales">
        <h2>🎉 Ofertas Especiales</h2>
        <div className="oferta-lista">
          <div className="oferta-card">🔧 20%  de descuento en herramientas eléctricas</div>
          <div className="oferta-card">🛠 Compra 2 llaves inglesas y lleva 1 gratis</div>
          <div className="oferta-card">👷 Cascos certificados desde S/ 49</div>
        </div>
      </section>

      <section className="productos-estrella">
        <h2>⭐ Productos Estrella</h2>
        <div className="grid-productos">
          {productosEstrella.length === 0 ? (
            <p>No hay productos destacados aún.</p>
          ) : (
            productosEstrella.map(p => (
              <div key={p.id} className="producto-card">
                <img src={p.imagen_url} alt={p.nombre} className="producto-img" />
                <h3>{p.nombre}</h3>
                <p>S/. {Number(p.precio).toFixed(2)}</p>
                <p className="desc">{p.descripcion}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Inicio;
