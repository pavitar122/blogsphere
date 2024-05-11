import Blog from "../database/models/Blog.js";


export const addBlog = async (req, res) => {
    try {
        const {name, title, subtitle, content, date, image} = req.body;
        const blog = new Blog({name, title, subtitle, content, date, image})
        const addedBlog = await blog.save();
        return res.status(200).send({msg:"Blog has been added.", addedBlog})
    } catch (error) {
        res.status(500).send({ error })
    }
};

export const getAllBlogs =  async (req, res) => {
    try {
        const allblogs = await Blog.find();
        if (allblogs.length > 0){
            return res.status(200).send({allblogs})
        }
    }catch (error) {
        res.status(500).send({ error })
    }
};

export const getBlog =  async (req, res) => {
    try {
        const blog = await Blog.find({ _id: req.params.id });
        return res.status(200).send({ blog })
    } catch (error) {
        res.status(500).send({ error })
    }  
}


export const getBlogByName =  async (req, res) => {
    try {
        let blogs = await Blog.find({ name: req.params.name });
        if (blogs.length > 0) {
            return res.status(200).send({ blogs })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}


export const deleteBlog = async(req, res) => {
    try {
        const result = await Blog.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(200).send({ msg: "Blog was deleted." });
        }
    } catch (error) {
        res.status(500).send({msg:"Blog was not deleated."})
    }
}



