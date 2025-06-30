const Producto = require('../models/producto.model');

// Obtener todos los productos
const listarProductos = (req, res) => {
  Producto.obtenerProductos((err, resultados) => {
    if (err) {
      console.error(err);
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
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener el producto' });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(resultados[0]);
  });
};

// Crear producto
const crearProducto = (req, res) => {
  const datos = req.body;

  // Validación básica
  const camposObligatorios = ['nombre', 'precio', 'descripcion', 'unidades_disponibles', 'tipo_producto_id', 'emprendimiento_id'];
  const camposFaltantes = camposObligatorios.filter(campo => !datos[campo]);

  if (camposFaltantes.length > 0) {
    return res.status(400).json({ error: `Faltan campos: ${camposFaltantes.join(', ')}` });
  }

  Producto.crearProducto(datos, (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear el producto' });
    }
    res.status(201).json({ mensaje: 'Producto creado correctamente', id: resultado.insertId });
  });
};

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto
};
