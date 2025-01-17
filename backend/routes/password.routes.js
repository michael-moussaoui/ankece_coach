const express = require('express');
const { forgotPassword } = require('../controllers/password.controller');

const router = express.Router();

router.post('/forgot-password', forgotPassword);

module.exports = router;
