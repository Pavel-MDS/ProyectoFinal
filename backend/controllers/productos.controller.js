const db = require('../db/connection');
const Producto = require('../models/producto.model');

// Obtener todos los productos
const listarProductos = (req, res) => {
  Producto.obtenerProductos((err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener productos:', err);
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
    res.json(resultados);
  });
};

// Obtener producto por ID
const obtenerProducto = (req, res) => {
  const { id } = req.params;
  Producto.obtenerProductoPorId(id, (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener producto por ID:', err);
      return res.status(500).json({ error: 'Error al obtener el producto' });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(resultados[0]);
  });
};

// Crear producto usando categoria (texto) y emprendimiento_id del token
const crearProducto = (req, res) => {
  console.log({BODY: req.body})
  const {
    nombre,
    descripcion,
    precio,
    unidades_disponibles = 10,
    imagen, // viene como imagen_url
    categoria
  } = req.body;

  const emprendimiento_id = req.usuario.id; // 🔐 del token

  if (!nombre || !descripcion || !precio || !imagen || !categoria) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Buscar tipo de producto por nombre
  db.query('SELECT id FROM tipos_producto WHERE LOWER(nombre) = ?', [categoria.toLowerCase()], (err, rows) => {
    if (err) {
      console.error('❌ Error al consultar categoría:', err);
      return res.status(500).json({ error: 'Error al buscar categoría' });
    }

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Categoría no válida' });
    }

    const tipo_producto_id = rows[0].id;

    // Insertar el producto
    const datos = {
      nombre,
      descripcion,
      precio,
      unidades_disponibles,
      imagen_url: imagen,
      tipo_producto_id,
      emprendimiento_id
    };

    Producto.crearProducto(datos, (err, resultado) => {
      if (err) {
        console.error('❌ Error al guardar producto:', err);
        return res.status(500).json({ error: 'Error al guardar el producto' });
      }

      res.status(201).json({
        mensaje: '✅ Producto guardado correctamente',
        id: resultado.insertId
      });
    });
  });
};

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto
};
