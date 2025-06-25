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

module.exports = {
  obtenerEmprendimientos,
  obtenerEmprendimientoPorId,
  crearEmprendimiento,
  actualizarEmprendimiento,
  eliminarEmprendimiento
};
