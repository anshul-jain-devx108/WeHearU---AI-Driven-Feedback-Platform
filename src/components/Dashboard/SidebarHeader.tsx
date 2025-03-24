
import React from 'react';

const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-16 border-b border-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">WH</span>
        </div>
        <span className="font-medium text-lg">WeHearU</span>
      </div>
    </div>
  );
};

export default SidebarHeader;
