const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');

// ✅ Registrar una venta de producto (usuario autenticado)
router.post(
  '/producto',
  validarToken,
  autorizar('usuario'),
  ventasController.registrarVentaProducto
);

// ✅ Obtener ventas de productos por usuario (autenticado)
router.get(
  '/producto/:usuarioId',
  validarToken,
  autorizar('usuario'),
  ventasController.obtenerVentasProductosUsuario
);

// ✅ Registrar una venta de servicio (usuario autenticado)
router.post(
  '/servicio',
  validarToken,
  autorizar('usuario'),
  ventasController.registrarVentaServicio
);

// ✅ Obtener ventas de servicios por usuario (autenticado)
router.get(
  '/servicio/:usuarioId',
  validarToken,
  autorizar('usuario'),
  ventasController.obtenerVentasServiciosUsuario
);

module.exports = router;
