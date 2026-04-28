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