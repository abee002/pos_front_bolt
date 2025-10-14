import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingCart, User, CreditCard } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  id: number;
  customer: string;
  items: CartItem[];
  total: number;
  status: string;
  created_at: string;
}

const Orders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPOSOpen, setIsPOSOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  // Mock products for POS
  const mockProducts = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, stock: 50 },
    { id: 2, name: 'Coffee Maker', price: 89.99, stock: 25 },
    { id: 3, name: 'Yoga Mat', price: 29.99, stock: 100 },
    { id: 4, name: 'Bluetooth Speaker', price: 79.99, stock: 30 },
    { id: 5, name: 'LED Desk Lamp', price: 49.99, stock: 45 },
  ];

  // Mock customers
  const mockCustomers = [
    'John Doe',
    'Jane Smith', 
    'Bob Johnson',
    'Alice Brown',
    'Mike Wilson'
  ];

  // Mock orders
  const mockOrders: Order[] = [
    {
      id: 1,
      customer: 'John Doe',
      items: [
        { id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1, total: 199.99 }
      ],
      total: 199.99,
      status: 'Completed',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      items: [
        { id: 2, name: 'Coffee Maker', price: 89.99, quantity: 1, total: 89.99 },
        { id: 3, name: 'Yoga Mat', price: 29.99, quantity: 2, total: 59.98 }
      ],
      total: 149.97,
      status: 'Processing',
      created_at: '2024-01-15T09:15:00Z'
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      items: [
        { id: 4, name: 'Bluetooth Speaker', price: 79.99, quantity: 1, total: 79.99 }
      ],
      total: 79.99,
      status: 'Completed',
      created_at: '2024-01-14T16:45:00Z'
    }
  ];

  const columns = [
    {
      key: 'id',
      label: 'Order #',
      render: (value: number) => `#${value.toString().padStart(4, '0')}`,
    },
    {
      key: 'customer',
      label: 'Customer',
    },
    {
      key: 'items',
      label: 'Items',
      render: (items: CartItem[]) => `${items.length} item${items.length !== 1 ? 's' : ''}`,
    },
    {
      key: 'total',
      label: 'Total',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'Completed'
            ? 'bg-green-100 text-green-800'
            : value === 'Processing'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    if (!selectedCustomer) {
      toast.error('Please select a customer');
      return;
    }

    // In real app, this would make API call to create order
    toast.success('Order created successfully!');
    setCart([]);
    setSelectedCustomer('');
    setIsPOSOpen(false);
  };

  const filteredOrders = mockOrders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-pos-dark dark:text-white">Orders</h1>
          <p className="text-pos-medium dark:text-gray-300">Manage orders and process new sales</p>
        </div>
        <button
          onClick={() => setIsPOSOpen(true)}
          className="pos-btn-primary flex items-center space-x-2"
        >
          <ShoppingCart size={20} />
          <span>New Sale</span>
        </button>
      </div>

      <Table
        columns={columns}
        data={filteredOrders}
        loading={false}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />

      {/* POS Modal */}
      <Modal
        isOpen={isPOSOpen}
        onClose={() => setIsPOSOpen(false)}
        title="Point of Sale"
      >
        <div className="max-w-4xl max-h-[80vh] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Products */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-pos-dark dark:text-white">Products</h3>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {mockProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-pos-light dark:bg-pos-dark-card border border-gray-200 dark:border-pos-dark-border rounded-lg hover:bg-pos-green/10 cursor-pointer transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    <div>
                      <p className="font-medium text-pos-dark dark:text-white">{product.name}</p>
                      <p className="text-sm text-pos-medium dark:text-gray-400">Stock: {product.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-pos-dark dark:text-white">${product.price.toFixed(2)}</p>
                      <button className="text-pos-green hover:text-green-600 bg-white dark:bg-pos-dark-bg rounded-full p-1 mt-1">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-pos-dark dark:text-white">Cart</h3>
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-pos-medium" />
                  <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-pos-dark-border rounded px-2 py-1 bg-white dark:bg-pos-dark-card dark:text-white"
                  >
                    <option value="">Select Customer</option>
                    {mockCustomers.map(customer => (
                      <option key={customer} value={customer}>{customer}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 bg-pos-light dark:bg-pos-dark-card rounded-lg">
                    <p className="text-pos-medium dark:text-gray-400">Cart is empty</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-pos-light dark:bg-pos-dark-card rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-pos-dark dark:text-white">{item.name}</p>
                        <p className="text-sm text-pos-medium dark:text-gray-400">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-pos-medium hover:text-pos-green rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-pos-dark dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-pos-medium hover:text-pos-green rounded"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 ml-2 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-pos-dark dark:text-white">${item.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total and Checkout */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold text-pos-dark dark:text-white">
                  <span>Total:</span>
                  <span>${getTotalAmount().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || !selectedCustomer}
                  className="w-full pos-btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Process Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;