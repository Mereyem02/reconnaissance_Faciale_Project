const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true }, 
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String }, // facultatif si tu as un système d'auth
  specialty: { type: String },
  photo: { type: String }, 
  status: { type: String, default: 'Absent' }, // Présent / Absent
  riskLevel: { type: String, default: 'Faible' }, // Faible / Moyen / Élevé
  faceData: { type: Object }, // Pour stocker éventuellement les descripteurs (facultatif si fait côté client)
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Employee', EmployeeSchema);
