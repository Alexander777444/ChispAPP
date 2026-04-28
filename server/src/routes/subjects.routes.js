const router = require('express').Router();
const subjectsController = require('../controllers/subjects.controller');

router.get('/', subjectsController.getSubjects);
router.post('/', subjectsController.createSubject);

module.exports = router;