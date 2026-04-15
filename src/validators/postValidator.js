const { body } = require("express-validator");

exports.createPostValidation= [
    body("title")
     .notEmpty().withMessage("Title is required"),

    body("content")
      .notEmpty().withMessage("Content is required"), 
];

exports.updatePostValidation=[
    body("title")
    .optional()
    .notEmpty().withMessage("Title is required"),

    body("content")
      .optional()
      .notEmpty().withMessage("Content is required")  
    

];