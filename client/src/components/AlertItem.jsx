import React from 'react';

const AlertItem = ({ type, description, severity }) => {
  return (
    <div className="flex justify-between py-1 border-b">
      <div>
        <p className="font-semibold">{type}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <span className={`text-sm font-bold ${
        severity === 'Critique' ? 'text-red-600' :
        severity === 'Moyen' ? 'text-orange-500' :
        'text-blue-500'
      }`}>
        {severity}
      </span>
    </div>
  );
};

export default AlertItem;
