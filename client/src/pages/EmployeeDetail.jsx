import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from 'react'; // ou ton contexte global si tu as un hook custom

const EmployeeDetail = () => {
  const { id } = useParams(); // récupère l'id dans l'URL
  const { getEmployeeById } = useApp(); // ta fonction API ou contexte pour récupérer un employé
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      setLoading(true);
      try {
        const data = await getEmployeeById(id); // ou apiService.getEmployeeById(id)
        setEmployee(data);
      } catch (err) {
        setError('Employé introuvable');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{employee.name}</h1>
      <p><strong>Poste :</strong> {employee.position}</p>
      <p><strong>Département :</strong> {employee.department}</p>
      <p><strong>Status :</strong> {employee.status}</p>
      <p><strong>Arrivée :</strong> {employee.checkIn}</p>
      {/* Affiche plus de détails, alertes, historique, etc. */}
      {employee.alerts && employee.alerts.length > 0 && (
        <>
          <h2 className="mt-6 font-semibold">Alertes :</h2>
          <ul>
            {employee.alerts.map((alert, i) => (
              <li key={i} className="text-red-600">
                {alert.type} - {alert.description} ({alert.severity})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EmployeeDetail;
