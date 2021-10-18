const express = require("express");
const router = express.Router();
const userControll = require("../controllers/user_controller");
router.get("/profile", userControll.uProfile);
router.get("/signUp", userControll.signUp);
router.get("/login", userControll.login);
router.post("/create", userControll.create);
router.post("/create-session", userControll.createSession);
module.exports = router;
