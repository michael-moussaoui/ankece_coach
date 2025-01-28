const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const sequelize = require('./config/database');
const sequelize = require('./models/models.index');
const authRoutes = require('./routes/auth.routes');
const passwordRoutes = require('./routes/password.routes');
const seanceRoutes = require('./routes/seance.routes');
const uploadRoutes = require('./routes/upload.routes');
const fileRoutes = require('./routes/file.routes');

const app = express();
const PORT = process.env.PORT || 3000; // Remplace avec ton port ou utilise une variable d'environnement
// const allowedDomains = ['https://www.googleapis.com']; // Liste des domaines autorisés pour le proxy

// Configuration de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL, // Autoriser uniquement l'origine du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Autoriser l'envoi de cookies ou d'en-têtes d'autorisation
}));


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'hIUSOz0uAYyCY9WMaePS8kkwAYsJoBjP',
  issuerBaseURL: 'https://dev-jpgh5ffcy23zaa22.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // Utilise l'URL du frontend dans les variables d'environnement
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// // Middleware pour vérifier si l'URL est autorisée avant le proxy
// app.use('/proxy', (req, res, next) => {
//   const targetUrl = req.query.url;
//   if (!targetUrl || !allowedDomains.some(domain => targetUrl.startsWith(domain))) {
//     return res.status(403).send('URL non autorisée');
//   }
//   next(); // Si l'URL est autorisée, continuer vers le proxy
// });

// // Configuration du proxy
// app.use('/proxy', createProxyMiddleware({
//   target: 'https://www.googleapis.com',
//   changeOrigin: true,
//   pathRewrite: (path, req) => {
//     const targetUrl = req.query.url;
//     return targetUrl ? new URL(targetUrl).pathname + new URL(targetUrl).search : path;
//   },
// }));

// Serve les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parser pour les requêtes JSON
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/auth', passwordRoutes);
app.use('/seances', seanceRoutes);
app.use('/files', uploadRoutes);
app.use('/file', fileRoutes);

// Connexion à la base de données
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
