import categoryModel from "../models/CategoryModel.js";

const createCategory = async (req, res) => {
    try {
        const newCat = await new categoryModel(req.body)
        await newCat.save()
        res.status(200).send({ message: "Category has been created", newCat })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}
const getAllCategory = async (req, res) => {
    try {
        const allCat = await categoryModel.find()
        res.status(200).send({ message: "All Category", allCat })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

export default { createCategory, getAllCategory }