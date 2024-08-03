import Blog from "../models/blogSchema.js"; 
import User from "../models/userSchema.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;

        console.log(`Received userId: ${userId}`);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "User not found"
            });
        }
        
        const newBlog = await Blog.create({
            title,
            content,
            user: userId
        })


        res.status(201).json({
            status: "success",
            data: newBlog
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blog = await Blog.find().populate("user",{username:1})
        res.status(200).json({
            status: "success",
            data: blog
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate({path:"user",select:"username"})
        .populate({
            path:"comments",
            select:"content",
            populate:{
                path:"user",
                select:"username"
            }
        });

        if (!blog) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found"
            });
        }


        res.status(200).json({
            status: "success",
            data: blog
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editBlog = async (req,res)=>{
    try {
        const blogId = req.params.id;
        const userId = req.user._id;
        const {title,content} = req.body;

        const blog = await Blog.findById(blogId);

        if (!blog || blog.user.toString() !== userId.toString()) {
            return res.status(403).json({
                status: "fail",
                message: "Not authorized to edit this blog post"
            });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content }, { new: true });
        res.status(200).json({
            status: "success",
            data: updatedBlog
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBlog = async (req,res)=>{
    try {
       const blogId = req.params.id;
       const userId = req.user._id;
       const blog = await Blog.findById(blogId);
         if (!blog || blog.user.toString() !== userId.toString()) {
              return res.status(403).json({
                status: "fail",
                message: "Not authorized to delete this blog post"
              });
         }
        await Blog.findByIdAndDelete(blogId); 

    }catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
};

export const likeBlog = async (req,res)=>{
    try {
        const blogId = req.params.id;
        const userId = req.user._id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found"
            });
        }
        if (blog.likedBy.includes(userId)) {
            return res.status(400).json({
                status: "fail",
                message: "You have already liked this blog"
            });
        }
        blog.likedBy.push(userId);
        blog.like = blog.like + 1;
        await blog.save();
        res.status(200).json({
            status: "success",
            data: blog
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};