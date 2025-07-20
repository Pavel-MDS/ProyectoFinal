const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { authenticateToken } = require('../middleware/auth.middleware');

// ✅ Obtener todos los servicios (público)
router.get('/', (req, res) => {
  db.query(`
    SELECT s.id, s.nombre, s.descripcion_corta, s.descripcion_detallada,
           s.horario, s.contacto, s.imagen_url,
           e.nombre_negocio AS emprendimiento
    FROM servicios s
    LEFT JOIN emprendimientos e ON s.emprendimiento_id = e.id
  `, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los servicios' });
    res.json(rows);
  });
});

// ✅ Crear un servicio (emprendimiento autenticado)
router.post('/', authenticateToken, async (req, res) => {
  const {
    nombre, descripcion_corta, descripcion_detallada,
    horario, contacto, imagen_url
  } = req.body;
  const emprendimiento_id = req.usuario.id;

  try {
    if (!nombre || !descripcion_corta || !descripcion_detallada || !horario || !contacto || !imagen_url) {
      return res.status(400).json({ error: 'Faltan datos del servicio' });
    }

    const [resultado] = await db.promise().query(
      `INSERT INTO servicios 
       (nombre, descripcion_corta, descripcion_detallada, horario, contacto, imagen_url, emprendimiento_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion_corta, descripcion_detallada, horario, contacto, imagen_url, emprendimiento_id]
    );

    res.status(201).json({ mensaje: 'Servicio creado', id: resultado.insertId });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ error: 'Error interno al crear el servicio' });
  }
});

// ✅ Actualizar servicio (solo del emprendimiento dueño)
router.put('/:id', authenticateToken, async (req, res) => {
  const servicioId = req.params.id;
  const emprendimiento_id = req.usuario.id;
  const {
    nombre, descripcion_corta, descripcion_detallada,
    horario, contacto, imagen_url
  } = req.body;

  try {
    if (!nombre || !descripcion_corta || !descripcion_detallada || !horario || !contacto || !imagen_url) {
      return res.status(400).json({ error: 'Faltan datos para actualizar el servicio' });
    }

    await db.promise().query(
      `UPDATE servicios 
       SET nombre = ?, descripcion_corta = ?, descripcion_detallada = ?, horario = ?, contacto = ?, imagen_url = ?
       WHERE id = ? AND emprendimiento_id = ?`,
      [nombre, descripcion_corta, descripcion_detallada, horario, contacto, imagen_url, servicioId, emprendimiento_id]
    );

    res.json({ mensaje: 'Servicio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ error: 'Error interno al actualizar el servicio' });
  }
});

// ✅ Eliminar servicio (solo del emprendimiento dueño)
router.delete('/:id', authenticateToken, async (req, res) => {
  const servicioId = req.params.id;
  const emprendimiento_id = req.usuario.id;

  try {
    await db.promise().query(
      'DELETE FROM servicios WHERE id = ? AND emprendimiento_id = ?',
      [servicioId, emprendimiento_id]
    );

    res.json({ mensaje: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ error: 'Error interno al eliminar el servicio' });
  }
});

module.exports = router;
