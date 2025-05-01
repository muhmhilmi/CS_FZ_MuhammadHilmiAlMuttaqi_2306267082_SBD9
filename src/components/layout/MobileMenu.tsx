import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, Search } from 'lucide-react';
import { categories } from '../../data/categories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="container mx-auto px-4 h-full flex flex-col">
        <div className="flex items-center justify-between py-4 border-b">
          <Link to="/" className="text-xl font-bold text-primary-700" onClick={onClose}>
            FashionHub
          </Link>
          <button onClick={onClose} className="p-2 text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="my-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow overflow-y-auto py-4">
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className="flex items-center justify-between py-2 border-b border-gray-100"
                onClick={onClose}
              >
                <span className="text-lg">Home</span>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className="flex items-center justify-between py-2 border-b border-gray-100"
                onClick={onClose}
              >
                <span className="text-lg">All Products</span>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </li>
            <li>
              <Link 
                to="/products/sale" 
                className="flex items-center justify-between py-2 border-b border-gray-100 text-accent-600 font-medium"
                onClick={onClose}
              >
                <span className="text-lg">Sale</span>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </li>

            <li className="py-2 border-b border-gray-100">
              <span className="text-lg font-medium text-gray-900">Categories</span>
              <ul className="mt-2 ml-4 space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      to={`/products/${category.slug}`} 
                      className="flex items-center py-1 text-gray-700 hover:text-primary-700"
                      onClick={onClose}
                    >
                      <ChevronRight size={16} className="mr-2 text-gray-400" />
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link 
                to="/account" 
                className="flex items-center justify-between py-2 border-b border-gray-100"
                onClick={onClose}
              >
                <span className="text-lg">My Account</span>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </li>
            <li>
              <Link 
                to="/wishlist" 
                className="flex items-center justify-between py-2 border-b border-gray-100"
                onClick={onClose}
              >
                <span className="text-lg">Wishlist</span>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;