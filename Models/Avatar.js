const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema(
    {
        file: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Avatar', avatarSchema);
