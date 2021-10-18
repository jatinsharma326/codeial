const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControll = require("../controllers/user_controller");
router.get("/profile", userControll.uProfile);
router.get("/signUp", userControll.signUp);
router.get("/login", userControll.login);
router.post("/create", userControll.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userControll.createSession
);
module.exports = router;
