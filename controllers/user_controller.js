const User = require("../models/users");

module.exports.uProfile = (req, res) => {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err, user) => {
      if (user) {
        return res.render("user", {
          title: "User Profile",
          user: user,
        });
      }
      return res.redirect("/login");
    });
  } else {
    return res.render("/login");
  }
};

//action for signUp
module.exports.signUp = (req, res) => {
  return res.render("sign-up");
};

//action for login
module.exports.login = (req, res) => {
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
  //find the user
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user in signingUp");
      return;
    }
    //handle user found
    if (user) {
      //handle password which don't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      //handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/profile");
    } else {
      return res.redirect("back");
    }
  });

  //handle user not found
};
