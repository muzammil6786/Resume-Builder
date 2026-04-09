// services/auth.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user.model");
const BlacklistToken = require("../model/blacklist.model");

const generateAccessToken = (user) => {
  return jwt.sign({
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "8h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({
      userId: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};


const registerUser = async ({ name, email, password }) => {
  email = email.toLowerCase();
  if (!email.endsWith("@gmail.com")) {
      throw new Error("Only Gmail addresses are allowed");
    }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken,refreshToken };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!email.endsWith("@gmail.com")) {
      throw new Error("Only Gmail addresses are allowed");
    }

  if (!user) {
    throw new Error("User is not registered, please signup ");
  }
  const isMatch = await bcrypt.compare(password, user.password || "");

  if (!isMatch) {
    throw new Error("Incorrect Password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  return user;
};


// services/auth.service.js

const logoutUser = async (token) => {
  if (!token) {
    throw new Error("Token required");
  }
  const decoded = jwt.decode(token);

  if (!decoded || !decoded.exp) {
    throw new Error("Invalid token");
  }
  await BlacklistToken.create({
    token,
    expiresAt: new Date(decoded.exp * 1000),
  });

  return true;
};





module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
};
