import Post from "../models/postModel.js"

import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/index.js"


export const createPost=async (req,res)=>{
   let {title,image}=req.body
   if(!title || !image){
    throw new BadRequestError("Plase Provide Both the title and the Image")
   }

   req.body.user=req.user.userId

  let post= await Post.create(req.body)

   res.status(StatusCodes.CREATED).json({msg:"The Post is created successfully",post})
}


export const updatePost=async (req,res)=>{
    let {postId}=req.params
    let postPresent=await Post.findOne({_id:postId})
    if(!postPresent){
        throw new BadRequestError("The Post is not present")
    }
    
    let alreadyLiked=postPresent.likes.includes(req.user.userId)

    if(alreadyLiked){
        await Post.updateOne({_id:postId},{$pull:{likes:req.user.userId}})
    }

    else{
        await Post.updateOne({_id:postId},{$push:{likes:req.user.userId}})
    }
    
    res.status(StatusCodes.OK).json({msg:"The Like/Dislike is accoured correctly"})
}


export const getAllPosts=async (req,res)=>{
    let Posts=await Post.find({}).populate({path:"user"}).populate({path:"comments",populate : {
        path : 'user'
      }})
    res.status(StatusCodes.OK).json({Posts})
}

