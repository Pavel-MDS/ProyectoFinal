const Usuario = require('../models/usuario.model');
const ResenaProducto = require('../models/resenaProducto.model');
const ResenaServicio = require('../models/resenaServicio.model');

// Obtener todos los usuarios
const listarUsuarios = (req, res) => {
  Usuario.obtenerUsuarios((err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los usuarios' });
    res.json(resultados);
  });
};

// Obtener un usuario por ID
const obtenerUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.obtenerUsuarioPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
    if (resultado.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(resultado[0]);
  });
};

// Crear un nuevo usuario
const crearUsuario = (req, res) => {
  const datos = req.body;
  Usuario.crearUsuario(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al crear el usuario' });
    res.status(201).json({ mensaje: 'Usuario creado exitosamente', id: resultado.insertId });
  });
};

// Actualizar un usuario existente
const actualizarUsuario = (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  Usuario.actualizarUsuario(id, datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el usuario' });
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  });
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.eliminarUsuario(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el usuario' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
};

// Devuelve todas las reseñas que hizo un usuario (productos + servicios)
const obtenerResenasUsuario = (req, res) => {
  const userId = req.params.id;

  // Primero las de producto
  ResenaProducto.obtenerResenasDeUsuario(userId, (err, prodReviews) => {
    if (err) return res.status(500).json({ error: 'Error al obtener reseñas de productos' });

    // Luego las de servicio
    ResenaServicio.obtenerResenasDeUsuario(userId, (err2, servReviews) => {
      if (err2) return res.status(500).json({ error: 'Error al obtener reseñas de servicios' });

      // Unimos ambas listas
      res.json({
        productos: prodReviews,
        servicios: servReviews
      });
    });
  });
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerResenasUsuario
};
