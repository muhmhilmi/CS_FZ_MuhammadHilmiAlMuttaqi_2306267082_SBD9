import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, ShoppingBag, Heart, User, Search, ChevronDown 
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { categories } from '../../data/categories';
import MobileMenu from './MobileMenu';
import CartSidebar from '../cart/CartSidebar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  
  const { isAuthenticated } = useAuthStore();
  const { items, toggleCart } = useCartStore();
  const { getCount: getWishlistCount } = useWishlistStore();
  
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = getWishlistCount();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl md:text-2xl font-bold text-primary-700">
              mineworks
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <div className="relative group">
                <button className="nav-link flex items-center">
                  Categories <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left z-10">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products/${category.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/products" className="nav-link">
                All Products
              </Link>
              <Link to="/products/sale" className="nav-link text-accent-600 font-medium">
                Sale
              </Link>
            </nav>

            {/* Search, Cart, Wishlist, Account */}
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-40 lg:w-60"
                />
                <Search size={18} className="absolute left-3 text-gray-400" />
              </form>

              <button 
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-primary-700 transition-colors"
              >
                <ShoppingBag size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <Link 
                to="/wishlist"
                className="relative p-2 text-gray-700 hover:text-primary-700 transition-colors"
              >
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link 
                to={isAuthenticated ? "/account" : "/login"}
                className="p-2 text-gray-700 hover:text-primary-700 transition-colors"
              >
                <User size={22} />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 lg:hidden text-gray-700"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Header Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;