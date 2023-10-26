const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

// Validate password function
async function validatePassword(password, userPassword) {
  const isValid = await bcrypt.compare(password, userPassword);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }
}

// Generate jwt
async function getToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "5d" });
  return token;
}

// Register function
exports.register = async (userData) => {
  const { password } = userData;
  const user = await User.create(userData);

  //   Validate password
  await validatePassword(password, user.password);

  //   Generate jwt
  const token = await getToken(user);
  return token;
};

// Login function
exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  // validate user
  if (!user) {
    throw new Error("Invalid email or password!");
  }

  // validate password
  await validatePassword(password, user.password);

  //   Generate jwt
  const token = await getToken(user);
  return token;
};
