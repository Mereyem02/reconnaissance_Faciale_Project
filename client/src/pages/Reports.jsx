import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import Header from "../components/Header";

const COLORS = ["#00C49F", "#FF8042"];

const Reports = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([
    { name: "Présents", value: 0 },
    { name: "Absents", value: 0 },
  ]);

  const getWeekRange = (date) => {
    const start = new Date(date);
    const end = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // dimanche
    end.setDate(start.getDate() + 6); // samedi
    return { start, end };
  };

  // 🧪 API simulée : récupère les statistiques selon la semaine sélectionnée
const fetchReportData = async (startDate, endDate) => {
  try {
    const response = await fetch('http://localhost:5000/api/employees/');
    if (!response.ok) throw new Error('Erreur chargement');
    const employees = await response.json();

    // Calculer les statistiques
    const presents = employees.filter(employee => employee.present).length;
    const absents = employees.length - presents;

    setData([
      { name: "Présents", value: presents },
      { name: "Absents", value: absents },
    ]);
  } catch (error) {
    console.error(error);
  }
};


  // ⏳ Mise à jour des données lorsque la semaine change
  useEffect(() => {
    const { start, end } = getWeekRange(selectedDate);
    fetchReportData(start, end);
  }, [selectedDate]);


  return (
    <div>
      <Header title="Rapports" subtitle="Analyses et statistiques" />
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
            Statistiques hebdomadaires
          </h2>
          
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>key( `${name} ${(percent * 100).toFixed(0)}%`)
              }
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="mt-6 md:mt-0 md:ml-12">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;