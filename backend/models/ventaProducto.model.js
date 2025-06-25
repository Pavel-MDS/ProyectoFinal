const db = require('../db/connection');

const registrarVentaProducto = (datos, callback) => {
  const { usuario_id, producto_id, cantidad, total } = datos;
  db.query(
    `INSERT INTO ventas_productos (usuario_id, producto_id, cantidad, total) 
     VALUES (?, ?, ?, ?)`,
    [usuario_id, producto_id, cantidad, total],
    callback
  );
};

const obtenerVentasPorUsuario = (usuarioId, callback) => {
  db.query(
    `SELECT v.*, p.nombre AS nombre_producto 
     FROM ventas_productos v 
     JOIN productos p ON v.producto_id = p.id 
     WHERE v.usuario_id = ?`,
    [usuarioId],
    callback
  );
};

module.exports = {
  registrarVentaProducto,
  obtenerVentasPorUsuario
};
