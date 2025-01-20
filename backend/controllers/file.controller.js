const path = require('path');
const File = require('../models/file.model'); // Import du modèle

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
  }

  try {
    // Enregistrement dans la base de données
    const newFile = await File.create({
      fileName: req.file.filename,
      filePath: `http://localhost:3000/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
    });

    res.status(201).json({
      message: 'Fichier téléchargé avec succès.',
      file: newFile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de l\'enregistrement du fichier.',
      error: error.message,
    });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await File.findAll(); // Récupère tous les fichiers
    res.status(200).json({
      message: 'Fichiers récupérés avec succès.',
      files,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des fichiers.',
      error: error.message,
    });
  }
};

const getFileById = async (req, res) => {
  const { id } = req.params; // Récupère l'id depuis les paramètres de la requête

  try {
    const file = await File.findByPk(id); // Cherche le fichier par clé primaire
    if (!file) {
      return res.status(404).json({ message: 'Fichier non trouvé.' });
    }

    res.status(200).json({
      message: 'Fichier récupéré avec succès.',
      file,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération du fichier.',
      error: error.message,
    });
  }
};



module.exports = { uploadFile, getAllFiles, getFileById };
