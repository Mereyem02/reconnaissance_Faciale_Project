const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  name: String,
  type: String, // Type d'alerte (ex: "Alerte de comportement suspect")
  time: Date,
});

module.exports = mongoose.model('BehaviorAlert', alertSchema);
