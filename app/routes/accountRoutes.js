const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authMiddleware');
const {validator} = require("../middleware/validator.middlewares")
const schema = require('../schema/account.schema')

router.post('/accounts', validator(schema.createAccountSchema), accountController.createAccount);
router.get('/accounts', authMiddleware, accountController.getAccounts);
router.get('/accounts/:id', authMiddleware, accountController.getAccountById);
router.put('/accounts/:id', authMiddleware, accountController.updateAccount);
router.delete('/accounts/:id', authMiddleware, accountController.deleteAccount);
router.post('/login', validator(schema.loginSchema),accountController.login);

module.exports = router;
