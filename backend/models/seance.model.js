const { DataTypes, Model } = require('sequelize');

class Seance extends Model {
  static initModel(sequelize) {
    this.init({
      date: { type: DataTypes.DATEONLY, allowNull: false },
      time: { type: DataTypes.TIME, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      objective: { type: DataTypes.STRING, allowNull: true },
    }, {
      sequelize,
      modelName: 'Seance',
    });
  }
}

class SeancePlayers extends Model {
  static initModel(sequelize) {
    this.init({
      isPresent: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
      sequelize,
      modelName: 'SeancePlayers',
    });
  }
}

module.exports = { Seance, SeancePlayers };
