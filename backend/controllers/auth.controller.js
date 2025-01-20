const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/token.util');
const User = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { firstname, name, email, password, size } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ firstname, name, email, password: hashedPassword, size });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

module.exports = { register, login, logout };
