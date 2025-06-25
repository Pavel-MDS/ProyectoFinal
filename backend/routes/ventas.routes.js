// routes/ventas.routes.js

const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

// Registrar una venta de producto
router.post('/producto', ventasController.registrarVentaProducto);

// Obtener ventas de productos por usuario
router.get('/producto/:usuarioId', ventasController.obtenerVentasProductosUsuario);

// Registrar una venta de servicio
router.post('/servicio', ventasController.registrarVentaServicio);

// Obtener ventas de servicios por usuario
router.get('/servicio/:usuarioId', ventasController.obtenerVentasServiciosUsuario);

module.exports = router;
