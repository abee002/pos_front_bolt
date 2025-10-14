import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../api/api';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Test login - bypass API for development
    if (formData.email === 'admin@example.com' && formData.password === 'password') {
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      const mockToken = 'test-token-123';

      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      toast.success('Login successful!');
      navigate('/dashboard');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pos-dark via-pos-medium to-pos-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden dark:bg-pos-dark-card">
        <div className="px-8 py-12">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-pos-green rounded-full flex items-center justify-center mb-4">
              <LogIn size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-pos-dark dark:text-white">Welcome Back</h2>
            <p className="text-pos-medium dark:text-gray-300 mt-2">Sign in to your POS account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-pos-dark dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pos-input"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pos-dark dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pos-input pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full pos-btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-pos-medium dark:text-gray-400">
            <p>Demo credentials: admin@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;