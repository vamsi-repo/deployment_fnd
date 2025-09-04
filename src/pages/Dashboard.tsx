import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Show appropriate dashboard based on user role
  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';
  
  if (isAdmin) {
    return <AdminDashboard />;
  }
  
  return <UserDashboard />;
};

export default Dashboard;