const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
//Now telling the passport that use this localStrategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> Passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//Serialize the user or transfer the id || data to the server
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("Error in finding user--> Passport");
      return done(err);
    }
    return done(null, user);
  });
});

//Check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  //if the user is signedIn then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
  //if the user is not signedin
  // return res.redirect('/login');
};

passport.setAuthenticatedUser = (req, res, next) => {
  //req.user contains the current signedin in user from the session cookie and we are just sending this to the locals
  //for the views
  if (req.isAuthenticated) {
    res.locals.user = req.user;
  }
  next();
};

//The data that stores in this is temporary but we need to fix it
//by storing this data permanently
module.exports = passport;
