const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    reqiured: [true, "Username is reqiured!"],
    minLength: [5, "Username is too short."],
    match: [
      /^[A-Za-z0-9]+/,
      "Username is not with english letters and digits only.",
    ],
    unique: {
      value: true,
      message: "Username already exists",
    },
  },
  password: {
    type: String,
    minLength: [8, "Password is too short!"],
    validate: function (value) {
      return /^[A-Za-z0-9]+/.test(value);
    },
    message: "Invalid characters",
  },
});

userSchema.path("username").validate(function (validate) {
  const user = mongoose.model("User").findOne({ username });
  return !!user;
}, "Username already exists");

// TODO if the user already exists throw error
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password mismatch!");
  }
});

userSchema.pre("save", async function () {
  //                                   word     salt
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
