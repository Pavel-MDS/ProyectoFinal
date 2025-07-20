const db = require('../db/connection');

// Obtener todos los servicios con datos del emprendimiento
const obtenerServicios = (callback) => {
  db.query(`
    SELECT s.*, e.nombre_negocio, e.contacto
    FROM servicios s
    LEFT JOIN emprendimientos e ON s.emprendimiento_id = e.id
  `, callback);
};

// Crear un nuevo servicio
const crearServicio = (datos, callback) => {
  const {
    nombre, descripcion_corta, descripcion_detallada,
    horario, contacto, imagen_url, emprendimiento_id
  } = datos;

  db.query(
    `INSERT INTO servicios 
    (nombre, descripcion_corta, descripcion_detallada, horario, contacto, imagen_url, emprendimiento_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, descripcion_corta, descripcion_detallada, horario, contacto, imagen_url, emprendimiento_id],
    callback
  );
};

// Obtener un servicio por ID
const obtenerServicioPorId = (id, callback) => {
  db.query('SELECT * FROM servicios WHERE id = ?', [id], callback);
};

// Eliminar servicio
const eliminarServicio = (id, callback) => {
  db.query('DELETE FROM servicios WHERE id = ?', [id], callback);
};

// Actualizar servicio
const actualizarServicio = (id, datos, callback) => {
  db.query('UPDATE servicios SET ? WHERE id = ?', [datos, id], callback);
};

// Exportar todas las funciones
module.exports = {
  obtenerServicios,
  crearServicio,
  obtenerServicioPorId,
  eliminarServicio,
  actualizarServicio
};
