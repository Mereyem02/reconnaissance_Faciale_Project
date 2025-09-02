const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admins'); // 🔥 Correction : import du modèle Admin

// Route de connexion de l'admin
router.post('/login', async (req, res) => {
  const { identifiant, motdepasse } = req.body;

  try {
    // Recherche de l'admin par identifiant
    const admin = await Admin.findOne({ identifiant });

    if (!admin) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(motdepasse, admin.motdepasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Génération du token JWT (optionnelle)
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });

    res.json({
      message: 'Connexion réussie',
      token,
      admin: {
        id: admin._id,
        nom: admin.nom,
        identifiant: admin.identifiant,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion admin:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.get('/login', (req, res) => {
  res.json({ message: 'Page de connexion administrateur' });
});





module.exports = router;