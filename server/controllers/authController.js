const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Employee.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const newUser = await Employee.create({ name, email, password: hashed, role });
  res.status(201).json(newUser);
};
