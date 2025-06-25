const db = require('../db/connection');

const registrarVentaServicio = (datos, callback) => {
  const { usuario_id, servicio_id } = datos;
  db.query(
    `INSERT INTO ventas_servicios (usuario_id, servicio_id) 
     VALUES (?, ?)`,
    [usuario_id, servicio_id],
    callback
  );
};

const obtenerVentasServiciosPorUsuario = (usuarioId, callback) => {
  db.query(
    `SELECT v.*, s.nombre AS nombre_servicio 
     FROM ventas_servicios v 
     JOIN servicios s ON v.servicio_id = s.id 
     WHERE v.usuario_id = ?`,
    [usuarioId],
    callback
  );
};

module.exports = {
  registrarVentaServicio,
  obtenerVentasServiciosPorUsuario
};
