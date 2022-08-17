const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const usersController = require('../../controller/users')

router.post('/register', usersController.register);
router.post('/login', usersController.login); 

module.exports = router;