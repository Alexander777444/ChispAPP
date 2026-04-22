const express = require('express');
const app = express();

const usersRoutes = require('./routes/users.routes');
const subjectsRoutes = require('./routes/subjects.routes');

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/subjects', subjectsRoutes);

module.exports = app;