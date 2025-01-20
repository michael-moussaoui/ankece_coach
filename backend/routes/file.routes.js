const express = require('express');
const router = express.Router();
const { uploadFile, getAllFiles, getFileById } = require('../controllers/file.controller');
const uploadMiddleware = require('../middlewares/upload.middleware'); 

// Route pour télécharger un fichier
router.post('/uploads', uploadMiddleware.single('file'), uploadFile);

// Route pour récupérer tous les fichiers
router.get('/file/all', getAllFiles);

// Route pour récupérer un fichier spécifique
router.get('/file/:id', getFileById);

module.exports = router;
