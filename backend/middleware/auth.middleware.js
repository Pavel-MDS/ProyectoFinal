// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'un_secreto_muy_secreto';
/** */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  console.log(token)
  jwt.verify(token,JWT_SECRET, (err, usuario) => {
    console.log(usuario)
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
};

// Verifica token y extrae payload en req.user
function validarToken(req, res, next) {
  const auth = req.headers.authorization?.split(' ');
  if (!auth || auth[0] !== 'Bearer') return res.status(401).json({ error: 'Token faltante' });

  jwt.verify(auth[1], JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });
    req.user = payload; // { id, tipo }
    next();
  });
}

// Comprueba rol
function autorizar(...rolesPermitidos) {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.tipo)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
}

module.exports = { authenticateToken,validarToken, autorizar };
