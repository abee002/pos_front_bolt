import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  UserCheck,
  ShoppingCart,
  BarChart3,
  Menu,
  X,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/customers', icon: UserCheck, label: 'Customers' },
    { path: '/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-pos-dark shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:z-auto w-64 dark:bg-pos-dark-bg`}
      >
        <div className="flex items-center justify-between p-6 border-b border-pos-medium">
          <h1 className="text-xl font-bold text-white">POS System</h1>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-pos-green hover:text-white transition-colors ${
                  isActive ? 'bg-pos-green text-white border-r-4 border-pos-green' : ''
                }`}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;