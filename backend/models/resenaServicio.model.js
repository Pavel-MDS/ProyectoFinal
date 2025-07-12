const db = require('../db/connection');

// Agrega una reseña de servicio
const agregarResenaServicio = (datos, callback) => {
  const { usuario_id, servicio_id, calificacion, comentario } = datos;
  db.query(
    `INSERT INTO reseñas_servicios (usuario_id, servicio_id, calificacion, comentario) 
     VALUES (?, ?, ?, ?)`,
    [usuario_id, servicio_id, calificacion, comentario],
    callback
  );
};

// Obtiene todas las reseñas para un servicio específico
const obtenerResenasDeServicio = (servicioId, callback) => {
  db.query(
    `SELECT r.*, u.nombre AS usuario 
     FROM reseñas_servicios r 
     JOIN usuarios u ON r.usuario_id = u.id 
     WHERE r.servicio_id = ?`,
    [servicioId],
    callback
  );
};

// Obtiene todas las reseñas hechas por un usuario (solo servicios)
const obtenerResenasDeUsuario = (usuarioId, callback) => {
  db.query(
    `SELECT r.*, s.nombre AS nombre_item, 'servicio' AS tipo
     FROM reseñas_servicios r
     JOIN servicios s ON r.servicio_id = s.id
     WHERE r.usuario_id = ?`,
    [usuarioId],
    callback
  );
};

module.exports = {
  agregarResenaServicio,
  obtenerResenasDeServicio,
  obtenerResenasDeUsuario
};
