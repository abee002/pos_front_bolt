import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

interface StatsCard {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsCard[]>([
    {
      title: 'Total Sales',
      value: '$12,345',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Customers',
      value: '567',
      change: '+3.1%',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Products',
      value: '89',
      change: '+1.4%',
      icon: Package,
      color: 'bg-orange-500',
    },
  ]);

  const recentOrders = [
    { id: '001', customer: 'John Doe', amount: '$125.50', status: 'Completed' },
    { id: '002', customer: 'Jane Smith', amount: '$89.25', status: 'Pending' },
    { id: '003', customer: 'Bob Johnson', amount: '$256.75', status: 'Completed' },
    { id: '004', customer: 'Alice Brown', amount: '$178.90', status: 'Processing' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-pos-dark dark:text-white">Dashboard</h1>
        <p className="text-pos-medium dark:text-gray-300">Overview of your business performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="pos-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pos-medium dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-pos-dark dark:text-white mt-1">{stat.value}</p>
                  <p className="text-sm text-pos-green mt-1">{stat.change} from last month</p>
                </div>
                <div className="p-3 rounded-full bg-pos-green">
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="pos-card">
          <div className="p-6 border-b border-gray-200 dark:border-pos-dark-border">
            <h3 className="text-lg font-semibold text-pos-dark dark:text-white">Recent Orders</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-pos-dark dark:text-white">Order #{order.id}</p>
                    <p className="text-sm text-pos-medium dark:text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-pos-dark dark:text-white">{order.amount}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-pos-light text-pos-green dark:bg-pos-green/20'
                          : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-pos-light text-pos-medium'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pos-card">
          <div className="p-6 border-b border-gray-200 dark:border-pos-dark-border">
            <h3 className="text-lg font-semibold text-pos-dark dark:text-white">Today's Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-pos-medium dark:text-gray-400">Sales Today</span>
                <span className="font-semibold text-pos-dark dark:text-white">$1,234.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-pos-medium dark:text-gray-400">Orders Today</span>
                <span className="font-semibold text-pos-dark dark:text-white">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-pos-medium dark:text-gray-400">New Customers</span>
                <span className="font-semibold text-pos-dark dark:text-white">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-pos-medium dark:text-gray-400">Avg. Order Value</span>
                <span className="font-semibold text-pos-dark dark:text-white">$53.67</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;