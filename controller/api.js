const fs = require('fs')
const Post = require('../model/model')

module.exports = class Api {

    //fetch post
    static async fetchAllPost(req,res){
        try{
            const post = await Post.find();
            res.status(200).json(post);
        }
        catch(err){
            res.status(400).json({message:err.message})
        }
    }

    //fetch by ID
    static async fetchPostByID(req,res){
        const postId = req.params.id 
        try{
            const post = await Post.findById(postId);
            res.status(200).json(post)
        }
        catch{
            res.status(400).json({message:'No Movie'})
        }
    }

    //create a post
    static async CreatePost(req,res){
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try{
           await Post.create(post)
           res.status(200).json({message:'Post Created Successfully'})
        }
        catch{
            res.status(400).json({message:'Check Internet Connectivity'})
        }
    }

    //update Post
    static async UpdatePost(req,res){
        const id = req.params.id;
        
        let new_image = "";
        if(req.file){
            new_image = req.file.filename;
            
        try{
            fs.unlinkSync('./uploads/'+req.body.old_image)
        }catch{

        }
    }
    else{
        new_image = req.body.old_image;    
    }
    const newPost = req.body;
    newPost.image = new_image;
    try{
        await Post.findByIdAndUpdate(id,newPost);
        res.status(200).json({message:'Post Updated'});
    }catch{

    }
    }

    //delete Post
    static async DeletePost(req,res){
        const id = req.params.id;
        try{
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try{
                    fs.unlinkSync('/uploads/'+result.image)
                }
                catch{

                }
            }
            res.status(200).json({message:'Post deleted'})
        }
        catch{

        }
    }
    
}