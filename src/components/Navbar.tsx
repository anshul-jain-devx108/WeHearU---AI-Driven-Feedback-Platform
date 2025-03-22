
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Update scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen || location.pathname !== '/' 
          ? 'bg-white bg-opacity-80 backdrop-blur-lg shadow-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">WH</span>
            </div>
            <span className="font-medium text-lg">WeHearU</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-sm font-medium">
              Home
            </Link>
            <Link to="/features" className="nav-link text-sm font-medium">
              Features
            </Link>
            <Link to="/pricing" className="nav-link text-sm font-medium">
              Pricing
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="nav-link text-sm font-medium">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-secondary">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <span className="text-xs font-medium">{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <span className="text-sm font-medium mr-1">{user?.name || 'User'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/settings/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center cursor-pointer text-destructive focus:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm font-medium">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="text-sm font-medium">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-5 space-y-5 border-t">
            <Link
              to="/"
              className="block py-2 text-base font-medium hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block py-2 text-base font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block py-2 text-base font-medium hover:text-primary"
            >
              Pricing
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block py-2 text-base font-medium hover:text-primary"
              >
                Dashboard
              </Link>
            )}
            
            <div className="pt-4 border-t">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                      <span>{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/settings/profile"
                    className="block py-2 text-base font-medium hover:text-primary"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block py-2 text-base font-medium hover:text-primary"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left py-2 text-base font-medium text-destructive hover:text-destructive"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
