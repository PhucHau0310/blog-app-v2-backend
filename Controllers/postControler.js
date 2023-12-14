const User = require('../Models/User');
const Post = require('../Models/Post');
const Avatar = require('../Models/Avatar');

const postController = {
    // [POST] /v1/post/:userId
    postBlog: async (req, res) => {
        try {
            const { title, desc } = req.body;
            const author = req.params.userId;
            const image = req.file.filename;

            const post = new Post({
                title,
                desc,
                image,
                author,
            });

            const savePost = await post.save();

            if (req.params.userId) {
                const user = await User.findById(req.params.userId);
                await user.updateOne({ $push: { post: savePost._id } });
            }

            res.status(200).json(savePost);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /v1/post/getAllPosts

    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().populate('author');

            const formattedPosts = posts.map((post) => {
                const authorId = post.author._id;
                const authorUsername = post.author.username;

                const { author, ...others } = post._doc;

                return { ...others, authorId, authorUsername };
            });

            res.status(200).json(formattedPosts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /v1/post/:id/:postId
    deletePost: async (req, res) => {
        try {
            const deletePost = await Post.findByIdAndDelete(req.params.postId);

            if (!deletePost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $pull: { post: req.params.postId } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json('Deleted successfully !!!');
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = postController;
