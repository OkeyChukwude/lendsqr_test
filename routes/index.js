const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));

router.get('/', (req, res) => {
  res.send('Welcome to new API');
});

module.exports = router;