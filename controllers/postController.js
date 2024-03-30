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

//Update Post
const updatePost = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const post = await postModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).send({
                message: "Post update successfully",
                post
            })


        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error")
        }
    } else {
        res.status(400).send("You can update only your post")
    }
}

//Delete Post
const deletePost = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const post = await postModel.findByIdAndDelete(req.params.id)
            res.status(200).send("Post Has Been Deleted Successfully")

        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error")
        }
    } else {
        res.status(400).send("You can delete only your post")
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