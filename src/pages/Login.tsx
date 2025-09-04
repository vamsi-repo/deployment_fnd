import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        // The AuthProvider will handle redirects based on approval status
        // Just show success message and let routing handle the rest
        toast({
          title: 'Success',
          description: 'Logged in successfully.',
        });
        // Don't navigate directly - let the app handle routing based on approval status
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      let errorMessage = 'Failed to log in. Please try again.';
      let variant: 'default' | 'destructive' = 'destructive';
      
      // Handle account suspension specifically
      if (error.name === 'AccountSuspended') {
        errorMessage = error.message;
        variant = 'destructive';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: error.name === 'AccountSuspended' ? 'Account Suspended' : 'Error',
        description: errorMessage,
        variant: variant,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <img
            src="/images/Keansa_Logo.png"
            alt="Keansa Logo"
            className="mx-auto mb-4 w-20 h-20"
            style={{ objectFit: 'contain' }}
          />
          <CardTitle>Login</CardTitle>
          <p className="text-sm text-gray-600 mt-2">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@keansa.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="admin123"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Test Credentials: admin@keansa.com / admin123
            </p>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;