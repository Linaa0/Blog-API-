const express= require('express');
const authMiddleware = require('../middleware/authmiddleware');
const roleMiddleware = require('../middleware/rolemiddleware');
const validate= require("../middleware/validate");

const {
    createPostValidation,
    updatePostValidation
}= require("../validators/postValidator");

const router= express.Router();

const {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePost
}= require ('../controllers/postController');


router.post('/', authMiddleware, createPostValidation, validate, createPost);

router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id',authMiddleware,updatePostValidation,validate, updatePostById);
router.delete('/:id',authMiddleware, roleMiddleware("admin"), deletePost);

module.exports= router;