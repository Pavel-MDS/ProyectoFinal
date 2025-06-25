// routes/servicios.routes.js

const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios.controller');

// Obtener todos los servicios
router.get('/', serviciosController.listarServicios);

// Obtener un servicio por ID
router.get('/:id', serviciosController.obtenerServicio);

// Crear un nuevo servicio
router.post('/', serviciosController.crearServicio);

module.exports = router;
