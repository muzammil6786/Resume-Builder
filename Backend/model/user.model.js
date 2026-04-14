const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String,required: true, unique: true },

  password: {
    type: String,
    default: null, // null for Google users
  },
  googleId: String,

  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
});

module.exports = mongoose.model("User", userSchema);
