import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to auth route"
    })
})

router.post("/register", userController.register)
router.post("/login", userController.login)

export default router