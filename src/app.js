// src/app.js

const express = require('express');
const cors = require('cors');
const configuracionRoutes = require('./routes/configuracionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());            // Permite peticiones desde el front-end
app.use(express.json());    // Parsea JSON en el body

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de NotiBatería funcionando correctamente' });
});

// Rutas de la API
app.use('/api/configuraciones', configuracionRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});