const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.listarUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', usuariosController.obtenerUsuario);

// Ruta para crear un nuevo usuario
router.post('/', usuariosController.crearUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', usuariosController.actualizarUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;
