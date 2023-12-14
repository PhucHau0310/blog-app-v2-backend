const User = require('../Models/User');
const Post = require('../Models/Post');
const Avatar = require('../Models/Avatar');

const avatarController = {
    // [POST] /v1/ava/:userId
    uploadAvatar: async (req, res) => {
        try {
            const file = req.file.filename;
            const newAva = new Avatar({
                file: file,
                author: req.params.userId,
            });

            const saveAva = await newAva.save();

            if (req.params.userId) {
                const user = await User.findById(req.params.userId);

                await user.updateOne({ $push: { avatar: saveAva._id } });
            }

            res.status(200).json(saveAva);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /v1/ava/:avaId
    getAnAva: async (req, res) => {
        try {
            const ava = await Avatar.findById(req.params.avaId);

            res.status(200).json(ava);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /v1/ava/all/getAllAva
    getAllAva: async (req, resp) => {
        try {
            const res = await Avatar.find().populate('author');

            const result = res.map((item) => {
                const { _id, file, author } = item._doc;
                const authorId = author._id;
                const authorUser = author.username;
                const avaListsOfAuthor = author.avatar;

                return {
                    _id,
                    file,
                    authorId,
                    authorUser,
                    avaListsOfAuthor,
                };
            });

            // console.log(result);
            resp.status(200).json(result);
        } catch (error) {
            // console.log(error);
            resp.status(500).json(error);
        }
    },
};

module.exports = avatarController;
