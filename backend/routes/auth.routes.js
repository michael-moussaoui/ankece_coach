const express = require('express');
const { register, login, logout, resetPassword } = require('../controllers/auth.controller');
const passport = require('../config/passport'); 
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password', resetPassword);

// Démarrer l'authentification Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback après succès
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Rediriger avec le token ou gérer la session
    res.redirect("/");
  }
);

module.exports = router;
