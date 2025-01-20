const { Seance, SeancePlayers} = require('../models/seance.model');
const {User } = require('../models/user.model');

// Créer une séance
exports.createSeance = async (req, res) => {
  const { date, time, location, objective, playerIds } = req.body;
  try {
    const seance = await Seance.create({
      date,
      time,
      location,
      objective,
      creatorId: req.user.id, // Utilisateur connecté
    });

    if (playerIds && playerIds.length > 0) {
      const players = playerIds.map((playerId) => ({
        SeanceId: seance.id,
        UserId: playerId,
      }));
      await SeancePlayers.bulkCreate(players);
    }

    res.status(201).json({ message: 'Séance créée avec succès.', seance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la séance.' });
  }
};

// Obtenir toutes les séances
exports.getAllSeances = async (req, res) => {
  try {
    const seances = await Seance.findAll({
      include: [
        { model: User, as: 'creator', attributes: ['id', 'firstname', 'name'] },
        {
          model: User,
          as: 'players',
          attributes: ['id', 'firstname', 'name'],
          through: { attributes: ['isPresent'] },
        },
      ],
    });
    res.status(200).json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des séances.' });
  }
};

// Mettre à jour la présence d'un joueur
exports.updatePresence = async (req, res) => {
  const { seanceId, playerId } = req.params;
  const { isPresent } = req.body;
  try {
    const seancePlayer = await SeancePlayers.findOne({
      where: { SeanceId: seanceId, UserId: playerId },
    });

    if (!seancePlayer) {
      return res.status(404).json({ message: 'Joueur non trouvé pour cette séance.' });
    }

    seancePlayer.isPresent = isPresent;
    await seancePlayer.save();

    res.status(200).json({ message: 'Statut de présence mis à jour.', seancePlayer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la présence.' });
  }
};
