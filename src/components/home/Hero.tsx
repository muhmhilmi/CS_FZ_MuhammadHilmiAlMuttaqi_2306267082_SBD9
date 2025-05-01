import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] min-h-[600px] bg-gray-900 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/5935738/pexels-photo-5935738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Fashion banner" 
          className="object-cover object-center w-full h-full opacity-60"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Unique Style
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium quality clothing for those who appreciate authentic style and exceptional craftsmanship.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/products" 
              className="bg-primary-700 hover:bg-primary-600 text-white px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center"
            >
              Shop Now <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link 
              to="/products/new-arrivals" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium transition-colors text-center"
            >
              New Arrivals
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;