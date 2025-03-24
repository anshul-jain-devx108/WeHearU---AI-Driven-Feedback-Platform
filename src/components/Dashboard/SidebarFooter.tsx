
import React from 'react';

const SidebarFooter: React.FC = () => {
  return (
    <div className="p-4 border-t border-gray-100">
      <div className="text-xs text-muted-foreground">
        <p>Need help? <a href="#" className="text-primary hover:underline">Contact support</a></p>
      </div>
    </div>
  );
};

export default SidebarFooter;
