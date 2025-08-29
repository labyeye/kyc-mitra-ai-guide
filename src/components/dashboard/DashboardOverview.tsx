import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  Upload, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';

interface DashboardOverviewProps {
  onTabChange: (tab: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onTabChange }) => {
  const stats = [
    {
      title: 'Total Documents',
      value: '24',
      change: '+12%',
      icon: FileText,
      color: 'text-primary',
    },
    {
      title: 'Active Chats',
      value: '8',
      change: '+5%',
      icon: MessageSquare,
      color: 'text-accent',
    },
    {
      title: 'Processed Today',
      value: '156',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-warning',
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '+2.1%',
      icon: CheckCircle,
      color: 'text-accent',
    },
  ];

  const recentActivity = [
    {
      type: 'upload',
      message: 'New document uploaded: KYC_Guidelines_2024.pdf',
      time: '2 minutes ago',
      icon: Upload,
      status: 'success',
    },
    {
      type: 'chat',
      message: 'AI query processed: Customer verification requirements',
      time: '5 minutes ago',
      icon: MessageSquare,
      status: 'success',
    },
    {
      type: 'processing',
      message: 'Document indexing in progress: Compliance_Rules.docx',
      time: '8 minutes ago',
      icon: Clock,
      status: 'pending',
    },
    {
      type: 'alert',
      message: 'Watson Discovery collection approaching limit',
      time: '15 minutes ago',
      icon: AlertCircle,
      status: 'warning',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your KYC Mitra GenAI RAG platform
          </p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => onTabChange('upload')} className="shadow-primary">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onTabChange('chat')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Chat
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <p className={`text-sm mt-1 ${stat.color}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onTabChange('upload')}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload New Document
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onTabChange('chat')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Start AI Chat Session
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onTabChange('documents')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Browse Documents
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                const statusColors = {
                  success: 'text-accent',
                  pending: 'text-warning',
                  warning: 'text-destructive',
                };
                
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg bg-muted ${statusColors[activity.status as keyof typeof statusColors]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Services Status */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>AI Services Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div>
                <p className="font-medium">IBM Watson Discovery</p>
                <p className="text-sm text-muted-foreground">Online • 24 collections</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div>
                <p className="font-medium">IBM watsonx.ai Granite</p>
                <p className="text-sm text-muted-foreground">Online • Ready for summarization</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div>
                <p className="font-medium">AWS Titan Text</p>
                <p className="text-sm text-muted-foreground">Online • Via Bedrock API</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;