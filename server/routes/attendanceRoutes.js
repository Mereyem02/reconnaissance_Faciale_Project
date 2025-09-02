const express = require('express');
const router = express.Router();
const moment = require('moment');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const { getAllAttendances } = require('../controllers/attendanceController');

router.get('/', getAllAttendances);

router.get('/absents', async (req, res) => {
  try {
    const todayStart = moment().startOf('day').toDate();
    const presentToday = await Attendance.find({
      time: { $gte: todayStart },
    }).distinct('name');
    const allEmployees = await Employee.find().select('name photo');
    const absents = allEmployees.filter((emp) => !presentToday.includes(emp.name));
    res.json({ count: absents.length, absents });
  } catch (error) {
    console.error('Erreur /absents:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

module.exports = router;
