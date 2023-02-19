import mongoose from "mongoose";

let postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Provide the Post Title"],
    },
    image:{
        type:String,
        reuired:[true,"Please Provide the Post Image"]
    },
     user:{
        type:mongoose.Types.ObjectId,
        required:[true,"Please Provide the auther"],
        ref:"SocialMediaAppUsers",
        reuired:[true,"Please Provide the Post User"]
     },
     comments:
         [{type:mongoose.Types.ObjectId,ref:"SocialMediaAppComments"}],
     likes:
        [{type:mongoose.Types.ObjectId,ref:"SocialMediaAppUsers"}]
},{timestamps:true})

export default mongoose.model("SocialMediaAppPosts",postSchema)