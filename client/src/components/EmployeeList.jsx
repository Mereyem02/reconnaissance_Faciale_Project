import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRisk, setFilterRisk] = useState('');

  // Charger la liste depuis l'API
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees/');
      setEmployees(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des employés', error);
    }
  };

  useEffect(() => {
    fetchEmployees();

    // WebSocket en temps réel
    const socket = new WebSocket('ws://localhost:5000');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      if (newData.type === 'employee_update') {
        fetchEmployees(); // Recharger la liste
      }
    };

    return () => socket.close();
  }, []);

  // Filtrage
  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus ? emp.status === filterStatus : true) &&
      (filterRisk ? emp.riskLevel === filterRisk : true)
    );
  });

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          className="p-2 border rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 border rounded">
          <option value="">Tous les statuts</option>
          <option value="Présent">Présent</option>
          <option value="Absent">Absent</option>
        </select>
        <select value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)} className="p-2 border rounded">
          <option value="">Tous les risques</option>
          <option value="Faible">Faible</option>
          <option value="Moyen">Moyen</option>
          <option value="Élevé">Élevé</option>
        </select>
      </div>

      {/* Liste */}
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((emp) => <EmployeeCard key={emp._id} employee={{
          ...emp,
          photo: emp.photo,
          status: emp.status,
          risk: emp.riskLevel,
          time: emp.lastSeen || '—:—'
        }} />)
      ) : (
        <p>Aucun employé trouvé.</p>
      )}
    </div>
  );
};

export default EmployeeList;
