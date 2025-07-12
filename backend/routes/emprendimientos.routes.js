// routes/emprendimientos.routes.js

const express = require('express');
const router = express.Router();
const emprendimientosController = require('../controllers/emprendimientos.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');

// Listar todos los emprendimientos (público)
router.get('/', emprendimientosController.listarEmprendimientos);

// Ver perfil del emprendimiento autenticado
router.get('/me',
  validarToken,
  autorizar('emprendimiento'),
  emprendimientosController.obtenerMiPerfil
);

// Obtener estadísticas del emprendimiento autenticado
router.get('/estadisticas',
  validarToken,
  autorizar('emprendimiento'),
  emprendimientosController.obtenerEstadisticas
);

// ✅ Esta ruta debe ir antes que '/:id'
router.get('/:id/contenido', emprendimientosController.obtenerContenido);

// Obtener emprendimiento por ID (público)
router.get('/:id', emprendimientosController.obtenerEmprendimiento);

// Crear emprendimiento (registro)
router.post('/', emprendimientosController.crearEmprendimiento);

// Eliminar emprendimiento por ID
router.delete('/:id', emprendimientosController.eliminarEmprendimiento);

module.exports = router;
