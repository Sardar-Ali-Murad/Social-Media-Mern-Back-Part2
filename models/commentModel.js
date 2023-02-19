import mongoose from "mongoose";

let commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:[true,"Provide the comment to proceed"]
    },
    post:{
        type:mongoose.Types.ObjectId,
        ref:"SocialMediaAppPosts",
        required:[true,"Please Provide the psot"],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"SocialMediaAppUsers",
        required:[true,"Please Provide the auther"],
    }
})

export default mongoose.model("SocialMediaAppComments",commentSchema)