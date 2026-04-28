const router = require('express').Router();
const usersController = require('../controllers/users.controller');

// Rutas públicas
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Rutas con userId
router.get('/:userId', usersController.getUserProfile);
router.put('/:userId/vak-style', usersController.updateVAKStyle);

module.exports = router;