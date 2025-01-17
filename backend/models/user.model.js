const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Vérifie si l'email est valide
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER, // Utilisez INTEGER pour une taille (par exemple, en cm)
    allowNull: true,
    validate: {
      min: 120, // Taille minimale
    },
  },
  role: {
    type: DataTypes.ENUM('player', 'coach', 'admin'), // Limite les valeurs possibles
    defaultValue: 'player', // Rôle par défaut
  },
  resetPasswordToken: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  resetPasswordExpires: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
}, {
  timestamps: true, // Crée automatiquement createdAt et updatedAt
});

module.exports = User;
