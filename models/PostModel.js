import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
    categories: {
        type: Array,
        require: false
    }
},
    { timestamps: true }
)

const postModel = mongoose.model("Post", PostSchema);
export default postModel;