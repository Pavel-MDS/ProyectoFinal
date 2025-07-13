require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas de autenticación
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Rutas de API
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/emprendimientos', require('./routes/emprendimientos.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/servicios', require('./routes/servicios.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/resenas', require('./routes/resenas.routes'));
app.use('/api/favoritos', require('./routes/favoritos.routes'));

// Producción: servir frontend compilado
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Fallback para SPA (rutas que no comienzan con /api)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
