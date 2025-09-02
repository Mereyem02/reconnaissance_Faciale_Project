import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const Security = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/api/alerts'); // URL de ton API
        if (!response.ok) throw new Error('Erreur lors du chargement des alertes');
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <p>Chargement des alertes...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sécurité & Alertes</h1>
      <div className="space-y-4">
        {alerts.length === 0 && <p>Aucune alerte pour le moment.</p>}
        {alerts.map(a => (
          <div key={a.id || a._id} className="bg-red-50 border-l-4 border-red-400 p-4 rounded shadow">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-500" />
                <span>
                  <strong>{a.emp || a.employeeName}</strong> : {a.type}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  a.severity === 'Critique' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                }`}
              >
                {a.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Security;
