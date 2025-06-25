// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permitir peticiones de otros dominios
app.use(express.json()); // Parsear JSON en el body

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/emprendimientos', require('./routes/emprendimientos.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/servicios', require('./routes/servicios.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/reseñas', require('./routes/reseñas.routes'));
app.use('/api/favoritos', require('./routes/favoritos.routes'));

// Ruta base para comprobar si el backend está funcionando
app.get('/', (req, res) => {
  res.send('API de FerreCorp corriendo...');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
