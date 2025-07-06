// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const authRoutes = require('./routes/auth.routes');

// Middleware
app.use(cors()); // Permitir peticiones de otros dominios
app.use(express.json()); // Parsear JSON en el body

// RUTAS DE AUTENTICACIÓN (registro / login)
app.use('/api/auth', authRoutes);

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/emprendimientos', require('./routes/emprendimientos.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/servicios', require('./routes/servicios.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/resenas', require('./routes/resenas.routes'));
app.use('/api/favoritos', require('./routes/favoritos.routes'));
// Ruta base para comprobar si el backend está funcionando
app.get('/', (req, res) => {
  res.send('API de FerreCorp corriendo...');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
