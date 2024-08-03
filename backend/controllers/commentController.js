import Comment from "../models/commentSchema.js";
import Blog from "../models/blogSchema.js";

export const createComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { content } = req.body;
        const userId = req.user._id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json({
                status: "fail",
                message: "Blog not found"
            });
        }
        const comment = await Comment.create({
            content,
            blog: blogId,
            user: userId
        });
        
        blog.comments.push(comment._id);
        await blog.save();


        res.status(201).json({
            status: "success",
            data: comment
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
};

export const deleteComment = async (req, res) => {
    try {

        const commentId = req.params.id;
        const userId = req.user._id;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({
                status: "fail",
                message: "Comment not found"
            });
        }
        if (comment.user.toString() !== userId.toString()) {
            return res.status(400).json({
                status: "fail",
                message: "You are not authorized to delete this comment"
            });
        }
        await Comment.findByIdAndDelete(commentId);

        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};