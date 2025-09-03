import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  User,
  LogOut,
  Home,
  Settings,
  FileText,
  BarChart3,
  Database,
  Shield
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', section: '' },
    { icon: Database, label: 'Data Mapping', path: '/dashboard?section=data-mapping', section: 'data-mapping' },
    { icon: FileText, label: 'Master Data Mgmt', path: '/dashboard?section=master-data-management', section: 'master-data-management' },
    { icon: BarChart3, label: 'Error Detection', path: '/dashboard?section=error-correction-detection', section: 'error-correction-detection' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
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
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Admin Panel Link (if admin) */}
      {(user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN') && (
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => navigate('/dashboard')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
        </div>
      )}

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
  );
};