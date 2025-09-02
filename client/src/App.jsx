import React, { useState, useEffect, useContext, createContext } from 'react';
import { User, Shield, Clock, AlertTriangle, Users, BarChart3, Settings, Search, Plus, RefreshCw, HouseIcon } from 'lucide-react';
import Login from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';
import Reports from './pages/Reports';
import FaceRecognition from './components/FaceRecognition'; 
import EmployeeDetail from './pages/EmployeeDetail';
 

// Context for global state management
const AppContext = createContext();
 

// Custom hook for using app context
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
 
// API Service pour MongoDB
const API_BASE_URL = 'http://localhost:5000/api'; // Remplacez par votre URL d'API

const apiService = {
  // Récupérer tous les employés
  async getEmployees() {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des employés');
      const data = await response.json();
      return  data; // Support différents formats de réponse
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Récupérer un employé par ID MongoDB
  async getEmployeeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`);
      if (!response.ok) throw new Error('Employé non trouvé');
      const data = await response.json();
      return  data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Ajouter un nouvel employé
  async createEmployee(employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...employeeData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Erreur lors de la création de l\'employé');
      const data = await response.json();
      return data.employee || data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Mettre à jour un employé
  async updateEmployee(id, employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...employeeData,
          updatedAt: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'employé');
      const data = await response.json();
      return data.employee || data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Supprimer un employé
  async deleteEmployee(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression de l\'employé');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'un employé
  async updateEmployeeStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status,
          checkIn: status.includes('Présent') ? new Date().toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : '--:--',
          updatedAt: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');
      const data = await response.json();
      return data.employee || data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Ajouter une alerte pour un employé
  async addEmployeeAlert(id, alertData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...alertData,
          createdAt: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'alerte');
      const data = await response.json();
      return data.employee || data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Rechercher des employés
  async searchEmployees(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Erreur lors de la recherche');
      const data = await response.json();
      return data.employees || data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Obtenir les statistiques
  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/stats`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }
};
// AppProvider component
const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Charger les employés depuis la base de données
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await apiService.getEmployees();  // <-- bien appeler la méthode via apiService
    setEmployees(data);
  } catch (err) {
    console.error('Erreur lors du chargement des employés:', err);
    setError('Impossible de charger les employés. Utilisation des données de test.');
    setEmployees([]);  // <-- au lieu de setEmployees(data) qui est non défini
  } finally {
    setLoading(false);
  }
};


  // Fonctions pour gérer les employés avec MongoDB
  const addEmployee = async (employeeData) => {
    setLoading(true);
    try {
      const newEmployee = await apiService.createEmployee(employeeData);
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'employé:', err);
      setError('Impossible d\'ajouter l\'employé');
      throw err;
    } finally {
      setLoading(false);
    }
  }; 

  const updateEmployee = async (id, employeeData) => {
    setLoading(true);
    try {
      const updatedEmployee = await apiService.updateEmployee(id, employeeData);
      setEmployees(prev => prev.map(emp => 
        (emp._id || emp.id) === id ? updatedEmployee : emp
      ));
      return updatedEmployee;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'employé:', err);
      setError('Impossible de mettre à jour l\'employé');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    setLoading(true);
    try {
      await apiService.deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => 
        (emp._id || emp.id) !== id
      ));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'employé:', err);
      setError('Impossible de supprimer l\'employé');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployeeStatus = async (id, status) => {
    try {
      const updatedEmployee = await apiService.updateEmployeeStatus(id, status);
      setEmployees(prev => prev.map(emp => 
        (emp._id || emp.id) === id ? updatedEmployee : emp
      ));
      return updatedEmployee;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      setError('Impossible de mettre à jour le statut');
      throw err;
    }
  };

  const addEmployeeAlert = async (id, alertData) => {
    try {
      const updatedEmployee = await apiService.addEmployeeAlert(id, alertData);
      setEmployees(prev => prev.map(emp => 
        (emp._id || emp.id) === id ? updatedEmployee : emp
      ));
      return updatedEmployee;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'alerte:', err);
      setError('Impossible d\'ajouter l\'alerte');
      throw err;
    }
  };

  const refreshEmployees = () => {
    loadEmployees();
  };

  // Computed values
  const totalEmployees = employees.length;
  const totalAlerts = employees.reduce((sum, emp) => sum + (emp.alerts ? emp.alerts.length : 0), 0);
  const absentEmployees = employees.filter(emp => emp.status === 'Absente').length;
  const presentEmployees = employees.filter(emp => emp.status.includes('Présent')).length;

  // Filter employees based on search
 const searchTermLower = searchTerm?.toLowerCase() ?? '';

