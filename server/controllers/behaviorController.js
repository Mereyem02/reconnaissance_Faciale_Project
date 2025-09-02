const BehaviorAlert = require('../models/BehaviorAlert');

exports.logAlert = async (req, res) => {
  const { name, type, time } = req.body;
  const alert = new BehaviorAlert({ name, type, time });
  await alert.save();
  res.status(201).json({ message: 'Alerte enregistrée.' });
};
