// routes/favoritos.routes.js

const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritos.controller');

// Rutas para favoritos de productos
router.post('/producto', favoritosController.agregarFavoritoProducto);
router.get('/producto/:usuarioId', favoritosController.obtenerFavoritosProductos);

// Rutas para favoritos de servicios
router.post('/servicio', favoritosController.agregarFavoritoServicio);
router.get('/servicio/:usuarioId', favoritosController.obtenerFavoritosServicios);

module.exports = router;
