import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, CheckCircle, User } from 'lucide-react';

const PendingApproval: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
            <Clock className="text-white" size={32} />
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            <AlertCircle className="text-yellow-600" size={20} />
            Account Pending Approval
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <User className="text-yellow-600 mt-1" size={20} />
              <div className="text-left">
                <p className="text-sm text-gray-700">
                  <strong>Welcome, {user?.first_name}!</strong>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Your account has been successfully created but requires admin approval before you can access the dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-blue-600 mt-1" size={20} />
              <div className="text-left">
                <h4 className="text-sm font-semibold text-gray-800">What happens next?</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• An administrator will review your account</li>
                  <li>• You'll receive access once approved</li>
                  <li>• This process typically takes 24-48 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-4">
              Please contact your system administrator if you have questions about your account status.
            </p>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApproval;