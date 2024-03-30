import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to Category route"
    })
})
router.post("/create-category", categoryController.createCategory)
router.get("/all-category", categoryController.getAllCategory)

export default router