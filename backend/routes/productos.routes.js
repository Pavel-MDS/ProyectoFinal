// routes/productos.routes.js

const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// Obtener todos los productos
router.get('/', productosController.listarProductos);

// Obtener un producto por ID
router.get('/:id', productosController.obtenerProducto);

// Crear un nuevo producto
router.post('/', productosController.crearProducto);

module.exports = router;
