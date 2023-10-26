const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [
      3,
      "The username is required and should be at least 3 characters long.",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: { value: true, message: "Username already exists" },
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
      "The password is required and should be at least 4 characters long.",
    ],
  },
});

// Validate email
userSchema.path("email").validate(function (emailInput) {
  const email = mongoose.model("User").findOne({ email: emailInput });
  return !!email;
}, "Email already exists!");

// Validate password mismatch
userSchema.virtual("repeatPassword").set(function (value) {
  if (value != this.password) {
    throw new Error(
      "The repeat password is required and should be equal to the password."
    );
  }
});

// Hash password
userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
