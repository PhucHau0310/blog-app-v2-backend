const router = require('express').Router();
const avatarController = require('../Controllers/avatarController');
const middlewareController = require('../Controllers/middlewareController');
const upload = require('../config/uploadFile');

router.post(
    '/:userId',
    middlewareController.verifyToken,
    upload.single('file'),
    avatarController.uploadAvatar
);

router.get(
    '/:avaId',
    middlewareController.verifyToken,
    avatarController.getAnAva
);

router.get(
    '/all/getAllAva',
    middlewareController.verifyToken,
    avatarController.getAllAva
);

module.exports = router;