const filteredEmployees = employees.filter(emp => 
  (emp.name?.toLowerCase().includes(searchTermLower) ?? false) || 
  (emp.position?.toLowerCase().includes(searchTermLower) ?? false) || 
  (emp.department?.toLowerCase().includes(searchTermLower) ?? false)
);



  const value = {
    currentView,
    setCurrentView,
    employees,
    setEmployees,
    currentTime,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    totalEmployees,
    totalAlerts,
    absentEmployees,
    presentEmployees,
    filteredEmployees,
    // Fonctions pour gérer les employés
    addEmployee,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus,
    addEmployeeAlert,
    refreshEmployees,
    loadEmployees
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Sidebar Component
const Sidebar = () => {
  const { currentView, setCurrentView } = useApp();
useEffect(() => {
  const storedAdmin = localStorage.getItem('admin');
  console.log('Stored admin:', storedAdmin);
  if (storedAdmin) {
    try {
      const parsedAdmin = JSON.parse(storedAdmin);
      console.log('Parsed admin:', parsedAdmin);
      setAdmin(parsedAdmin);
    } catch (error) {
      console.error('Error parsing admin:', error);
    }
  } else {
    console.log('No admin found in local storage');
  }
}, []);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'employees', label: 'Employés', icon: Users },
    { id: 'realtime', label: 'Suivi en Temps Réel', icon: Clock },
    { id: 'reports', label: 'Rapports', icon: BarChart3 },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-800 text-white flex flex-col">
      <div className="flex items-center mb-4">
       <div className="flex justify-center mb-4">
  
<div className="fixed left-0 top-0 h-full w-64 bg-slate-800 relative">
  <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center">
    <User size={30} color="white" />
  </div>
</div>
</div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                currentView === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Ajouter Employé
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Chargement...</span>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div className="flex items-center">
      <AlertTriangle className="text-red-500 mr-2" size={20} />
      <span className="text-red-800">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-auto bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Réessayer
        </button>
      )}
    </div>
  </div>
);
const Header = ({ title, subtitle }) => {
  const { currentTime } = useApp();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">
          {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm text-gray-600">
          {currentTime.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => (
 <div className={`${bgColor} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <Icon size={32} className="text-white/80" />
    </div>
  </div>
);

// Employee Card Component
const EmployeeCard = ({ employee }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'Critique': return 'bg-red-100 text-red-800';
      case 'Moyen': return 'bg-orange-100 text-orange-800';
      case 'Faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    if (status.includes('Présent')) return 'bg-green-100 text-green-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl">{employee.avatar}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.position}</p>
          <p className="text-xs text-gray-500">{employee.department}</p>
        </div>
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
            {employee.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Arrivée</p>
          <p className="font-medium">{employee.checkIn}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Niveau de Risque</p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(employee.riskLevel)}`}>
            {employee.riskLevel}
          </span>
        </div>
      </div>

      {employee.alerts && employee.alerts.length > 0 && (
        <div className="border-t pt-4">
          <p className="text-xs text-gray-500 mb-2">Alertes de Sécurité</p>
          {employee.alerts.map((alert, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="font-medium">{alert.type}</span>
              <span className="text-gray-600">- {alert.description}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(alert.severity)}`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

// Search Component
const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useApp();

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Rechercher un employé..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// Dashboard View
const Dashboard = () => {
  const { 
    totalEmployees, 
    totalAlerts, 
    absentEmployees, 
    presentEmployees, 
    filteredEmployees, 
    loading, 
    error, 
    refreshEmployees 
  } = useApp();

  if (loading) return <LoadingSpinner />;

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div>
      <StatsCard
        title="Tableau de board"
        value="Bienvenue dans le tableau de bord"
        bgColor="bg-gris"
        icon={HouseIcon}  // ← icône home ici
      />
      {error && <ErrorMessage message={error} onRetry={refreshEmployees} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Employés"
          value={totalEmployees}
          icon={Users}
          bgColor="bg-blue-500"
        />
        <StatsCard
          title="Alertes Sécurité"
          value={totalAlerts}
          icon={AlertTriangle}
          bgColor="bg-red-500"
        />
        <StatsCard
          title="Présents"
          value={presentEmployees}
          icon={User}
          bgColor="bg-green-500"
        />
        <StatsCard
          title="Absents"
          value={absentEmployees}
          icon={Clock}
          bgColor="bg-purple-500"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Employés</h2>
          <button
            onClick={refreshEmployees}
            disabled={loading}
            className="flex items-center gap-2 text-white hover:text-white disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-ping' : ''} />
            Actualiser
          </button>
        </div>

        <SearchBar />

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun employé trouvé
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredEmployees.map(employee => (
              <EmployeeCard
                key={employee._id || employee.id}
                employee={employee}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

};
// Employees View
const Employees = () => {
  const { filteredEmployees } = useApp();

  return (
    <div>
      <Header title="Employés" subtitle="Gestion des employés" />
      <SearchBar />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

// Real-time View

const RealTime = () => {
  const { employees } = useApp();

  return (
    <div>
      <Header title="Suivi en Temps Réel" subtitle="Surveillance en direct" />

      {/* Intégration du module reconnaissance faciale */}
      <div className="mb-6">
        <FaceRecognition />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {employees.map(employee => (
            <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{employee.avatar}</div>
                <div>
                  <h3 className="font-medium">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  employee.status.includes('Présent') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </div>
                <p className="text-sm text-gray-500 mt-1">{employee.checkIn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




// Settings View
const SettingsPage = () => (
  <div>
    <Header title="Paramètres" subtitle="Configuration du système" />
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <p className="text-center text-gray-500 py-8">Module de paramètres en développement</p>
    </div>
  </div>
);


// Content Router
const AppContent = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'realtime': return <RealTime />;
      case 'reports': return <Reports />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return renderView();
};
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Sidebar />
                <main className="ml-64 p-6">
                  <AppContent />
                </main>
              </div>
            </ProtectedRoute>
          } /> 
          <Route path="/reports" element={<Reports />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
