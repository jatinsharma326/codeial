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
