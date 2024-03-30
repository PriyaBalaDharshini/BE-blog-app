import express from "express";
import postController from "../controllers/postController.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to post page")
})
router.get("/all-posts", postController.getAllPost)
router.post("/create-post", postController.createPost)
router.put("/:id", postController.updatePost)
router.delete("/:id", postController.deletePost)
router.get("/:id", postController.getPostById)


export default router