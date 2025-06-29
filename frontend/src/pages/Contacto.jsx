import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [modal, setModal] = useState(null);

  const abrirModal = (tipo) => setModal(tipo);
  const cerrarModal = () => setModal(null);

  return (
    <div className="contacto-container">
      {/* Header con imagen de fondo solo en la parte superior */}
      <header className="contacto-header">
        <h1>Contáctanos FerreCorp</h1>
      </header>

      {/* Tarjetas de contacto */}
      <div className="contacto-cards">
        <div className="contacto-card">
          <div className="card-header">
            <span className="icon whatsapp">📱</span>
            <h3>WhatsApp</h3>
          </div>
          <p>Comunícate con nosotros por WhatsApp</p>
          <button onClick={() => abrirModal('whatsapp')}>Iniciar conversación</button>
        </div>

        <div className="contacto-card">
          <div className="card-header">
            <span className="icon telegram">✈️</span>
            <h3>Telegram</h3>
          </div>
          <p>Chatea con nuestro soporte en Telegram</p>
          <button onClick={() => abrirModal('telegram')}>Iniciar conversación</button>
        </div>

        <div className="contacto-card">
          <div className="card-header">
            <span className="icon facebook">📘</span>
            <h3>Facebook</h3>
          </div>
          <p>Síguenos y contáctanos en Facebook</p>
          <button onClick={() => abrirModal('facebook')}>Iniciar</button>
        </div>

        <div className="contacto-card">
          <div className="card-header">
            <span className="icon phone">📞</span>
            <h3>Llámanos</h3>
          </div>
          <p>Habla con nuestros expertos FerreCorp</p>
          <button onClick={() => abrirModal('telefonos')}>Más información</button>
        </div>

        <div className="contacto-card">
          <div className="card-header">
            <span className="icon location">📍</span>
            <h3>Soporte presencial</h3>
          </div>
          <p>Encuentra un Centro de Servicio</p>
          <button onClick={() => abrirModal('ubicaciones')}>Encuentra un Centro</button>
        </div>
      </div>

      {/* Modal genérico */}
      {modal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="cerrar-btn" onClick={cerrarModal}>×</button>

            {modal === 'whatsapp' && (
              <>
                <h2>WhatsApp FerreCorp</h2>
                <img src="/img/QRwhatsApp.jpg" alt="QR WhatsApp" className="qr-img" />
                <p>Escanea para iniciar chat en WhatsApp.</p>
              </>
            )}

            {modal === 'telegram' && (
              <>
                <h2>Telegram FerreCorp</h2>
                <img src="/img/QRtelegram.jpg" alt="QR Telegram" className="qr-img" />
                <p>Escanea para iniciar chat en Telegram.</p>
              </>
            )}

            {modal === 'facebook' && (
              <>
                <h2>Facebook FerreCorp</h2>
                <img src="/img/QRfacebook.jpg" alt="QR Facebook" className="qr-img" />
                <p>Escanea para visitar nuestra página de Facebook.</p>
              </>
            )}

            {modal === 'telefonos' && (
              <>
                <h2>Números de FerreCorp</h2>
                <ul className="info-list">
                  <li>Central: +51 01 234 5678</li>
                  <li>Lima: +51 01 987 6543</li>
                  <li>Cusco: +51 084 345 678</li>
                </ul>
              </>
            )}

            {modal === 'ubicaciones' && (
              <>
                <h2>Centros de Servicio FerreCorp</h2>
                  <ul className="info-list">
                  <li>Av. Industrial 123, Lima</li>
                  <li>Jr. Comercio 456, Cusco</li>
                  <li>Av. Arequipa 789, Arequipa</li>
                </ul>
                <div className="map-container">
                  <iframe
                    title="Mapa de Centros de Servicio FerreCorp"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1234567890123!2d-77.0420000!3d-12.0430000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c89abcdef123%3A0xabcdef1234567890!2sAv.%20Industrial%20123%2C%20Lima!5e0!3m2!1ses-419!2spe!4v1680000000000!5m2!1ses-419!2spe"
                    frameBorder="0"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Contacto;
