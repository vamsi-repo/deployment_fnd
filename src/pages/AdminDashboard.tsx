import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SimpleSelect
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import * as apiService from '../services/api';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  role: string;
  is_active: number;
  is_approved: number;
  created_at: string;
  last_login?: string;
  approved_at?: string;
}

interface Role {
  name: string;
  hierarchy: number;
  permissions: string[];
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<Record<number, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersResponse, pendingResponse, rolesResponse] = await Promise.all([
        apiService.getAllUsers(),
        apiService.getPendingUsers(),
        apiService.getRoles()
      ]);

      setUsers(usersResponse.data.users || []);
      setPendingUsers(pendingResponse.data.users || []);
      setRoles(rolesResponse.data.roles || []);

      // Initialize selected roles with current user roles
      const roleMap: Record<number, string> = {};
      usersResponse.data.users?.forEach((u: User) => {
        roleMap[u.id] = u.role;
      });
      setSelectedRoles(roleMap);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleApproveUser = async (userId: number) => {
    try {
      await apiService.approveUser(userId);
      toast({
        title: 'Success',
        description: 'User approved successfully',
      });
      loadData(); // Refresh the data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to approve user',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateRole = async (userId: number, newRole: string) => {
    try {
      await apiService.updateUserRole(userId, newRole);
      toast({
        title: 'Success',
        description: 'User role updated successfully',
      });
      loadData(); // Refresh the data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update role',
        variant: 'destructive',
      });
    }
  };

  const handleToggleUserStatus = async (userId: number, currentStatus: number) => {
    try {
      if (currentStatus === 1) {
        await apiService.deactivateUser(userId);
        toast({
          title: 'Success',
          description: 'User deactivated successfully',
        });
      } else {
        await apiService.activateUser(userId);
        toast({
          title: 'Success',
          description: 'User activated successfully',
        });
      }
      loadData(); // Refresh the data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update user status',
        variant: 'destructive',
      });
    }
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

  const getStatusBadge = (isActive: number, isApproved: number) => {
    if (!isApproved) {
      return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
    if (isActive) {
      return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Navigation Bar with Keansa Logo */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/Keansa_Logo.png"
                  alt="Keansa Logo"
                  className="w-10 h-10"
                  style={{ objectFit: 'contain' }}
                />
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    Keansa Admin Dashboard
                  </h1>
                  <p className="text-blue-100 text-xs">Data Sync AI Suite</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <Shield className="h-5 w-5" />
                <span className="text-sm">{user?.first_name} ({user?.role})</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-blue-600 border-white hover:bg-white hover:text-blue-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{pendingUsers.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.is_active && u.is_approved).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Users Section */}
          {pendingUsers.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-500" />
                  Users Pending Approval ({pendingUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingUsers.map((pendingUser) => (
                    <div key={pendingUser.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                      <div className="flex-1">
                        <h4 className="font-medium">{pendingUser.first_name} {pendingUser.last_name}</h4>
                        <p className="text-sm text-gray-600">{pendingUser.email}</p>
                        <p className="text-sm text-gray-500">
                          Requested: {new Date(pendingUser.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={getRoleBadgeVariant(pendingUser.role)}>
                          {pendingUser.role}
                        </Badge>
                        <Button
                          onClick={() => handleApproveUser(pendingUser.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Users Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                All Users Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Current Role</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Assign Role</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userData) => (
                      <tr key={userData.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{userData.first_name} {userData.last_name}</div>
                            <div className="text-sm text-gray-500">ID: {userData.id}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{userData.email}</div>
                          <div className="text-xs text-gray-500">{userData.mobile}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant={getRoleBadgeVariant(userData.role)}>
                            {userData.role}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(userData.is_active, userData.is_approved)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <SimpleSelect
                              value={selectedRoles[userData.id] || userData.role}
                              onChange={(e) => setSelectedRoles(prev => ({...prev, [userData.id]: e.target.value}))}
                              className="w-[130px]"
                            >
                              {roles.map((role) => (
                                <option key={role.name} value={role.name}>
                                  {role.name}
                                </option>
                              ))}
                            </SimpleSelect>
                            {selectedRoles[userData.id] && selectedRoles[userData.id] !== userData.role && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdateRole(userData.id, selectedRoles[userData.id])}
                              >
                                Update
                              </Button>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            {userData.is_approved === 0 && (
                              <Button
                                size="sm"
                                onClick={() => handleApproveUser(userData.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                            {userData.id !== user?.id && (
                              <Button
                                size="sm"
                                variant={userData.is_active ? "destructive" : "default"}
                                onClick={() => handleToggleUserStatus(userData.id, userData.is_active)}
                              >
                                {userData.is_active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;