import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import FaceRecognition from '../components/FaceRecognition';

const EmployeesPage = () => {
  const [showScanner, setShowScanner] = useState(false);

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Employés</h1>
        <button
          onClick={toggleScanner}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {showScanner ? 'Fermer Scanner' : 'Scanner Visage'}
        </button>
      </div>

      {showScanner && (
        <div className="mb-6">
          <FaceRecognition />
        </div>
      )}

      <EmployeeList />
    </div>
  );
};

export default EmployeesPage;
