const express = require('express');
const router = express.Router();
const { validarToken, autorizar } = require('../middleware/auth.middleware');
const db = require('../db/connection');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.query(`
    SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen_url,
           t.nombre AS tipo_nombre, e.nombre_negocio AS contacto
    FROM productos p
    LEFT JOIN tipos_producto t ON p.tipo_producto_id = t.id
    LEFT JOIN emprendimientos e ON p.emprendimiento_id = e.id
  `, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos' });
    res.json(rows);
  });
});

// Crear producto (solo para emprendedores autenticados)
router.post('/', validarToken, autorizar('emprendimiento'), (req, res) => {
  const emprendimiento_id = req.user.id;
  const { nombre, descripcion, precio, tipo_producto_id, imagen_url } = req.body;

  db.query(
    `INSERT INTO productos (nombre, descripcion, precio, tipo_producto_id, imagen_url, emprendimiento_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, descripcion, precio, tipo_producto_id, imagen_url, emprendimiento_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear producto' });
      }
      res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
    }
  );
});

module.exports = router;
