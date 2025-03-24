
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  LineChart,
  Settings,
  Users,
  BarChart3,
  BellRing,
  FileQuestion,
  Coffee,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  closeMobileSidebar: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ closeMobileSidebar }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Feedback', href: '/dashboard/feedback', icon: MessageSquare },
    { name: 'AI Insights', href: '/dashboard/insights', icon: LineChart },
    { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Tea Station', href: '/dashboard/tea', icon: Coffee },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Notifications', href: '/dashboard/notifications', icon: BellRing },
    { name: 'Help', href: '/dashboard/help', icon: FileQuestion },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <nav className="flex-1 overflow-y-auto py-4 px-2">
      <ul className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
                          (location.pathname.startsWith(item.href) && item.href !== '/dashboard');
          return (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
                onClick={closeMobileSidebar}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
