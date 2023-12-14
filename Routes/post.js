const router = require('express').Router();
const postController = require('../Controllers/postControler');
const middlewareController = require('../Controllers/middlewareController');
const path = require('path');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/post/');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

router.post(
    '/:userId',
    middlewareController.verifyToken,
    upload.single('file'),
    postController.postBlog
);

router.get(
    '/getAllPosts',
    middlewareController.verifyToken,
    postController.getAllPosts
);

router.delete(
    '/:id/:postId',
    middlewareController.verifyTokenAndAdminAuth,
    postController.deletePost
);

module.exports = router;
