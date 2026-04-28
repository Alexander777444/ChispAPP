const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

module.exports = router;