const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user.model'); // Modèle utilisateur

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Générer un token sécurisé
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1 heure

    // Sauvegarder le token dans la base de données
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    // Configurer et envoyer l'e-mail
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Email de l'expéditeur
        pass: process.env.EMAIL_PASS, // Mot de passe ou app-password
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Réinitialisation du mot de passe',
      html: `<p>Vous avez demandé une réinitialisation de votre mot de passe.</p>
             <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    res.status(200).json({ message: 'E-mail de réinitialisation envoyé.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la demande de réinitialisation.' });
  }
};

module.exports = { forgotPassword };
