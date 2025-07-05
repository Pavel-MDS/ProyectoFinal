const ResenaProducto = require('../models/resenaProducto.model');
const ResenaServicio = require('../models/resenaServicio.model');

// Agregar reseña de producto
const agregarResenaProducto = (req, res) => {
  const datos = req.body;
  ResenaProducto.agregarResenaProducto(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al agregar la reseña de producto' });
    res.status(201).json({ mensaje: 'Reseña de producto agregada', id: resultado.insertId });
  });
};

// Obtener reseñas de un producto
const obtenerResenasProducto = (req, res) => {
  const productoId = req.params.productoId;
  ResenaProducto.obtenerResenasDeProducto(productoId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las reseñas del producto' });
    res.json(resultados);
  });
};

// Agregar reseña de servicio
const agregarResenaServicio = (req, res) => {
  const { servicio_id, calificacion, comentario } = req.body;
  const usuario_id = req.user.id;             
  ResenaServicio.agregarResenaServicio(
    { usuario_id, servicio_id, calificacion, comentario },
    (err, resultado) => {
      if (err) return res.status(500).json({ error: 'Error al agregar la reseña de servicio' });
      res.status(201).json({ mensaje: 'Reseña de servicio agregada', id: resultado.insertId });
    }
  );
};
// Obtener todas la reseñas de productos
const obtenerTodasResenasDeProductos = (req, res) => {
  ResenaProducto.obtenerTodasResenas((err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener todas las reseñas de productos' });
    res.json(resultados);
  });
};

// Obtener reseñas de un servicio
const obtenerResenasServicio = (req, res) => {
  const servicioId = req.params.servicioId;
  ResenaServicio.obtenerResenasDeServicio(servicioId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las reseñas del servicio' });
    res.json(resultados);
  });
};

// Obtener todas las reseñas de un usuario
const obtenerResenasDeUsuario = (req, res) => {
  const usuarioId = req.user.id;
  // primero las de producto
  ResenaProducto.obtenerResenasDeUsuario(usuarioId, (err, prodReviews) => {
    if (err) return res.status(500).json({ error: 'Error al obtener reseñas de producto' });
    // luego las de servicio
    ResenaServicio.obtenerResenasDeUsuario(usuarioId, (err2, servReviews) => {
      if (err2) return res.status(500).json({ error: 'Error al obtener reseñas de servicio' });
      res.json({ productos: prodReviews, servicios: servReviews });
    });
  });
};


module.exports = {
  agregarResenaProducto,
  obtenerResenasProducto,
  agregarResenaServicio,
  obtenerTodasResenasDeProductos,
  obtenerResenasDeUsuario,
  obtenerResenasServicio
};
