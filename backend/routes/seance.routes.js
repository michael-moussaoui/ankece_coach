const express = require('express');
const router = express.Router();
const { createSeance, getAllSeances, updatePresence } = require('../controllers/seance.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Créer une séance
router.post('/', authMiddleware, createSeance);

// Récupérer toutes les séances
router.get('/', authMiddleware, getAllSeances);

// Mettre à jour la présence d'un joueur
router.put('/:seanceId/player/:playerId/presence', authMiddleware, updatePresence);

module.exports = router;
