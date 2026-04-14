const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user.model");

const generateAccessToken = (user) => {
  return jwt.sign({
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "8h" }
  );
};

passport.use(new BasicStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `https://resume-builder-p13s.onrender.com/api/auth/google/callback`
    },
    async (googleAccessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        //  create user if not exists
        if (!user) {
          user = await User.create({
            name: profile.displayName, // ✅ FIXED
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            provider: "google",
          });
        }

        // ✅ Generate JWT AFTER user exists
        const token = generateAccessToken(user);

        // attach token to user (temporary)
        user._doc.accessToken = token;

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;