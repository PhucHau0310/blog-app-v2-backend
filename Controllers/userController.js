const User = require('../Models/User');
const bcrypt = require('bcrypt');

const userController = {
    // [GET] /v1/user/:userId
    getAnUser: async (req, res) => {
        try {
            const userId = req.params.userId;

            const infoUser = await User.findById(userId)
                .populate('avatar')
                .populate('post');

            const { password, ...others } = infoUser._doc;

            res.status(200).json({ ...others });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [PUT] /v1/user/updateUser/:userId
    updateUser: async (req, res) => {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const userId = req.params.userId;
            const plainPassword = req.body.password;

            if (!plainPassword) {
                return res
                    .status(400)
                    .json({ message: 'Password is required for update' });
            }

            const salt = await bcrypt.genSalt(10);

            if (plainPassword) {
                const hashed = await bcrypt.hash(plainPassword, salt);

                const foundUser = await User.findByIdAndUpdate(
                    userId,
                    {
                        username,
                        email,
                        password: hashed,
                    },
                    { new: true }
                );

                const { password, ...others } = foundUser._doc;

                res.status(200).json({ ...others });
            } else {
                return res
                    .status(400)
                    .json({ message: 'Password is required for update' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = userController;
