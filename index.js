import express from "express";
import cors from "cors";
import multer from 'multer';
import "./database/config.js"
import Blog from "./database/models/Blog.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import "./database/cloudinary.js"
import path from "path"

import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json())
app.use(cors());

const _dirname = path.dirname("")
const buildpath= path.join(_dirname, "./build")
app.use(express.static(buildpath));

const port = process.env.PORT || 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage });


import route from "./router/routes.js";
app.use(route)


app.get('/', (req, res) => {
    res.send('Your app blogsphere app is running.');
  });
  

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const stream = cloudinary.uploader.upload_stream({ folder: 'header' }, (error, result) => {
            res.status(200).send(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image');
    }
});




app.post('/edit-blog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: { title: req.body.title, subtitle: req.body.subtitle, content: req.body.content } },
            { new: true }
        );
        if (!updateBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({updateBlog})
    } catch (error) {
        console.error('Error occurred while updating blog:', err);
    }

})



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

