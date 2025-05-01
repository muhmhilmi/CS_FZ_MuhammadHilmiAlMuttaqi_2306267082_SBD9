import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ShoppingBag, Heart, MapPin, Settings, CreditCard } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Account: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/account' } } });
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Helmet>
        <title>My Account - Mineworks</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Account Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={user.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                      alt={user.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <button className="w-full flex items-center py-2 px-3 rounded-md bg-primary-50 text-primary-700">
                        <User size={18} className="mr-3" />
                        Profile
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                        <ShoppingBag size={18} className="mr-3" />
                        Orders
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                        <MapPin size={18} className="mr-3" />
                        Addresses
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                        <CreditCard size={18} className="mr-3" />
                        Payment Methods
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                        <Heart size={18} className="mr-3" />
                        Wishlist
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">
                        <Settings size={18} className="mr-3" />
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700"
                      >
                        <LogOut size={18} className="mr-3" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Account Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Personal Information</h2>
                
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={user.name.split(' ')[0]}
                        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={user.name.split(' ').slice(1).join(' ')}
                        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <button className="bg-primary-700 hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Change Password</h2>
                
                <form>
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <button className="bg-primary-700 hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;