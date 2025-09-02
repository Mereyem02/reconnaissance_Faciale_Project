import React from 'react';

const Topbar = () => {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow">
      <h2 className="text-xl font-bold">Système de Suivi des Employés</h2>
      <div className="text-lg font-mono">{now}</div>
    </div>
  );
};

export default Topbar;
