import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../product/ProductCard';
import { products } from '../../data/products';
import { ArrowRight } from 'lucide-react';

const NewArrivals: React.FC = () => {
  // Filter new products
  const newProducts = products.filter(product => product.isNew).slice(0, 4);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The latest additions to our collection, fresh off the designer's table
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products/new-arrivals" 
            className="inline-flex items-center px-6 py-3 border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white rounded-md font-medium transition-colors"
          >
            View All New Arrivals <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;