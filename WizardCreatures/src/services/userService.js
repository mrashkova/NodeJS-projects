const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

// validate password function
async function validatePassword(password, userPassword) {
  const isValid = await bcrypt.compare(password, userPassword);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }
}

// 16. Generate jwt
async function getToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
}

// exports.register = (userData) => User.create(userData);
exports.register = async (userData) => {
  const { password } = userData;
  const user = await User.create(userData);

  // validate password
  await validatePassword(password, user.password);

  // 16. Generate jwt
  const token = await getToken(user);
  return token;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  // validate user
  if (!user) {
    throw new Error("Invalid email or password!");
  }

  // validate password
  await validatePassword(password, user.password);

  // 16. Generate jwt
  const token = await getToken(user);
  return token;
};
