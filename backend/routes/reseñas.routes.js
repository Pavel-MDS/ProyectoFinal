// routes/reseñas.routes.js

const express = require('express');
const router = express.Router();
const { validarToken, autorizar } = require('../middleware/auth.middleware');
const db = require('../db/connection');

// Crear reseña producto

router.post('/producto', validarToken, /*autorizar('usuario'),*/ (req, res) => {
  const usuario_id = req.user.id;
  const { producto_id, calificacion, comentario } = req.body;
  
  if (!producto_id || comentario == null || calificacion == null) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  
  db.query(
    `INSERT INTO reseñas_productos (usuario_id, producto_id, calificacion, comentario)
     VALUES (?, ?, ?, ?)`,
    [usuario_id, producto_id, calificacion, comentario],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear reseña' });
      }
      res.status(201).json({ mensaje: 'Reseña guardada', id: result.insertId });
    }
  );
});

module.exports = router;

