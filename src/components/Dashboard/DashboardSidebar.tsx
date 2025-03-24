
import React from 'react';
import { cn } from '@/lib/utils';
import SidebarHeader from './SidebarHeader';
import SidebarUserInfo from './SidebarUserInfo';
import SidebarNavigation from './SidebarNavigation';
import SidebarFooter from './SidebarFooter';
import SidebarMobileToggle from './SidebarMobileToggle';
import SidebarBackdrop from './SidebarBackdrop';

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile backdrop */}
      <SidebarBackdrop 
        isVisible={isMobileOpen} 
        onClick={closeMobileSidebar} 
      />

      {/* Mobile toggle button */}
      <SidebarMobileToggle 
        isMobileOpen={isMobileOpen} 
        toggleSidebar={toggleMobileSidebar} 
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out transform lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <SidebarHeader />

          {/* User info */}
          <SidebarUserInfo />

          {/* Navigation */}
          <SidebarNavigation closeMobileSidebar={closeMobileSidebar} />

          {/* Footer */}
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
