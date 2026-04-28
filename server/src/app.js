const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const usersRoutes = require('./routes/users.routes');
const subjectsRoutes = require('./routes/subjects.routes');

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: '✅ Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/subjects', subjectsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.path 
  });
});

module.exports = app;
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const usersRoutes    = require('./routes/users.routes');
const subjectsRoutes = require('./routes/subjects.routes');
const vakRoutes      = require('./routes/vak.routes');
const progressRoutes = require('./routes/progress.routes');

app.use(cors());
app.use(express.json());

app.use('/api/users',    usersRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/vak',      vakRoutes);
app.use('/api/progress', progressRoutes);

module.exports = app;
