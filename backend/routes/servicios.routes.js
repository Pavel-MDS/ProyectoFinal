// routes/servicios.routes.js

const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');

// ✅ Obtener todos los servicios (público)
router.get('/', serviciosController.listarServicios);

// ✅ Obtener un servicio por ID (público)
router.get('/:id', serviciosController.obtenerServicio);

// ✅ Crear un nuevo servicio (solo emprendedores autenticados)
router.post(
  '/',
  validarToken,
  autorizar('emprendimiento'),  // Solo usuarios con rol "emprendimiento" pueden crear servicios
  serviciosController.crearServicio
);

module.exports = router;
