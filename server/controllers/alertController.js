const Activity = require('../models/Activity');

exports.getAllAlerts = async (req, res) => {
  const alerts = await Activity.find({ type: 'alerte' }).populate('employeeId');
  res.json(alerts);
};
exports.getAlertCount = async (req, res) => {
  try {
    const count = await Alert.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.reportAlert = async (req, res) => {
  const alert = await Activity.create({ ...req.body, type: 'alerte' });

  const io = req.app.get('io');
  io.emit('new-alert', alert); // WebSocket

  res.status(201).json(alert);
};
