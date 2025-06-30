// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');
const Emprendimiento = require('../models/emprendimiento.model');

const JWT_SECRET = process.env.JWT_SECRET || 'un_secreto_muy_secreto';
const TOKEN_EXPIRES_IN = '2h';
const SALT_ROUNDS = 10;

async function register(req, res) {
  const { nombre, correo, contrasena, tipo, contacto, direccion } = req.body;

  try {
    // 1) Hashear contraseña
    const hashed = await bcrypt.hash(contrasena, SALT_ROUNDS);

    // 2) Preparar datos y función de inserción
    let datos, fnCrear;
    if (tipo === 'emprendimiento') {
      datos   = { nombre_negocio: nombre, correo, contrasena: hashed, contacto, direccion };
      fnCrear = Emprendimiento.crearEmprendimiento;
    } else {
      datos   = { nombre, correo, contrasena: hashed };
      fnCrear = Usuario.crearUsuario;
    }

    // 3) Insertar en BD
    fnCrear(datos, (err, result) => {
      if (err) {
        console.error('Error en crearCuenta:', err);
        return res.status(500).json({ error: 'Error al crear cuenta' });
      }
      res.status(201).json({ mensaje: 'Cuenta creada', id: result.insertId });
    });

  } catch (e) {
    console.error('Error interno register:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function login(req, res) {
  const { correo, contrasena, tipo } = req.body;
  try {
    const fnBuscar = tipo === 'emprendimiento'
      ? Emprendimiento.obtenerEmprendimientoPorCorreo
      : Usuario.obtenerUsuarioPorCorreo;

    fnBuscar(correo, async (err, rows) => {
      if (err) {
        console.error('DB error login:', err);
        return res.status(500).json({ error: 'DB error' });
      }
      if (!rows.length) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const user = rows[0];
      const match = await bcrypt.compare(contrasena, user.contrasena);
      if (!match) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const payload = { 
        id: user.id, 
        tipo: tipo  
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
      res.json({ token });
    });

  } catch (e) {
    console.error('Error interno login:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { register, login };
