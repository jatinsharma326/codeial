const express = require("express");
const router = express.Router();

const postingImage = require("../controllers/posting");

router.get("/post", postingImage.postImg);

module.exports = router;
