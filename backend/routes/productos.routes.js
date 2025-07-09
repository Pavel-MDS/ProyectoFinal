const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
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
router.post('/', authenticateToken, async (req, res) => {
  const { nombre, descripcion, precio, imagen, categoria } = req.body;
  console.log({BODY: req.body})
  const emprendimiento_id = req.usuario.id;

  try {
    if (!nombre || !descripcion || !precio || !imagen || !categoria) {
      return res.status(400).json({ error: 'Faltan datos del producto' });
    }

    const [tipos] = await db.promise().query(
      'SELECT id FROM tipos_producto WHERE LOWER(nombre) = ?',
      [categoria.trim().toLowerCase()]
    );

    if (tipos.length === 0) {
      return res.status(400).json({ error: 'Categoría no válida' });
    }

    const tipo_producto_id = tipos[0].id;

    const [resultado] = await db.promise().query(
      `INSERT INTO productos 
       (nombre, descripcion, precio, imagen_url, tipo_producto_id, emprendimiento_id, unidades_disponibles)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, imagen, tipo_producto_id, emprendimiento_id, 100] // unidades por defecto
    );
    console.log({resultado})
    res.status(201).json({ mensaje: 'Producto guardado', id: resultado.insertId });
  } catch (error) {
    console.error('Error al insertar producto:', error);
    res.status(500).json({ error: 'Error interno al guardar el producto' });
  }
});

module.exports = router;
