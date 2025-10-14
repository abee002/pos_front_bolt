import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between dark:bg-pos-dark-bg dark:border-pos-dark-border">
      <button
        onClick={toggleSidebar}
        className="md:hidden text-pos-dark hover:text-pos-green dark:text-gray-300 dark:hover:text-pos-green"
      >
        <Menu size={24} />
      </button>

      <div className="hidden md:block">
        <h2 className="text-lg font-semibold text-pos-dark dark:text-white">Welcome back!</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-pos-green rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {user.name || 'User'}
          </span>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 px-3 py-2 text-sm text-pos-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:bg-red-900/20"
        >
          <LogOut size={16} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;