const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  action: String,
  type: { type: String, enum: ['normal', 'suspect', 'alerte'], default: 'normal' },
  time: { type: Date, default: Date.now },
  location: String,
  device: String,
});

module.exports = mongoose.model('Activity', ActivitySchema);
