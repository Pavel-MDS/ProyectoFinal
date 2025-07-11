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

// Obtener emprendimiento por ID (público)
router.get('/:id', emprendimientosController.obtenerEmprendimiento);

// Crear emprendimiento (registro)
router.post('/', emprendimientosController.crearEmprendimiento);

// Eliminar emprendimiento por ID
router.delete('/:id', emprendimientosController.eliminarEmprendimiento);
// Obetener contenido
router.get('/:id/contenido', emprendimientosController.obtenerContenido);
//----------------------------------------
// 1. Editar producto
router.put('/:emprendimientoId/productos/:productoId', emprendimientosController.editarProducto);

// 2. Eliminar producto
router.delete('/:emprendimientoId/productos/:productoId', emprendimientosController.eliminarProducto);

// 3. Editar servicio
router.put('/:emprendimientoId/servicios/:servicioId', emprendimientosController.editarServicio);

// 4. Eliminar servicio
router.delete('/:emprendimientoId/servicios/:servicioId', emprendimientosController.eliminarServicio);


module.exports = router;
