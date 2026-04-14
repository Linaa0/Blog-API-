const express= require('express');
const authMiddleware = require('../middleware/authmiddleware');
const roleMiddleware = require('../middleware/rolemiddleware');

const router= express.Router();

const {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePost
}= require ('../controllers/postController');


router.post('/', authMiddleware, createPost);

router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id',authMiddleware, updatePostById);
router.delete('/:id',authMiddleware, roleMiddleware("admin"), deletePost);

module.exports= router;