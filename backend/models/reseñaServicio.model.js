const db = require('../db/connection');

const agregarReseñaServicio = (datos, callback) => {
  const { usuario_id, servicio_id, calificacion, comentario } = datos;
  db.query(
    `INSERT INTO reseñas_servicios (usuario_id, servicio_id, calificacion, comentario) 
     VALUES (?, ?, ?, ?)`,
    [usuario_id, servicio_id, calificacion, comentario],
    callback
  );
};

const obtenerReseñasDeServicio = (servicioId, callback) => {
  db.query(
    `SELECT r.*, u.nombre AS usuario 
     FROM reseñas_servicios r 
     JOIN usuarios u ON r.usuario_id = u.id 
     WHERE r.servicio_id = ?`,
    [servicioId],
    callback
  );
};

module.exports = {
  agregarReseñaServicio,
  obtenerReseñasDeServicio
};
