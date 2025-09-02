import React from 'react';

const EmployeeCard = ({ employee }) => {
  if (!employee) {
    return <div>Données employé non disponibles</div>;
  }

  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-3">
        <img src={`/images/${employee.photo}`} alt={employee.name} />

        <div>
          <p className="font-semibold">{employee.name}</p>
          <p className="text-sm text-gray-500">{employee.specialty}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm">{employee.status}</p>
        <p className="text-sm">{employee.time || '—:—'}</p>
        <span className={`px-2 py-1 text-xs rounded-full ${
          employee.risk === 'Faible' ? 'bg-blue-200 text-blue-700' :
          employee.risk === 'Moyen' ? 'bg-orange-200 text-orange-700' :
          'bg-red-200 text-red-700'
        }`}>
          {employee.risk}
        </span>
      </div>
    </div>
  );
};

export default EmployeeCard;
