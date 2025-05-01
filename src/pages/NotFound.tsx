import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Mineworks</title>
      </Helmet>
      
      <div className="min-h-screen bg-white py-12 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-9xl font-bold text-primary-700 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-primary-700 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                <Home size={18} className="mr-2" /> Go to Homepage
              </Link>
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 border border-primary-700 text-primary-700 rounded-md hover:bg-primary-50 transition-colors"
              >
                <Search size={18} className="mr-2" /> Browse Products
              </Link>
            </div>
            
            <Link 
              to="javascript:history.back()" 
              className="inline-flex items-center text-gray-600 hover:text-primary-700"
            >
              <ArrowLeft size={16} className="mr-1" /> Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;