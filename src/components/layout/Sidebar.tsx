import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  MessageSquare,
  FileText,
  Upload,
  Settings,
  LogOut,
  Home,
  Shield,
  Brain,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'upload', label: 'Upload', icon: Upload },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin Panel', icon: Shield }] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-sidebar-primary">
            <Brain className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">KYC Mitra</h1>
            <p className="text-sm text-sidebar-foreground/70">GenAI RAG Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start space-x-3 h-12',
                activeTab === item.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary-foreground">
              {user?.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.username}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;