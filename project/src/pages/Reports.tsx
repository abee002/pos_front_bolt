import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Package, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [reportType, setReportType] = useState('sales');

  const salesData = [
    { date: '2024-01-15', sales: 1250.50, orders: 12 },
    { date: '2024-01-14', sales: 980.25, orders: 8 },
    { date: '2024-01-13', sales: 1890.75, orders: 15 },
    { date: '2024-01-12', sales: 756.30, orders: 6 },
    { date: '2024-01-11', sales: 1423.60, orders: 11 },
    { date: '2024-01-10', sales: 2145.80, orders: 18 },
    { date: '2024-01-09', sales: 1678.90, orders: 13 },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 45, revenue: 8999.55 },
    { name: 'Coffee Maker', sales: 32, revenue: 2879.68 },
    { name: 'Bluetooth Speaker', sales: 28, revenue: 2239.72 },
    { name: 'Yoga Mat', sales: 56, revenue: 1679.44 },
    { name: 'LED Desk Lamp', sales: 23, revenue: 1149.77 },
  ];

  const topCustomers = [
    { name: 'John Doe', orders: 15, total: 2450.75 },
    { name: 'Jane Smith', orders: 12, total: 1890.50 },
    { name: 'Bob Johnson', orders: 18, total: 3245.25 },
    { name: 'Alice Brown', orders: 9, total: 1234.80 },
    { name: 'Mike Wilson', orders: 11, total: 1678.45 },
  ];

  const getSummaryCards = () => {
    const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
    const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
    const avgOrderValue = totalSales / totalOrders;
    const previousWeekSales = totalSales * 0.85; // Mock previous week data
    const growthRate = ((totalSales - previousWeekSales) / previousWeekSales) * 100;

    return [
      {
        title: 'Total Sales',
        value: `$${totalSales.toFixed(2)}`,
        change: `+${growthRate.toFixed(1)}%`,
        icon: DollarSign,
        color: 'bg-green-500',
      },
      {
        title: 'Total Orders',
        value: totalOrders.toString(),
        change: '+12.5%',
        icon: BarChart3,
        color: 'bg-blue-500',
      },
      {
        title: 'Average Order',
        value: `$${avgOrderValue.toFixed(2)}`,
        change: '+5.2%',
        icon: TrendingUp,
        color: 'bg-purple-500',
      },
      {
        title: 'Active Customers',
        value: '89',
        change: '+8.1%',
        icon: Users,
        color: 'bg-orange-500',
      },
    ];
  };

  const summaryCards = getSummaryCards();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="sales">Sales Report</option>
            <option value="products">Product Report</option>
            <option value="customers">Customer Report</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <p className="text-sm text-green-600 mt-1">{card.change} from last period</p>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 size={20} className="mr-2" />
              Daily Sales Trend
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {salesData.map((day, index) => {
                const maxSales = Math.max(...salesData.map(d => d.sales));
                const barWidth = (day.sales / maxSales) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${day.sales.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {day.orders} orders
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package size={20} className="mr-2" />
              Top Selling Products
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${product.revenue.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users size={20} className="mr-2" />
              Top Customers
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${customer.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Business Insights</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sales Growth</h4>
              <p className="text-sm text-gray-600">
                Your sales have increased by 15.3% compared to the previous period. 
                Keep up the great work!
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer Retention</h4>
              <p className="text-sm text-gray-600">
                85% of your customers are repeat buyers. Consider loyalty programs 
                to increase this further.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package size={24} className="text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Inventory Health</h4>
              <p className="text-sm text-gray-600">
                3 products are running low on stock. Consider restocking to avoid 
                missed sales opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;