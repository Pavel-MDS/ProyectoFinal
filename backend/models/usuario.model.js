const db = require('../db/connection');

// Obtener todos los usuarios
const obtenerUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', callback);
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = (id, callback) => {
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};

// Crear nuevo usuario
const crearUsuario = (datos, callback) => {
  const { nombre, correo, contrasena } = datos;
  db.query(
    'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)',
    [nombre, correo, contrasena],
    callback
  );
};

// Actualizar usuario
const actualizarUsuario = (id, datos, callback) => {
  const { nombre, correo, contrasena } = datos;
  db.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?',
    [nombre, correo, contrasena, id],
    callback
  );
};

// Eliminar usuario
const eliminarUsuario = (id, callback) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
};

// Obtener por Correo
const obtenerUsuarioPorCorreo = (correo, callback) =>
  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], callback);

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorCorreo
};
