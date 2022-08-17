const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const accountController = require('../../controller/accounts');

router.post('/', auth, accountController.create);
router.get('/balance', auth, accountController.balance);
router.post('/fund', auth, accountController.fund);
router.post('/transfer', auth, accountController.transfer);
router.post('/withdraw', auth, accountController.withdraw);

module.exports = router;