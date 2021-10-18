const express = require("express");
const expressLayouts = require("express-ejs-layouts");
app = express();
const port = 8000;
const path = require("path");
const cookieParser = require("cookie-parser");
//Router will be go here
const router = require("./routes/index");
const db = require("./config/mongoose");
app.use(express.urlencoded());
app.use(cookieParser());
app.set("view engine", "ejs");

//You can do this and preferable way is this because if you send the data to others
//Their directory have diff might be
// app.set('views',path.join(__dirname,'views'))
app.set("views", "./views");
app.use("/", router);
app.use(express.static("assets"));
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
