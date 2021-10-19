const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControll = require("../controllers/user_controller");
const passportLocal = require("../config/passport-local");
router.get("/profile", passport.checkAuthentication, userControll.uProfile);
router.get("/signUp", userControll.signUp);
router.get("/login", userControll.login);
router.post("/create", userControll.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/login" }),
  userControll.createSession
);
router.get("/signout", userControll.destrpySession);
module.exports = router;
