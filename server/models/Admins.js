const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  photo: { type: String, required: true },
  identifiant: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);
// Ce modèle représente les administrateurs du système.