const Favorito = require('../models/favorito.model');

// Agregar favorito de producto
const agregarFavoritoProducto = (req, res) => {
  const { usuarioId, productoId } = req.body;
  Favorito.agregarFavoritoProducto(usuarioId, productoId, (err) => {
    if (err) return res.status(500).json({ error: 'Error al agregar producto a favoritos' });
    res.status(201).json({ mensaje: 'Producto agregado a favoritos' });
  });
};

// Obtener favoritos de productos por usuario
const obtenerFavoritosProductos = (req, res) => {
  const usuarioId = req.params.usuarioId;
  Favorito.obtenerFavoritosProductos(usuarioId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener favoritos de productos' });
    res.json(resultados);
  });
};

// Agregar favorito de servicio
const agregarFavoritoServicio = (req, res) => {
  const { usuarioId, servicioId } = req.body;
  Favorito.agregarFavoritoServicio(usuarioId, servicioId, (err) => {
    if (err) return res.status(500).json({ error: 'Error al agregar servicio a favoritos' });
    res.status(201).json({ mensaje: 'Servicio agregado a favoritos' });
  });
};

// Obtener favoritos de servicios por usuario
const obtenerFavoritosServicios = (req, res) => {
  const usuarioId = req.params.usuarioId;
  Favorito.obtenerFavoritosServicios(usuarioId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener favoritos de servicios' });
    res.json(resultados);
  });
};

module.exports = {
  agregarFavoritoProducto,
  obtenerFavoritosProductos,
  agregarFavoritoServicio,
  obtenerFavoritosServicios
};
