const { body }= require("express-validator");

exports.registerValidation= [
    body("name")
     .notEmpty().withMessage("Name field is required"),

     body("email")
       .isEmail().withMessage("Valid email is required")
       .normalizeEmail(),

     body("password")
      .isLength({ min: 8}).withMessage("Password must be at least 8 characters")  
];

exports.loginValidation= [
    body("email")
      .isEmail().withMessage("Valid email is required"),

      body("password")
        .notEmpty().withMessage("Password is required")
];