import React from 'react';

const colorClasses = {
  blue: ['bg-blue-100', 'text-blue-600'],
  red: ['bg-red-100', 'text-red-600'],
  green: ['bg-green-100', 'text-green-600'],
  // ajouter d'autres couleurs si besoin
};

const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const [bgClass, textClass] = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`${bgClass} p-4 rounded-lg flex items-center justify-between flex-1`}>
      <div>
        <p className="text-sm text-gray-700">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`${textClass} text-3xl`}>
        {icon}
      </div>
    </div>
  );
};
export default StatCard;
