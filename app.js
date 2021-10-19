//Connect mongo helps in to store the cookies

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
app = express();
const port = 8000;
const path = require("path");
const cookieParser = require("cookie-parser");
//Router will be go here
const router = require("./routes/index");
const db = require("./config/mongoose");
//Session cookies are the strategy which encrypts the user id and store in the server
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const { Mongoose } = require("mongoose");
// const MongoStore = require("connect-mongo-session")(session);
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookies
app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    //When user not loggedin and if we need to store extra data
    saveUninitialized: false,
    // It helps in to check the user data
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // store: new MongoStore(
    //   {
    //     mongooseConnection: db,
    //     autoRemove: "disabled",
    //   },
    //   function (err) {
    //     console.log(err || "connect mongodb setup ok");
    //   }
    // ),
  })
);
app.use(passport.setAuthenticatedUser);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("assets"));

//You can do this and preferable way is this because if you send the data to others
//Their directory have diff might be
// app.set('views',path.join(__dirname,'views'))
app.use("/", router);
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(port, (err) => {
  if (err) {
    console.log(`Your error ${err}`);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
