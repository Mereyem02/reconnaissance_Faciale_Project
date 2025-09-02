import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Stats = () => {
  const data = [
    { name: 'Présents', value: 5 },
    { name: 'Absents', value: 2 },
    { name: 'À risque', value: 1 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Statistiques</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
