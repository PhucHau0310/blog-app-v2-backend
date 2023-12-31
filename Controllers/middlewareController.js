const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;

        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_TOKEN_SECRET,
                (err, user) => {
                    if (err) {
                        return res.status(403).json('Token is not valid');
                    }
                    req.user = user;
                    next();
                }
            );
        } else {
            return res.status(401).json('You are not authenticated ');
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            // console.log(req.user);
            // console.log(req.user.postId);
            // console.log(typeof req.user.postId);

            // console.log(req.params.postId);
            // console.log(typeof req.params.postId);

            // console.log(req.user.postId?.includes(req.params.postId));
            if (
                req.user &&
                (req.user.postId?.includes(req.params.postId) || req.user.admin)
            ) {
                next();
            } else {
                return res
                    .status(403)
                    .json('You are not allowed to delete other');
            }
        });
    },
};

module.exports = middlewareController;
