const db = require('../db/connection');

const agregarResenaProducto = (datos, callback) => {
  const { usuario_id, producto_id, calificacion, comentario } = datos;
  db.query(
    `INSERT INTO reseñas_productos (usuario_id, producto_id, calificacion, comentario) 
     VALUES (?, ?, ?, ?)`,
    [usuario_id, producto_id, calificacion, comentario],
    callback
  );
};

const obtenerResenasDeProducto = (productoId, callback) => {
  db.query(
    `SELECT r.*, u.nombre AS usuario 
     FROM reseñas_productos r 
     JOIN usuarios u ON r.usuario_id = u.id 
     WHERE r.producto_id = ?`,
    [productoId],
    callback
  );
};

const obtenerResenasDeUsuario = (usuarioId, callback) => {
  db.query(
    `SELECT r.*, p.nombre AS nombre_item, 'producto' AS tipo
     FROM reseñas_productos r
     JOIN productos p ON r.producto_id = p.id
     WHERE r.usuario_id = ?`,
    [usuarioId],
    callback
  );
};

const obtenerTodasResenas = (callback) => {
  db.query(
    `SELECT r.*, u.nombre AS usuario, p.nombre AS producto 
     FROM reseñas_productos r
     JOIN usuarios u ON r.usuario_id = u.id
     JOIN productos p ON r.producto_id = p.id`,
    callback
  );
};

module.exports = {
  agregarResenaProducto,
  obtenerResenasDeProducto,
  obtenerResenasDeUsuario,
  obtenerTodasResenas
};
