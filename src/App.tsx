import React, { useState, useEffect } from 'react';
import { User } from './types/complaint';
import { getCurrentUser, clearCurrentUser, initializeDefaultUsers } from './utils/storage';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeDefaultUsers();
    const user = getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return currentUser.role === 'admin' ? (
    <AdminDashboard user={currentUser} onLogout={handleLogout} />
  ) : (
    <StudentDashboard user={currentUser} onLogout={handleLogout} />
  );
}

export default App;