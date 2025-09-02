import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AbsentsPage = () => {
  const [absents, setAbsents] = useState([]);

  useEffect(() => {
    const fetchAbsents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/attendance/absents');
        setAbsents(res.data.absents || []);
      } catch (err) {
        console.error('Erreur chargement absents :', err);
      }
    };
    fetchAbsents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employés Absents Aujourd’hui</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {absents.map((emp, index) => (
          <div key={index} className="bg-white shadow p-4 rounded-lg flex items-center space-x-4">
            <img
              src={`http://localhost:5000/images/${emp.photo}`}
              alt={emp.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <span className="text-lg font-medium">{emp.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbsentsPage;
