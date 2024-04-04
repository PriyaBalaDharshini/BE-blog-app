import bcrypt from 'bcrypt'
import userModel from "../models/UserModel.js";
import postModel from '../models/PostModel.js'

//register new user
const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const genSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const newUser = await userModel({ username, email, password: hashedPassword })
        await newUser.save()
        res.status(200).send({
            message: "New User created successfully",
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "User Exists with the given credential. Please login or Register with new credentials"
        })
    }
}

//login
const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        !user && res.status(400).send("User not found");

        const validate = await bcrypt.compare(req.body.password, user.password);
        !validate && res.status(400).send("Incorrect password");
        const { password, ...others } = user._doc

        res.status(200).send({
            message: "Login Successfull", others
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//Update
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(8);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,
                { $set: req.body }, { new: true })

            res.status(200).send({ message: "User Details Upated", updatedUser })

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    } else {
        res.status(401).send({ message: "You can update only your account" })
    }

}
//Delete
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        const user = await userModel.findById(req.params.id)
        if (user) {
            try {

                await postModel.deleteMany({ username: req.body.username })
                await userModel.findByIdAndDelete(req.params.id)
                res.status(200).send({ message: "User Deleted Successfully" })
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: "Internal Server Error" });
            }
        } else {
            res.status(400).send("User Not Found")
        }
    } else {
        res.status(401).send({ message: "You can delete only your account" })
    }
}
//get user by ID
const userById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).send({ message: "User details Fetched Successfully", user: others })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}



export default {
    register,
    login,
    updateUser,
    deleteUser,
    userById
}