const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const userProfile = require("./user");
const postProfile = require("./post");
router.get("/", homeController.home);
router.use("/", userProfile);
router.use("/", postProfile);
module.exports = router;
