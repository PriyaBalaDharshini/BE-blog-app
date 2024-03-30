import express from 'express'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import multer from 'multer'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json());

//1. Database Connection
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(error))

//Its gonna take our file and save in images folder i.e. destination and the filename will the name from  req.body 
const ourStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    }, filename: (req, file, callback) => {
        callback(null, "hello.jpg")
    }
});
//uploading file
const upload = multer({ storage: ourStorage })
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).send({ message: "File has been uploaded" })
})

app.get("/", (req, res) => res.send("Welcome to blog app backend"))

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/category", categoryRoute);


app.listen(PORT, () => console.log(`App is listening to ${PORT}`))