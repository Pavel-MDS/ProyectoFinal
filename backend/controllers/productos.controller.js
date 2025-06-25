const Producto = require('../models/producto.model');

// Obtener todos los productos
const listarProductos = (req, res) => {
  Producto.obtenerProductos((err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los productos' });
    res.json(resultados);
  });
};

// Obtener producto por ID
const obtenerProducto = (req, res) => {
  const id = req.params.id;
  Producto.obtenerProductoPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el producto' });
    if (resultado.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(resultado[0]);
  });
};

// Crear producto
const crearProducto = (req, res) => {
  const datos = req.body;
  Producto.crearProducto(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al crear el producto' });
    res.status(201).json({ mensaje: 'Producto creado', id: resultado.insertId });
  });
};

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto
};
