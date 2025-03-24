
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const SidebarUserInfo: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="font-medium">{user?.name?.charAt(0) || 'U'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email || 'email@example.com'}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
