const db = require('../db/connection');

// PRODUCTOS
const agregarFavoritoProducto = (usuarioId, productoId, callback) => {
  db.query(
    `INSERT IGNORE INTO favoritos_usuarios_productos (usuario_id, producto_id) 
     VALUES (?, ?)`,
    [usuarioId, productoId],
    callback
  );
};

const obtenerFavoritosProductos = (usuarioId, callback) => {
  db.query(
    `SELECT f.*, p.nombre AS nombre_producto 
     FROM favoritos_usuarios_productos f 
     JOIN productos p ON f.producto_id = p.id 
     WHERE f.usuario_id = ?`,
    [usuarioId],
    callback
  );
};

// SERVICIOS
const agregarFavoritoServicio = (usuarioId, servicioId, callback) => {
  db.query(
    `INSERT IGNORE INTO favoritos_usuarios_servicios (usuario_id, servicio_id) 
     VALUES (?, ?)`,
    [usuarioId, servicioId],
    callback
  );
};

const obtenerFavoritosServicios = (usuarioId, callback) => {
  db.query(
    `SELECT f.*, s.nombre AS nombre_servicio 
     FROM favoritos_usuarios_servicios f 
     JOIN servicios s ON f.servicio_id = s.id 
     WHERE f.usuario_id = ?`,
    [usuarioId],
    callback
  );
};

module.exports = {
  // Productos
  agregarFavoritoProducto,
  obtenerFavoritosProductos,
  // Servicios
  agregarFavoritoServicio,
  obtenerFavoritosServicios
};
