const express = require('express');
const { logAlert } = require('../controllers/behaviorController');
const router = express.Router();
const Employee = require('../models/Employee');

// 🔹 GET /api/employees → Tous les employés
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔹 GET /api/employees/:id → Détail d'un employé
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔹 POST /api/employees → Ajouter un employé
router.post('/', async (req, res) => {
  const { name, email, role, specialty, photo } = req.body;
  try {
    const newEmployee = new Employee({ name, email, role, specialty, photo });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création', error: err.message });
  }
});

// 🔹 PUT /api/employees/:id → Modifier un employé
router.put('/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retourne l'objet modifié
    );
    if (!updated) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de mise à jour', error: err.message });
  }
});

// 🔹 DELETE /api/employees/:id → Supprimer un employé
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json({ message: 'Employé supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;

