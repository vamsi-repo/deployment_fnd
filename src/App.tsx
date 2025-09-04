import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PendingApproval from './pages/PendingApproval';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is approved (admin and super admin are always approved)
  const isApproved = user?.is_approved || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  
  if (!isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  return <>{children}</>;
};

// App Routes component (needs to be inside AuthProvider)
const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Helper function to determine redirect path for authenticated users
  const getAuthenticatedRedirect = () => {
    if (!isAuthenticated) return '/login';
    
    const isApproved = user?.is_approved || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
    return isApproved ? '/dashboard' : '/pending-approval';
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={getAuthenticatedRedirect()} replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to={getAuthenticatedRedirect()} replace /> : <Register />} 
      />
      <Route
        path="/pending-approval"
        element={
          isAuthenticated ? <PendingApproval /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={getAuthenticatedRedirect()} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;