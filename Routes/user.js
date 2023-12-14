const router = require('express').Router();
const userController = require('../Controllers/userController');
const middlewareController = require('../Controllers/middlewareController');

router.get(
    '/:userId',
    middlewareController.verifyToken,
    userController.getAnUser
);

router.put(
    '/updateUser/:userId',
    middlewareController.verifyToken,
    userController.updateUser
);

module.exports = router;
