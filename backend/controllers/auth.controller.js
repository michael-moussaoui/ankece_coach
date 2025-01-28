const { Op } = require('sequelize');
const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/token.util');
const User = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { firstname, name, email, password, size } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ firstname, name, email, password: hashedPassword, size });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

const resetPassword = async (req, res) => {
  console.log('Requête reçue sur /reset-password avec le token :', req.body.token); // Log de débogage
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }, // Vérifie si le token est encore valide
      },
    });

    if (!user) {
       console.log('Utilisateur introuvable ou token expiré.');
      return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }

    // Met à jour le mot de passe
    console.log('Utilisateur trouvé, mise à jour du mot de passe...');
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = null; // Supprime le token
    user.resetPasswordExpires = null;
    await user.save();

    console.log('Mot de passe mis à jour avec succès.');
    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    console.error('Erreur dans resetPassword:', error);
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
  }
};

module.exports = { register, login, logout, resetPassword };
