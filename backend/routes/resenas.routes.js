// routes/reseñas.routes.js
const { validarToken } = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();
const resenasController = require('../controllers/resenas.controller');


// Reseñas de productos
router.post('/producto', resenasController.agregarResenaProducto);
router.get('/producto', resenasController.obtenerTodasResenasDeProductos);
router.get('/producto/:productoId', resenasController.obtenerResenasProducto);

// Reseñas de servicios
router.post('/servicio', validarToken, resenasController.agregarResenaServicio);
router.get('/servicio/:servicioId', resenasController.obtenerResenasServicio);

// Reseñas de un usuario
router.get('/usuario', validarToken, resenasController.obtenerResenasDeUsuario);

module.exports = router;
