const { DataTypes, Model } = require('sequelize');

class File extends Model {
  static initModel(sequelize) {
    this.init({
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: true, // Par exemple : 'image/jpeg', 'video/mp4'
      },
      uploadedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      sequelize,
      modelName: 'File',
      timestamps: true, // Ajoute createdAt et updatedAt
    });
  }
}

module.exports = File;
