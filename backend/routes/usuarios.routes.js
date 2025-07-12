const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const usuariosController = require('../controllers/usuarios.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');

// ✅ Obtener perfil del usuario autenticado
router.get('/me',
  validarToken,
  autorizar('usuario', 'emprendimiento'),
  (req, res) => {
    res.json(req.user);
  }
);

// ✅ Crear nuevo usuario (registro)
router.post('/', usuariosController.crearUsuario);

// ✅ Actualizar usuario por ID
router.put('/:id', usuariosController.actualizarUsuario);

// ✅ Eliminar usuario por ID
router.delete('/:id', usuariosController.eliminarUsuario);

// ✅ Obtener reseñas hechas por un usuario
router.get('/:id/resenas', usuariosController.obtenerResenasUsuario);

// ✅ Obtener usuario por ID (protegido)
router.get('/:id',
  validarToken,
  autorizar('usuario', 'emprendimiento'),
  usuariosController.obtenerUsuario
);

module.exports = router;
