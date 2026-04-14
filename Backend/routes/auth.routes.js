const express = require("express");
const passport = require("passport");
const authController = require("../controller/auth.controller");
const {authMiddleware} = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken");
const router = express.Router();

// EMAIL AUTH
router.post("/register", authController.register);
router.post("/login", authController.login);

// GOOGLE AUTH

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  (req, res, next) =>
    passport.authenticate("google", { session: false }, (err, user) => {
      if (err || !user) {
        return res.redirect("https://resume-builder-pi-pearl.vercel.app/");
      }

      // ✅ GENERATE TOKEN HERE (IMPORTANT)
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "8h" }
      );

      // ✅ SEND TOKEN TO FRONTEND
      res.redirect(`https://resume-builder-pi-pearl.vercel.app/google-success?token=${token}`);
    })(req, res, next)
);


// Step 1: Redirect to Google
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Step 2: Callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     const token = jwt.sign(
//       { userId: req.user._id },
//       process.env.JWT_ACCESS_SECRET,
//       { expiresIn: "8h" }
//     );

//     // redirect to frontend with token
//     res.redirect(`http://localhost:5173/oauth-success?token=${token}`);;
//   }
// );

// http://localhost:4000/api/auth/google/callback



// COMMON
router.get("/profile",authMiddleware, authController.profile);
router.get("/logout",authMiddleware, authController.logout);

module.exports = router;