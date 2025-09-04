import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Cable, 
  Plus, 
  Database, 
  Server, 
  Cloud,
  Check,
  X,
  Settings
} from 'lucide-react';

interface ConnectionsDialogProps {
  children: React.ReactNode;
}

interface Connection {
  id: string;
  name: string;
  type: 'database' | 'sftp' | 'api' | 'cloud';
  status: 'connected' | 'disconnected' | 'testing';
  host?: string;
  port?: number;
  database?: string;
}

export const ConnectionsDialog: React.FC<ConnectionsDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      name: 'Production Database',
      type: 'database',
      status: 'connected',
      host: 'prod-db.example.com',
      port: 5432,
      database: 'keansa_prod'
    },
    {
      id: '2',
      name: 'SFTP Server',
      type: 'sftp',
      status: 'connected',
      host: 'files.example.com',
      port: 22
    },
    {
      id: '3',
      name: 'Test Environment',
      type: 'database',
      status: 'disconnected',
      host: 'test-db.example.com',
      port: 5432,
      database: 'keansa_test'
    }
  ]);

  const [newConnection, setNewConnection] = useState({
    name: '',
    type: 'database',
    host: '',
    port: '',
    username: '',
    password: '',
    database: ''
  });

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'database': return <Database className="w-4 h-4" />;
      case 'sftp': return <Server className="w-4 h-4" />;
      case 'api': return <Cable className="w-4 h-4" />;
      case 'cloud': return <Cloud className="w-4 h-4" />;
      default: return <Cable className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'disconnected':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Disconnected</Badge>;
      case 'testing':
        return <Badge variant="secondary">Testing...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleTestConnection = (connectionId: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: 'testing' as const }
          : conn
      )
    );

    // Simulate connection test
    setTimeout(() => {
      setConnections(prev => 
        prev.map(conn => 
          conn.id === connectionId 
            ? { ...conn, status: Math.random() > 0.3 ? 'connected' as const : 'disconnected' as const }
            : conn
        )
      );
    }, 2000);
  };

  const handleAddConnection = () => {
    const connection: Connection = {
      id: Date.now().toString(),
      name: newConnection.name,
      type: newConnection.type as Connection['type'],
      status: 'disconnected',
      host: newConnection.host,
      port: newConnection.port ? parseInt(newConnection.port) : undefined,
      database: newConnection.database
    };

    setConnections(prev => [...prev, connection]);
    setNewConnection({
      name: '',
      type: 'database',
      host: '',
      port: '',
      username: '',
      password: '',
      database: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Cable className="w-5 h-5 mr-2" />
            Connection Management
          </DialogTitle>
          <DialogDescription>
            Manage your database connections, SFTP servers, and other data sources.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Existing Connections */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Existing Connections</h3>
            <div className="grid gap-4">
              {connections.map((connection) => (
                <Card key={connection.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getConnectionIcon(connection.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{connection.name}</h4>
                          <p className="text-sm text-gray-500">
                            {connection.host}:{connection.port}
                            {connection.database && ` / ${connection.database}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(connection.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(connection.id)}
                          disabled={connection.status === 'testing'}
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add New Connection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Add New Connection</h3>
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="connectionName">Connection Name</Label>
                    <Input
                      id="connectionName"
                      value={newConnection.name}
                      onChange={(e) => setNewConnection(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="My Database Connection"
                    />
                  </div>
                  <div>
                    <Label htmlFor="connectionType">Connection Type</Label>
                    <Select
                      value={newConnection.type}
                      onValueChange={(value) => setNewConnection(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="sftp">SFTP Server</SelectItem>
                        <SelectItem value="api">API Endpoint</SelectItem>
                        <SelectItem value="cloud">Cloud Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="host">Host</Label>
                    <Input
                      id="host"
                      value={newConnection.host}
                      onChange={(e) => setNewConnection(prev => ({ ...prev, host: e.target.value }))}
                      placeholder="localhost"
                    />
                  </div>
                  <div>
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      type="number"
                      value={newConnection.port}
                      onChange={(e) => setNewConnection(prev => ({ ...prev, port: e.target.value }))}
                      placeholder="5432"
                    />
                  </div>
                  <div>
                    <Label htmlFor="database">Database</Label>
                    <Input
                      id="database"
                      value={newConnection.database}
                      onChange={(e) => setNewConnection(prev => ({ ...prev, database: e.target.value }))}
                      placeholder="database_name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={newConnection.username}
                      onChange={(e) => setNewConnection(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newConnection.password}
                      onChange={(e) => setNewConnection(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleAddConnection}
                    disabled={!newConnection.name || !newConnection.host}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};