const express = require('express');
const router = express.Router();
const { login, register } = require('../controller/auth/auth.controller');

router.post('/login', login);
router.post('/register', register);

module.exports = router;
