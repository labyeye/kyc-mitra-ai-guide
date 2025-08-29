import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Database, 
  Server, 
  Activity, 
  Users, 
  FileText,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isReindexing, setIsReindexing] = useState(false);

  const systemStats = {
    totalUsers: 24,
    activeUsers: 8,
    totalDocuments: 156,
    indexedDocuments: 142,
    totalQueries: 2847,
    todayQueries: 127,
    avgResponseTime: 1.2,
    systemUptime: 99.8,
  };

  const serviceStatus = [
    { name: 'Watson Discovery', status: 'operational', url: 'us-south.discovery.watson.cloud.ibm.com', latency: 45 },
    { name: 'watsonx.ai Granite', status: 'operational', url: 'us-south.ml.cloud.ibm.com', latency: 67 },
    { name: 'AWS Titan Text', status: 'operational', url: 'bedrock.us-east-1.amazonaws.com', latency: 89 },
    { name: 'File Storage', status: 'warning', url: 'storage.internal', latency: 156 },
  ];

  const recentActivity = [
    { user: 'john.doe', action: 'Document uploaded', details: 'KYC_Policy_2024.pdf', time: '2 min ago' },
    { user: 'admin', action: 'System reindexed', details: '142 documents processed', time: '15 min ago' },
    { user: 'jane.smith', action: 'Query processed', details: 'Customer verification requirements', time: '18 min ago' },
    { user: 'system', action: 'Backup completed', details: 'Daily system backup', time: '1 hour ago' },
  ];

  const handleReindex = async () => {
    setIsReindexing(true);
    // Simulate reindexing process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsReindexing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-accent';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-accent" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span>Admin Panel</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            System management and monitoring dashboard
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleReindex}
            disabled={isReindexing}
          >
            {isReindexing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Database className="mr-2 h-4 w-4" />
            )}
            {isReindexing ? 'Reindexing...' : 'Reindex All'}
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{systemStats.totalUsers}</p>
                <p className="text-xs text-accent">{systemStats.activeUsers} active</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">{systemStats.totalDocuments}</p>
                <p className="text-xs text-accent">{systemStats.indexedDocuments} indexed</p>
              </div>
              <FileText className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Queries Today</p>
                <p className="text-2xl font-bold">{systemStats.todayQueries}</p>
                <p className="text-xs text-muted-foreground">{systemStats.totalQueries} total</p>
              </div>
              <Activity className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">{systemStats.avgResponseTime}s</p>
                <p className="text-xs text-accent">{systemStats.systemUptime}% uptime</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Service Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.url}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{service.latency}ms</p>
                    <p className="text-xs text-muted-foreground">Latency</p>
                  </div>
                  <Badge 
                    variant={
                      service.status === 'operational' ? 'default' :
                      service.status === 'warning' ? 'secondary' :
                      'destructive'
                    }
                    className={service.status === 'operational' ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="discovery-collection">Watson Discovery Collection ID</Label>
              <Input 
                id="discovery-collection"
                value="your-collection-id"
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discovery-env">Discovery Environment ID</Label>
              <Input 
                id="discovery-env"
                value="your-environment-id"
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="watson-project">watsonx.ai Project ID</Label>
              <Input 
                id="watson-project"
                value="your-project-id"
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aws-region">AWS Bedrock Region</Label>
              <Input 
                id="aws-region"
                value="us-east-1"
                readOnly
                className="bg-muted"
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Index Status</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm">Documents indexed: {systemStats.indexedDocuments}/{systemStats.totalDocuments}</span>
                <Progress value={(systemStats.indexedDocuments / systemStats.totalDocuments) * 100} className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      <span className="text-primary">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;