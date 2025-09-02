import React from 'react';
import { Users, Shield, BarChart3 } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView }) => (
  <aside className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-6 space-y-6">
    <h2 className="text-2xl font-bold">🛡️ Suivi Employés</h2>
    <nav className="flex flex-col gap-2">
      <button
        className={`px-4 py-2 rounded hover:bg-gray-700 ${currentView === 'dashboard' ? 'bg-gray-700' : ''}`}
        onClick={() => setCurrentView('dashboard')}
      >
        <Users className="inline-block mr-2"/> Tableau de bord
      </button>
      <button
        className={`px-4 py-2 rounded hover:bg-gray-700 ${currentView === 'security' ? 'bg-gray-700' : ''}`}
        onClick={() => setCurrentView('security')}
      >
        <Shield className="inline-block mr-2"/> Sécurité
      </button>
      <button
        className={`px-4 py-2 rounded hover:bg-gray-700 ${currentView === 'stats' ? 'bg-gray-700' : ''}`}
        onClick={() => setCurrentView('stats')}
      >
        <BarChart3 className="inline-block mr-2"/> Statistiques
      </button>
    </nav>
  </aside>
);

export default Sidebar;
