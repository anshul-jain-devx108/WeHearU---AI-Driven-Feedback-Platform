
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarMobileToggleProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarMobileToggle: React.FC<SidebarMobileToggleProps> = ({ 
  isMobileOpen, 
  toggleSidebar 
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 lg:hidden">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="bg-white shadow-md"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default SidebarMobileToggle;
