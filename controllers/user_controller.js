const User = require("../models/users");

module.exports.uProfile = (req, res) => {
  return res.render("user", {
    title: "User Profile",
  });
};

//action for signUp
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  }
  return res.render("sign-up");
};

//action for login
module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  }
  return res.render("login");
};

module.exports.create = (req, res) => {
  //ToDo
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  //If the password are same then it will check that if the email is their or not
  //if it it find a user with that email then it will move to login
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user in signingUp");
      return;
    }

    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("error in finding user in signingUp");
          return;
        }
        return res.redirect("/login");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//SignIn and create the session for the user
module.exports.createSession = (req, res) => {
  //This is my create session which is locally authenticated

  //find the user

  return res.redirect("/");

  // User.findOne({ email: req.body.email }, (err, user) => {
  //   if (err) {
  //     console.log("error in finding user in signingUp");
  //     return;
  //   }
  //   //handle user found
  //   if (user) {
  //     //handle password which don't match
  //     if (user.password != req.body.password) {
  //       return res.redirect("back");
  //     }
  //     //handle session creation
  //     res.cookie("user_id", user.id);
  //     return res.redirect("/profile");
  //   } else {
  //     return res.redirect("back");
  //   }
  // });

  //handle user not found
};

module.exports.destrpySession = (req, res) => {
  req.logout();
  return res.render("/");
};
