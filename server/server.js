const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Config environnement
dotenv.config({ path: '../.env' });

// Routes
const attendanceRouter = require('./routes/attendanceRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const alertRoutes = require('./routes/alertRoutes');
const behaviorRoutes = require('./routes/behaviorRoutes');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/images', express.static(path.join(__dirname, 'public', 'images')))
// Routes API
app.use('/api/alerts', alertRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/admin/', adminRoutes); // Ex: /api/admin/login
app.use('/api/attendance', attendanceRouter);
app.use('/api/behaviors', behaviorRoutes);

// Connexion MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie');
  })
  .catch(err => {
    console.error('❌ Erreur MongoDB:', err);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.send('🚀 API Suivi Employés opérationnelle');
});

// WebSocket
io.on('connection', socket => {
  console.log('🟢 Client connecté via Socket.IO');
  socket.emit('welcome', { message: 'Bienvenue via Socket.IO' });

  socket.on('disconnect', () => {
    console.log('🔴 Client Socket.IO déconnecté');
  });
});

// Fonction de broadcast
const broadcastEmployeeUpdate = () => {
  io.emit('employee_update', { type: 'employee_update' });
};

// Export si utilisé ailleurs
module.exports = { server, broadcastEmployeeUpdate };

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});