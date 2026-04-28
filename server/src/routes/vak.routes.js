const router = require('express').Router();
const vakController = require('../controllers/vak.controller');

router.post('/', vakController.saveVAKResult);       // POST /api/vak  → guarda resultado
router.get('/:user_id', vakController.getVAKResult); // GET  /api/vak/:user_id → último resultado

module.exports = router;
