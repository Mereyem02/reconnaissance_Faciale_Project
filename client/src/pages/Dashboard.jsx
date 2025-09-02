// client/src/pages/DashboardPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserPlus, AlertTriangle, Calendar,Users,
  Settings,
  LogOut,
 } from 'lucide-react';
 import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [20, 40, 25, 60, 75, 90],
        fill: true,
        borderColor: '#ec4899',
        backgroundColor: 'rgba(252, 209, 233, 0.3)',
        tension: 0.4,
      },
    ],
  };

import EmployeeList from '../components/EmployeeList';

const DashboardPage = () => {
 const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);
  
  const [employeeCount, setEmployeeCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resEmployees = await axios.get('http://localhost:5000/api/employees/count/');
        const resAlerts = await axios.get('http://localhost:5000/api/alerts/count/');
        const resAbsents = await axios.get('http://localhost:5000/api/attendance/absents/');

        setEmployeeCount(resEmployees.data.count);
        setAlertCount(resAlerts.data.count);
        setAbsentCount(resAbsents.data.count);
      } catch (err) {
        console.error('Erreur de chargement des statistiques:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Système de Suivi des Employés</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-pink-500 text-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">Total Employés</h2>
              <p className="text-2xl font-bold">{employeeCount}</p>
            </div>
            <UserPlus size={32} />
          </div>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">Alertes Sécurité</h2>
              <p className="text-2xl font-bold">{alertCount}</p>
            </div>
            <AlertTriangle size={32} />
          </div>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">Absente</h2>
              <p className="text-2xl font-bold">{absentCount}</p>
            </div>
            <Calendar size={32} />
          </div>
        </div>
      </div>

      {/* Liste Employés */}
      <div>
        <h2 className="text-xl font-bold mb-4">Suivi des employés</h2>
        <EmployeeList />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="bg-white rounded-xl shadow p-6 col-span-2">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <Line data={chartData} />
          </div>
</div>
      
    </div>
    
  );
  
};

export default DashboardPage;
