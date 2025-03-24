
import React from 'react';
import { FileQuestion, LifeBuoy, ExternalLink, Coffee } from 'lucide-react';

const SidebarFooter: React.FC = () => {
  return (
    <div className="p-4 border-t border-gray-100">
      <div className="flex flex-col space-y-3 text-xs">
        <div className="flex items-center text-muted-foreground">
          <FileQuestion className="mr-2 h-3.5 w-3.5" />
          <a href="#" className="hover:text-primary hover:underline">Documentation</a>
        </div>
        <div className="flex items-center text-muted-foreground">
          <LifeBuoy className="mr-2 h-3.5 w-3.5" />
          <a href="#" className="hover:text-primary hover:underline">Support</a>
        </div>
        <div className="flex items-center text-muted-foreground">
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          <a href="#" className="hover:text-primary hover:underline">API Reference</a>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Coffee className="mr-2 h-3.5 w-3.5" />
          <a href="#" className="hover:text-primary hover:underline">Tea Brewing Guide</a>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
