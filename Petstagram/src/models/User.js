const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: [
      2,
      "The username is required and should be at least 2 characters long.",
    ],
  },
  email: {
    type: String,
    reqiured: true,
    minLength: [
      10,
      "The email is required and should be at least 10 characters long",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [
      4,
      "The password is required and should be at least 4 characters long",
    ],
  },
});

// - validate username already exists
userSchema.path("username").validate(function (usernameInput) {
  const username = mongoose.model("User").findOne({ username: usernameInput });
  return !!username;
}, "Username already exists");

// - validate password mismatch
userSchema.virtual("repeatPassword").set(function (value) {
  if (value != this.password) {
    throw new Error(
      "The repeat password is required and should be equal to the password."
    );
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
