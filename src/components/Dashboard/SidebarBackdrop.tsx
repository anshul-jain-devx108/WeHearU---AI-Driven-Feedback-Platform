
import React from 'react';

interface SidebarBackdropProps {
  isVisible: boolean;
  onClick: () => void;
}

const SidebarBackdrop: React.FC<SidebarBackdropProps> = ({ isVisible, onClick }) => {
  if (!isVisible) return null;
  
  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
      onClick={onClick}
    />
  );
};

export default SidebarBackdrop;
