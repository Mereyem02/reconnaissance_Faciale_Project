import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ScanFace } from 'lucide-react';
import { motion } from 'framer-motion';


// adapte le chemin si besoin

const Login = () => {

  const [nom, setNom] = useState('');
  const [identifiant, setIdentifiant] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreur('');
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login/', {
        nom,
        identifiant,
        motdepasse,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setErreur('Identifiants incorrects');
    }
  };
 
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {/* Fond animé */}
      <img
        src="/camera-tracking.gif"
        alt="Fond d'écran"
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-50 z-0"
      />

      {/* Animation décorative flottante */}
      <motion.img
        src="/camera-tracking.gif"
        alt="Animation décorative"
        className="absolute w-20 h-20 z-20 top-10 left-10"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 200, 0, -200, 0],
          y: [0, 100, 200, 100, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Conteneur du formulaire */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 space-y-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-10 border border-gray-200"
        >
          {/* Avatar utilisateur */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-100 p-4 rounded-full shadow-md"
            >
              <User className="w-10 h-10  text-gray-900" />
            </motion.div>
          </div>

          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Connexion Admin
          </h2>

          {/* Message d'erreur */}
          {erreur && (
            <div className="bg-red-100 text-red-700 text-sm px-4 py-3 rounded mb-6 shadow-sm border border-red-300">
              {erreur}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div className="relative">
              <input
                type="text"
                placeholder="Nom complet"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                required
                aria-label="Nom complet"
              />
              <User className="absolute left-4 top-3.5 text-gray-400" size={24} />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Identifiant"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                required
                aria-label="Identifiant"
              />
              <User className="absolute left-4 top-3.5 text-gray-400" size={24} />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Mot de passe"
                value={motdepasse}
                onChange={(e) => setMotdepasse(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                required
                aria-label="Mot de passe"
              />
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={24} />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-md hover:bg-blue-800 transition"
              aria-label="Se connecter"
            >
              Se connecter
            </button>
          </form>
      
        </motion.div>

       
      </div>
    </div>
  );
};

export default Login;
