const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });
const Employee = require('../server/models/Employee.js');
const Admin = require('../server/models/Admins.js');

async function seed() {
  try {
    // Vérifie que la variable d’environnement est bien définie
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI non définie dans le fichier .env');
      process.exit(1);
    }

    console.log('⏳ Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    mongoose.set('bufferCommands', false);
    console.log('✅ MongoDB connecté');

  const rawEmployees = [
      {
        id: 'emp1',
        name: 'Mereyem Elhaouzi',
        email: 'mereyem@example.com',
        password: 'password123',
        specialty: 'Développement logiciel',
        photo: 'ELHAOUZI_MEREYEM.jpg',
      },
      {
        id: 'emp2',
        name: 'Ahmed Ben Ali',
        email: 'ahmed@example.com',
        password: 'password123',
        specialty: 'Gestion de projet',
        photo: 'lionel_messi.jpg',
      },
    ];

    const rawAdmins = [
      {
        nom: 'mereyem',
        photo: 'ELHAOUZI_MEREYEM.jpg',
        identifiant: 'D13',
        motdepasse: '0000',
      },
    ];


    // --- Hash des mots de passe ---
    const employees = await Promise.all(
      rawEmployees.map(async (emp) => ({ ...emp, password: await bcrypt.hash(emp.password, 10) }))
    );
    const admins = await Promise.all(
      rawAdmins.map(async (admin) => ({ ...admin, motdepasse: await bcrypt.hash(admin.motdepasse, 10) }))
    );

    // --- Suppression des anciennes données ---
    console.log('🧹 Suppression des données existantes...');
await mongoose.connection.db.dropCollection('employees');
await mongoose.connection.db.dropCollection('admins');
console.log('🗑 Collections supprimées');


    // --- Insertion des nouvelles données ---
    console.log('📥 Insertion des nouvelles données...');
await mongoose.connection.db.collection('employees').insertMany(employees);
await mongoose.connection.db.collection('admins').insertMany(admins);
console.log(`✅ ${employees.length} employés insérés`);
console.log(`✅ ${admins.length} admins insérés`);


    // --- Fermeture ---
    await mongoose.connection.close();
    console.log('✅ Terminé. Connexion fermée.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur pendant le seed :', err);
    process.exit(1);
  }
}

seed();
