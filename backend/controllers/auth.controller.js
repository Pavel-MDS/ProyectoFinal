const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');
const Emprendimiento = require('../models/emprendimiento.model');
require('dotenv').config(); // Carga las variables de entorno

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '2h';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

if (!JWT_SECRET) {
  throw new Error('Falta definir JWT_SECRET en el archivo .env');
}

async function register(req, res) {
  const { nombre, correo, contrasena, tipo, contacto, direccion } = req.body;

  try {
    const hashed = await bcrypt.hash(contrasena, SALT_ROUNDS);

    let datos, fnCrear;
    if (tipo === 'emprendimiento') {
      datos = {
        nombre_negocio: nombre,
        correo,
        contrasena: hashed,
        contacto,
        direccion
      };
      fnCrear = Emprendimiento.crearEmprendimiento;
    } else {
      datos = { nombre, correo, contrasena: hashed };
      fnCrear = Usuario.crearUsuario;
    }

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

      const payload = { id: user.id, tipo };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
      res.json({ token });
    });
  } catch (e) {
    console.error('Error interno login:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { register, login };
