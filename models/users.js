const mongoose = require("mongoose");

//How can you define a schema
const users = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    //InOrder to get the date and time you can refer to this
    timestamps: true,
  }
);

const User = mongoose.model("User", users);

module.exports = User;
