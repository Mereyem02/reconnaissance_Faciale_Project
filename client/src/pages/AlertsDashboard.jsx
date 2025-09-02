import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

const AlertsDashboard = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/alerts`)
      .then((res) => {
        setAlerts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur chargement alertes');
        setLoading(false);
        console.error(err);
      });
  }, []);


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📢 Alertes des employés</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nom</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Heure</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {alerts.map((alert, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{alert.name}</td>
                <td className="py-3 px-6">{alert.type}</td>
                <td className="py-3 px-6">
                  {new Date(alert.time).toLocaleString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsDashboard;
