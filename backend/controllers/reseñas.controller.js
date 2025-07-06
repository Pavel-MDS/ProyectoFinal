const ReseñaProducto = require('../models/reseñaProducto.model');
const ReseñaServicio = require('../models/reseñaServicio.model');



// Agregar reseña de producto
const agregarReseñaProducto = (req, res) => {
  const datos = {
    usuario_id: req.user.id,  // <- extraído desde el token
    ...req.body               // producto_id, calificacion, comentario
  };

  ReseñaProducto.agregarReseñaProducto(datos, (err, resultado) => {
    if (err) {
      console.error(err); // 👈 agrega esto para que se vea el error exacto en consola
      return res.status(500).json({ error: 'Error al agregar la reseña de producto' });
    }
    res.status(201).json({ mensaje: 'Reseña de producto agregada', id: resultado.insertId });
  });
};


// Obtener reseñas de un producto
const obtenerReseñasProducto = (req, res) => {
  const productoId = req.params.productoId;
  ReseñaProducto.obtenerReseñasDeProducto(productoId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las reseñas del producto' });
    res.json(resultados);
  });
};

// Agregar reseña de servicio
const agregarReseñaServicio = (req, res) => {
  const datos = req.body;
  ReseñaServicio.agregarReseñaServicio(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al agregar la reseña de servicio' });
    res.status(201).json({ mensaje: 'Reseña de servicio agregada', id: resultado.insertId });
  });
};

const obtenerTodasReseñasDeProductos = (req, res) => {
  ReseñaProducto.obtenerTodasReseñas((err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener todas las reseñas de productos' });
    res.json(resultados);
  });
};

// Obtener reseñas de un servicio
const obtenerReseñasServicio = (req, res) => {
  const servicioId = req.params.servicioId;
  ReseñaServicio.obtenerReseñasDeServicio(servicioId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las reseñas del servicio' });
    res.json(resultados);
  });
};

module.exports = {
  agregarReseñaProducto,
  obtenerReseñasProducto,
  agregarReseñaServicio,
  obtenerTodasReseñasDeProductos,
  obtenerReseñasServicio
};
