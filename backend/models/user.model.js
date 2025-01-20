const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static initModel(sequelize) {
    this.init({
      firstname: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      size: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 120 },
      },
      role: {
        type: DataTypes.ENUM('player', 'coach', 'admin'),
        defaultValue: 'player',
      },
      resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
      resetPasswordExpires: { type: DataTypes.DATE, allowNull: true },
    }, {
      sequelize,
      modelName: 'User',
      timestamps: true,
    });
  }
}

module.exports = User;

