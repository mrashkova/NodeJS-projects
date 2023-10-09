const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
