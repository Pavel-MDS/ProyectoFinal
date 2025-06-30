const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');

// Obtener todos los productos
router.get('/', productosController.listarProductos);

// Obtener un producto por ID
router.get('/:id', productosController.obtenerProducto);

// Crear un nuevo producto (restringido a usuarios autenticados)
router.post('/', validarToken, productosController.crearProducto);

module.exports = router;
