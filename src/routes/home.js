const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home");
const multer = require('../helpers/multer'); 

router.get("/", homeController.getApplicationForm);
router.post("/", multer.file_upload.single('resume_file'), homeController.postApplicationForm);

module.exports = router;