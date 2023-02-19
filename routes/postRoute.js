import express from  "express" 

let router=express.Router()
import {createPost,getAllPosts,updatePost}  from "../controllers/postController.js"

import uploadImage from "../controllers/UploadImage.js"
import auth from "../middleware/auth.js"


router.route("/").post(createPost).get(getAllPosts)
router.route("/like/:postId").get(updatePost)
router.route('/uploadImage').post(uploadImage);


export default router