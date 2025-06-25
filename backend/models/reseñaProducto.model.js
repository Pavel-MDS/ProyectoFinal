const db = require('../db/connection');

const agregarReseñaProducto = (datos, callback) => {
  const { usuario_id, producto_id, calificacion, comentario } = datos;
  db.query(
    `INSERT INTO reseñas_productos (usuario_id, producto_id, calificacion, comentario) 
     VALUES (?, ?, ?, ?)`,
    [usuario_id, producto_id, calificacion, comentario],
    callback
  );
};

const obtenerReseñasDeProducto = (productoId, callback) => {
  db.query(
    `SELECT r.*, u.nombre AS usuario 
     FROM reseñas_productos r 
     JOIN usuarios u ON r.usuario_id = u.id 
     WHERE r.producto_id = ?`,
    [productoId],
    callback
  );
};

module.exports = {
  agregarReseñaProducto,
  obtenerReseñasDeProducto
};
