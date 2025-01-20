const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');

// Route pour télécharger un fichier
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'Aucun fichier téléchargé.' });
  }
  res.status(200).send({
    message: 'Fichier téléchargé avec succès.',
    filePath: `/uploads/${req.file.filename}`, // URL pour accéder au fichier
  });
});

module.exports = router;
