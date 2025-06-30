// models/emprendimiento.model.js
const db = require('../db/connection');

// Obtener todos los emprendimientos
const obtenerEmprendimientos = (callback) => {
  db.query('SELECT * FROM emprendimientos', callback);
};

// Obtener emprendimiento por ID
const obtenerEmprendimientoPorId = (id, callback) => {
  db.query('SELECT * FROM emprendimientos WHERE id = ?', [id], callback);
};

// Crear nuevo emprendimiento
const crearEmprendimiento = (datos, callback) => {
  const { nombre_negocio, correo, contrasena, contacto, direccion } = datos;
  db.query(
    'INSERT INTO emprendimientos (nombre_negocio, correo, contrasena, contacto, direccion) VALUES (?, ?, ?, ?, ?)',
    [nombre_negocio, correo, contrasena, contacto, direccion],
    callback
  );
};

// Actualizar emprendimiento
const actualizarEmprendimiento = (id, datos, callback) => {
  const { nombre_negocio, correo, contrasena, contacto, direccion } = datos;
  db.query(
    'UPDATE emprendimientos SET nombre_negocio = ?, correo = ?, contrasena = ?, contacto = ?, direccion = ? WHERE id = ?',
    [nombre_negocio, correo, contrasena, contacto, direccion, id],
    callback
  );
};

// Eliminar emprendimiento
const eliminarEmprendimiento = (id, callback) => {
  db.query('DELETE FROM emprendimientos WHERE id = ?', [id], callback);
};

// Obtener por correo
const obtenerEmprendimientoPorCorreo = (correo, callback) => {
  db.query('SELECT * FROM emprendimientos WHERE correo = ?', [correo], callback);
};

// Obtener estadísticas: total ventas productos+servicios y promedio calificaciones
const obtenerEstadisticas = (idEmprendimiento, callback) => {
  const sql = `
    SELECT COUNT(*) AS totalProd FROM ventas_productos WHERE emprendimiento_id = ?;
    SELECT COUNT(*) AS totalServ FROM ventas_servicios WHERE emprendimiento_id = ?;
    SELECT AVG(calificacion) AS promProducto
      FROM reseñas_productos
     WHERE producto_id IN (SELECT id FROM productos WHERE emprendimiento_id = ?);
    SELECT AVG(calificacion) AS promServicio
      FROM reseñas_servicios
     WHERE servicio_id IN (SELECT id FROM servicios WHERE emprendimiento_id = ?);
  `;
  db.query(sql, [idEmprendimiento, idEmprendimiento, idEmprendimiento, idEmprendimiento], (err, results) => {
    if (err) return callback(err);

    const [{ totalProd }] = results[0];
    const [{ totalServ }] = results[1];
    const [{ promProducto }] = results[2];
    const [{ promServicio }] = results[3];

    // Calcula promedio combinado
    const proms = [];
    if (promProducto !== null) proms.push(promProducto);
    if (promServicio !== null) proms.push(promServicio);
    const promedio = proms.length ? proms.reduce((a, b) => a + b, 0) / proms.length : 0;

    callback(null, {
      ventas: totalProd + totalServ,
      promedio: parseFloat(promedio.toFixed(2))
    });
  });
};

module.exports = {
  obtenerEmprendimientos,
  obtenerEmprendimientoPorId,
  crearEmprendimiento,
  actualizarEmprendimiento,
  eliminarEmprendimiento,
  obtenerEmprendimientoPorCorreo,
  obtenerEstadisticas
};
