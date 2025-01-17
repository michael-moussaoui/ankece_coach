module.exports = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ankece_coach_app',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret_key',
    expiresIn: '1h', // Expiration du token
  },
  port: process.env.PORT || 3000,
};
