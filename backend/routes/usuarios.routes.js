const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');

/*
// Ruta para obtener todos los usuarios
router.get('/', usuariosController.listarUsuarios);
*/
router.get('/me',
  validarToken,
  autorizar('usuario', 'emprendimiento'),
  (req, res) => {
    res.json(req.user); // req.user es poblado por el middleware validarToken
  }
);

// Ruta para obtener un usuario por ID
router.get('/:id', usuariosController.obtenerUsuario);

// Ruta para crear un nuevo usuario
router.post('/', usuariosController.crearUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', usuariosController.actualizarUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuariosController.eliminarUsuario);

// reseñas para usuarios
router.get('/:id/resenas', usuariosController.obtenerResenasUsuario);

// Solo un usuario autenticado puede ver su propio perfil:
router.get('/:id',
  validarToken,
  autorizar('usuario'),
  usuariosController.obtenerUsuario
);

module.exports = router;
