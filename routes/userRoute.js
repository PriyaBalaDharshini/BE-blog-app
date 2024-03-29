import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to User route" })
})
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.userById);

export default router