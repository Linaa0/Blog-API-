const express = require('express');
const router = express.Router();

// import controller functions
const { register, login, createAdmin } = require('../controllers/authController');

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

module.exports = router;