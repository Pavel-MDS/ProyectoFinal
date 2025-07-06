// routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const usuariosController = require('../controllers/usuarios.controller');
const { validarToken, autorizar } = require('../middleware/auth.middleware');

// ✅ Ruta para obtener el usuario logueado
router.get('/me', validarToken, (req, res) => {
  const { id, tipo } = req.user;

  if (tipo === 'usuario') {
    db.query('SELECT id, nombre, correo FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err || results.length === 0) return res.status(401).json({ error: 'No autorizado' });
      return res.json(results[0]);
    });
  } else if (tipo === 'emprendimiento') {
    db.query('SELECT id, nombre_negocio AS nombre, correo FROM emprendimientos WHERE id = ?', [id], (err, results) => {
      if (err || results.length === 0) return res.status(401).json({ error: 'No autorizado' });
      return res.json(results[0]);
    });
  } else {
    return res.status(401).json({ error: 'Tipo de usuario no válido' });
  }
});

// ✅ Rutas CRUD para usuarios
router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.obtenerUsuario);
router.post('/', usuariosController.crearUsuario);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);

// ✅ Reseñas de un usuario
router.get('/:id/reseñas', usuariosController.obtenerReseñasUsuario);

module.exports = router;
