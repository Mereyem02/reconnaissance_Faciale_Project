const express = require('express');
const router = express.Router();
const { getAllAlerts, reportAlert } = require('../controllers/alertController');
const alertController = require('../controllers/alertController');


router.get('/count', async (req, res) => {
  try {
    // Comptez le nombre d'alertes
    const count = await Alert.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/', getAllAlerts);
router.post('/', reportAlert);
router.get('/alerts/count', alertController.getAlertCount);

module.exports = router;
