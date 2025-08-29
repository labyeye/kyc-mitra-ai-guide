import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import DashboardOverview from './dashboard/DashboardOverview';
import ChatInterface from './chat/ChatInterface';
import DocumentManager from './documents/DocumentManager';
import DocumentUpload from './upload/DocumentUpload';
import AdminPanel from './admin/AdminPanel';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview onTabChange={setActiveTab} />;
      case 'chat':
        return <ChatInterface />;
      case 'documents':
        return <DocumentManager />;
      case 'upload':
        return <DocumentUpload />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel /> : <DashboardOverview onTabChange={setActiveTab} />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;