const router = require('express').Router();
const subjectsController = require('../controllers/subjects.controller');

// Obtener todas las materias
router.get('/', subjectsController.getAllSubjects);

// Obtener materia por ID
router.get('/:subjectId', subjectsController.getSubjectById);

// Obtener progreso del usuario
router.get('/progress/:userId', subjectsController.getUserProgress);

// Actualizar progreso del usuario
router.put('/:subjectId/progress/:userId', subjectsController.updateProgress);

module.exports = router;