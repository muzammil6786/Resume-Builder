const authService = require("../service/auth.service");
// const user = require("../model/user.model")

// REGISTER
const register = async (req, res) => {
    try {
        
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            message: "User is Registered Succesfully",
            user
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body);

        res.json({
            message: "Login successful",
            user
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// PROFILE
const profile = async (req, res) => {
    try {
        const user = await authService.getProfile(req.user.userId);

        res.json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// LOGOUT
// controllers/auth.controller.js

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    await authService.logoutUser(token);

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    if (err.message === "Token required") {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: err.message });
  }
};


// GOOGLE CALLBACK
const googleCallback = (req, res) => {
    req.session.userId = req.user._id;
    res.redirect("/auth/profile");
};

module.exports = {
    register,
    login,
    profile,
    logout,
    googleCallback
};