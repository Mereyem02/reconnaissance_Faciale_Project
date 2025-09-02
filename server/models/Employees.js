const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  console.log('Requête GET /employees');
  try {
    const employees = await Employee.find();
    console.log('Employés récupérés :', employees);
    res.json(employees);
  } catch (error) {
    console.error('Erreur lors de la récupération des employés :', error);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
});

module.exports = router;

