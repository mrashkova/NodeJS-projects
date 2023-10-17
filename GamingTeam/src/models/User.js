const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requred: [true, "Username is required!"],
    minLength: [5, "The username should be at least five characters long!"],
  },
  email: {
    type: String,
    requred: [true, "Email is required!"],
    unique: [true, "Email already exists!"],
    minLength: [10, "The email should be at least ten character long!"],
  },
  password: {
    type: String,
    requred: true,
    minLength: [4, "The password should be at least four characters long!"],
  },
});

userSchema.path("email").validate(function (emailInput) {
  const email = mongoose.model("User").findOne({ email: emailInput });
  return !!email;
}, "Email already exists!");

userSchema.virtual("repeatPassword").set(function (value) {
  if (value != this.password) {
    throw new Error(
      "The password confirmation should be equal to the password!"
    );
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
