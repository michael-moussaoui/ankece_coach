const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model'); // Assure-toi que le modèle utilisateur est correctement défini

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // ID client de Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Secret client de Google
      callbackURL: 'http://localhost:3000/auth/google/callback', // URL de redirection
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Vérifie si l'utilisateur existe déjà dans la base de données
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          // Si l'utilisateur n'existe pas, le créer
          user = await User.create({
            googleId: profile.id,
            firstname: profile.name.givenName,
            name: profile.name.familyName,
            email: profile.emails[0].value,
          });
        }

        return done(null, user); // Passe l'utilisateur à Passport
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Sérialisation de l'utilisateur pour la session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
