const express = require('express');
const router = express.Router();

// import controller functions
const { register, login, createAdmin } = require('../controllers/authController');
const validate= require("../middleware/validate");

const {
    registerValidation,
    loginValidation
}= require("../validators/authValidator")

// REGISTER
router.post('/register', registerValidation, validate, register);

// LOGIN
router.post('/login',loginValidation, validate, login);

module.exports = router;