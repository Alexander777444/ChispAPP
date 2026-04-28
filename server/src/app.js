const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const usersRoutes = require('./routes/users.routes');
const subjectsRoutes = require('./routes/subjects.routes');

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/subjects', subjectsRoutes);

module.exports = app;