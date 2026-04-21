const Post = require('../models/post');

exports.createPost =async(req, res)=>{
    try{
        const post= await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        });
        res.status(201).json(post);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.getPosts= async(req,res)=>{
    const posts= await Post.find().populate("author", "name");
    res.json(posts);
};

exports.getPostById= async (req,res)=> {
    try{
        const post= await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: 'Post not Found'});
        }
        res.json(post);
    } catch(err){
        res.status(500).json({message: err.message});
    }

};

exports.updatePostById= async (req,res)=>{
    try{
        const post= await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
        if(!post){
            return res.status(404).json({message: 'Post not Found'});
        }
        res.json(post);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.deletePost= async (req,res)=>{
    try{
        const post= await Post.findByIdAndDelete(req.params.id);
            if(!post){
            return res.status(404).json({message: 'Post not Found'});
        }
        res.json({message: 'Post deleted successfully'});
    
    }catch(err){
        res.status(500).json({message: err.message});
    }
    
}

