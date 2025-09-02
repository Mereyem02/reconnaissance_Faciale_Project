const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};
exports.getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const mongoose = require('mongoose');

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  // Vérifie si l'ID est un ObjectId MongoDB valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.addEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);

  const io = req.app.get('io');
  io.emit('employee-added', employee); // WebSocket
};
