const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [
      3,
      "The first name is required and should be at least 3 characters long.",
    ],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [
      3,
      "The last name is required and should be at least 3 characters long",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [
      10,
      "The email is required and should be at least 10 characters long.",
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

userSchema.path("email").validate(function (emailInput) {
  const email = mongoose.model("User").findOne({ email: emailInput });
  return !!email;
}, "Email already exists");

// - validate password mismatch
userSchema.virtual("repeatPassword").set(function (value) {
  if (value != this.password) {
    throw new Error("Password mismatch!");
  }
});

// 14. Hash password
userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
