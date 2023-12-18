const router = require('express').Router();
const commentController = require('../Controllers/commentController');
const middlewareController = require('../Controllers/middlewareController');

router.post(
    '/postComment/:ownerId',
    middlewareController.verifyToken,
    commentController.postComment
);

router.delete(
    '/delete/:commentId',
    middlewareController.verifyToken,
    commentController.deleteComment
);
module.exports = router;
