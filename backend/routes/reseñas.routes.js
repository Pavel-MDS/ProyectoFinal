// routes/reseñas.routes.js

const express = require('express');
const router = express.Router();
const reseñasController = require('../controllers/reseñas.controller');

// Reseñas de productos
router.post('/producto', reseñasController.agregarReseñaProducto);
router.get('/producto', reseñasController.obtenerTodasReseñasDeProductos);
router.get('/producto/:productoId', reseñasController.obtenerReseñasProducto);

// Reseñas de servicios
router.post('/servicio', reseñasController.agregarReseñaServicio);
router.get('/servicio/:servicioId', reseñasController.obtenerReseñasServicio);

module.exports = router;
