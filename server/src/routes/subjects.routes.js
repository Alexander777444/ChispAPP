const router = require('express').Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Matemáticas' },
    { id: 2, name: 'Español' }
  ]);
});

module.exports = router;