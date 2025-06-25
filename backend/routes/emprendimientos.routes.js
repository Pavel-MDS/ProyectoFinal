// routes/emprendimientos.routes.js

const express = require('express');
const router = express.Router();
const emprendimientosController = require('../controllers/emprendimientos.controller');

// Obtener todos los emprendimientos
router.get('/', emprendimientosController.listarEmprendimientos);

// Obtener un emprendimiento por ID
router.get('/:id', emprendimientosController.obtenerEmprendimiento);

// Crear un nuevo emprendimiento
router.post('/', emprendimientosController.crearEmprendimiento);

// Actualizar un emprendimiento existente
router.put('/:id', emprendimientosController.actualizarEmprendimiento);

// Eliminar un emprendimiento
router.delete('/:id', emprendimientosController.eliminarEmprendimiento);

module.exports = router;
