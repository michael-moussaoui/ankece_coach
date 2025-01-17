const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/config');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

module.exports = { generateToken };
