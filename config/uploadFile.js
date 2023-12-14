const path = require('path');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatar/');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
