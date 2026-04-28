const router = require('express').Router();
const progressController = require('../controllers/progress.controller');

router.get('/:user_id', progressController.getProgress);  // GET  /api/progress/:user_id → progreso del alumno
router.post('/', progressController.updateProgress);       // POST /api/progress          → crear/actualizar progreso

module.exports = router;
