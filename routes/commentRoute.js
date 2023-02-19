import express from "express"

let router=express.Router()

import {createComment}  from "../controllers/commentController.js"

router.route("/:postId").post(createComment)

export default router