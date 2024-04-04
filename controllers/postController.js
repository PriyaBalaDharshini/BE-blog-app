import postModel from "../models/PostModel.js"

//Create Post
const createPost = async (req, res) => {
    try {
        const newPost = await postModel.create(req.body)
        await newPost.save();
        res.status(200).send({
            message: "New Post created",
            newPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Update Post
const updatePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        if (post.username !== req.body.username) {
            return res.status(403).send("You can only update your own post");
        }

        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).send({
            message: "Post updated successfully",
            updatedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

//Delete Post
const deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }
        if (post.username === req.body.username) {
            await post.deleteOne();
            return res.status(200).send("Post has been deleted successfully");
        } else {
            return res.status(403).send("You can only delete your own post");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

//Get Post By Id
const getPostById = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        res.status(200).send(post)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

//Get all post
const getAllPost = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat
    try {
        let posts = []
        if (username) {
            posts = await postModel.find({ username: username }) //post based on username
        } else if (catName) {
            posts = await postModel.find({ //post based on category
                categories:
                {
                    $in: [catName]
                }
            })
        } else {
            posts = await postModel.find()
        }
        res.status(200).send(posts)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

export default {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getAllPost
}