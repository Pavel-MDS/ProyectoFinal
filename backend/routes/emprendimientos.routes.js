// routes/emprendimientos.routes.js

const express = require('express');
const router = express.Router();
const emprendimientosController = require('../controllers/emprendimientos.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');


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

// Solo un emprendimiento puede actualizar su propio perfil:
router.put('/:id',
  validarToken,
  autorizar('emprendimiento'),
  emprendimientosController.actualizarEmprendimiento
);

module.exports = router;
