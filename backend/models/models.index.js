const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const { Seance, SeancePlayers } = require('./seance.model');
const File = require('./file.model');

// Initialiser les modèles
User.initModel(sequelize);
Seance.initModel(sequelize);
SeancePlayers.initModel(sequelize);
File.initModel(sequelize)

// Configurer les relations
Seance.belongsTo(User, { as: 'creator' });
Seance.belongsToMany(User, { as: 'players', through: SeancePlayers });
User.belongsToMany(Seance, { as: 'attendedSeances', through: SeancePlayers });

module.exports = sequelize;
