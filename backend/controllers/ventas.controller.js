const VentaProducto = require('../models/ventaProducto.model');
const VentaServicio = require('../models/ventaServicio.model');

// Registrar venta de producto
const registrarVentaProducto = (req, res) => {
  const datos = req.body;
  VentaProducto.registrarVentaProducto(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al registrar la venta de producto' });
    res.status(201).json({ mensaje: 'Venta de producto registrada', id: resultado.insertId });
  });
};

// Obtener ventas de productos por usuario
const obtenerVentasProductosUsuario = (req, res) => {
  const usuarioId = req.params.usuarioId;
  VentaProducto.obtenerVentasPorUsuario(usuarioId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las ventas de productos' });
    res.json(resultados);
  });
};

// Registrar venta de servicio
const registrarVentaServicio = (req, res) => {
  const datos = req.body;
  VentaServicio.registrarVentaServicio(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al registrar la venta de servicio' });
    res.status(201).json({ mensaje: 'Venta de servicio registrada', id: resultado.insertId });
  });
};

// Obtener ventas de servicios por usuario
const obtenerVentasServiciosUsuario = (req, res) => {
  const usuarioId = req.params.usuarioId;
  VentaServicio.obtenerVentasServiciosPorUsuario(usuarioId, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las ventas de servicios' });
    res.json(resultados);
  });
};

module.exports = {
  registrarVentaProducto,
  obtenerVentasProductosUsuario,
  registrarVentaServicio,
  obtenerVentasServiciosUsuario
};
