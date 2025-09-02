const mongoose = require('mongoose');
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

const attendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Date, required: true },
});


exports.recordAttendance = async (req, res) => {
  try {
    const { name, time } = req.body;
    if (!name || !time) {
      return res.status(400).json({ message: 'Nom et heure sont requis' });
    }

    const existing = await Attendance.findOne({
      name,
      time: { $gte: new Date(time).setHours(0, 0, 0, 0) },
    });
    if (!existing) {
      const newEntry = new Attendance({ name, time });
      await newEntry.save();
    }
    res.status(200).json({ message: 'Présence enregistrée.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
