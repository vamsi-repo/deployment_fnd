import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { 
  Database, 
  GitBranch, 
  RefreshCw,
  Layers,
  Info,
  Box,
  Settings,
  CheckCircle,
  Cable,
  User,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'destructive';
      case 'ADMIN': return 'default';
      case 'MANAGER': return 'secondary';
      case 'USER': return 'outline';
      case 'VIEWER': return 'secondary';
      default: return 'outline';
    }
  };

  const params = new URLSearchParams(location.search);
  const section = params.get('section');

  // Scroll to the section based on the query parameter
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [section]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg h-full flex flex-col">
        {/* Keansa AI Suite Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold text-xs">⚡</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-900">Keansa AI Suite</h2>
          </div>
        </div>
        
        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <div className="mt-1">
                <Badge variant={getRoleBadgeVariant(user?.role || 'USER')} className="text-xs">
                  {user?.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {/* Section Navigation Only */}
            <li>
              <a
                href="/dashboard?section=data-mapping"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Database className="w-5 h-5" />
                <span className="text-sm font-medium">Data Mapping</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard?section=master-data-management"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Layers className="w-5 h-5" />
                <span className="text-sm font-medium">Master Data Mgmt</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard?section=error-correction-detection"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Error Detection</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Keansa Logo */}
        <img
          src="/images/Keansa_Logo.png"
          alt="Keansa Logo"
          className="absolute top-6 right-8 w-20 h-20 z-20"
          style={{ objectFit: 'contain' }}
        />
        
        <h1 className="text-2xl font-bold mb-6">Data Sync AI</h1>
        
        {/* Data Mapping Section */}
        <h2 id="data-mapping" className="text-xl font-semibold mb-4">Data Mapping</h2>
        <div className="grid grid-cols-1 sm:grid-cols-7 md:grid-cols-7 gap-0 mb-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2">
            <CardHeader className="flex items-center justify-center">
              <img src="/images/data_maping_1.png" alt="Extract" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Extract</CardTitle>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2">
            <CardHeader className="flex items-center justify-center">
              <img src="/images/data_maping_2.png" alt="Transform" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Transform</CardTitle>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2">
            <CardHeader className="flex items-center justify-center">
              <img src="/images/data_maping_3.png" alt="Load" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Load</CardTitle>
            </CardContent>
          </Card>
        </div>

        {/* Master Data Management Section */}
        <h2 id="master-data-management" className="text-xl font-semibold mb-4">Master Data Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-7 md:grid-cols-7 gap-0 mb-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2">
            <CardHeader className="flex items-center justify-center">
              <img src="/images/mdm_1.png" alt="Dimensions" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Dimensions</CardTitle>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2">
            <CardHeader className="flex items-center justify-center">
              <img src="/images/mdm_2.png" alt="Information" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Information</CardTitle>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2">
            <CardHeader className="flex items-center justify-center">
              <img src="/images/mdm_3.png" alt="Cube" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Cube</CardTitle>
            </CardContent>
          </Card>
        </div>

        {/* Error Correction & Detection Section */}
        <h2 id="error-correction-detection" className="text-xl font-semibold mb-4">Error Correction & Detection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-7 md:grid-cols-7 gap-0">
          <Card
            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2"
            onClick={() => handleCardClick('/rule-configurations')}
          >
            <CardHeader className="flex items-center justify-center">
              <img src="/images/Rule Configurations.png" alt="Rule Configurations" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Rule Configurations</CardTitle>
            </CardContent>
          </Card>
          
          <Card
            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2"
            onClick={() => handleCardClick('/data-validations')}
          >
            <CardHeader className="flex items-center justify-center">
              <img src="/images/Data Validations.png" alt="Data Validations" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Data Validation</CardTitle>
            </CardContent>
          </Card>
          
          <Card 
            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-white p-2"
            onClick={() => alert('Connections feature coming soon!')}
          >
            <CardHeader className="flex items-center justify-center">
              <img src="/images/sftp-icon.png" alt="Connections" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
            </CardHeader>
            <CardContent className="text-center p-0">
              <CardTitle className="text-xs font-medium text-gray-700">Connections</CardTitle>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;