import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"
import {BadRequestError} from "../errors/index.js"
import {StatusCodes}  from 'http-status-codes'

export const createComment=async (req,res)=>{
    let {postId}=req.params
   let postPresent =await Post.findOne({_id:postId})
   if(!postPresent){
    throw new BadRequestError("The Post is not there for this Id")
   }

   let alreadyComment=await Comment.findOne({user:req.user.userId,post:postId})
   
         if(alreadyComment){
           throw new BadRequestError("You have already added comment to this post")
         }

   let postComment=await Comment.create({comment:req.body.comment,post:postId,user:req.user.userId})
   
    
        await Post.updateOne({_id:postId},{$push:{comments:postComment._id}})
    

    //  await postPresent.comments.push(postComment._id)

   res.status(StatusCodes.CREATED).json({msg:"The Post is created successfully"})
}