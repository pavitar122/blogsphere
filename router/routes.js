import express from "express";
import { login, register } from "../controller/users.js";
import { addBlog, deleteBlog, getAllBlogs, getBlog, getBlogByName } from "../controller/blogs.js";

const route = express.Router()


route.post("/register_api", register)

route.post("/login_api", login)




route.post("/add_blog_api", addBlog)


route.get("/all_blogs_api", getAllBlogs)


route.get("/blog_api/:id", getBlog)

route.get("/user_blogs_api/:name", getBlogByName)

route.delete("/delete_blog_api/:id", deleteBlog)

export default route;