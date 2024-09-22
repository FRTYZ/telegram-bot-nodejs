const multer = require("multer");

const storage = multer.memoryStorage();
const file_upload = multer({storage});

const body_parse = multer();

module.exports = {
    file_upload,
    body_parse
}
