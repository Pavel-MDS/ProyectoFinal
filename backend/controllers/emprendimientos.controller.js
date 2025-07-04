// controllers/emprendimientos.controller.js
const Emprendimiento = require('../models/emprendimiento.model');

// 1) Listar todos los emprendimientos
const listarEmprendimientos = (req, res) => {
  Emprendimiento.obtenerEmprendimientos((err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los emprendimientos' });
    res.json(resultados);
  });
};

// 2) Obtener un emprendimiento por ID
const obtenerEmprendimiento = (req, res) => {
  const id = req.params.id;
  Emprendimiento.obtenerEmprendimientoPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el emprendimiento' });
    if (resultado.length === 0) return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    res.json(resultado[0]);
  });
};

// 3) Crear un nuevo emprendimiento
const crearEmprendimiento = (req, res) => {
  const datos = req.body;
  Emprendimiento.crearEmprendimiento(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al crear el emprendimiento' });
    res.status(201).json({ mensaje: 'Emprendimiento creado', id: resultado.insertId });
  });
};

// 4) Actualizar un emprendimiento existente
const actualizarEmprendimiento = (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  Emprendimiento.actualizarEmprendimiento(id, datos, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el emprendimiento' });
    res.json({ mensaje: 'Emprendimiento actualizado' });
  });
};

// 5) Eliminar un emprendimiento
const eliminarEmprendimiento = (req, res) => {
  const id = req.params.id;
  Emprendimiento.eliminarEmprendimiento(id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el emprendimiento' });
    res.json({ mensaje: 'Emprendimiento eliminado' });
  });
};

// 6) Obtener perfil del emprendimiento autenticado
const obtenerMiPerfil = (req, res) => {
  const id = req.user.id; // poblado por validarToken middleware
  Emprendimiento.obtenerEmprendimientoPorId(id, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener perfil' });
    if (!rows.length) return res.status(404).json({ error: 'No existe el emprendimiento' });
    res.json(rows[0]);
  });
};

// 7) Obtener estadísticas del emprendimiento autenticado
const obtenerEstadisticas = (req, res) => {
  const id = req.user.id;
  Emprendimiento.obtenerEstadisticas(id, (err, stats) => {
    if (err) {
      console.error('Error al obtener estadísticas:', err);
      return res.status(500).json({ error: 'Error al calcular estadísticas' });
    }
    res.json(stats);
  });
};
const obtenerContenido = (req, res) => {
  const id = req.params.id;

  Emprendimiento.obtenerContenidoPorEmprendimiento(id, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener contenido' });
    res.json(data);
  });
};

module.exports = {
  listarEmprendimientos,
  obtenerEmprendimiento,
  crearEmprendimiento,
  actualizarEmprendimiento,
  eliminarEmprendimiento,
  obtenerMiPerfil,
  obtenerEstadisticas,
  obtenerContenido
};
