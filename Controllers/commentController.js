const Comment = require('../Models/Comment');

const commentController = {
    // [POST] /v1/comment/postComment/:ownerId
    postComment: async (req, res) => {
        try {
            const newPost = new Comment({
                ownerId: req.params.ownerId,
                content: req.body.content,
            });

            const savePost = await newPost.save();

            res.status(200).json(savePost);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /v1/comment/delete/commentId
    deleteComment: async (req, res) => {
        try {
            const foundCmt = await Comment.findByIdAndDelete(
                req.params.commentId
            );

            res.status(200).json('Deleted Successfully !');
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = commentController;
