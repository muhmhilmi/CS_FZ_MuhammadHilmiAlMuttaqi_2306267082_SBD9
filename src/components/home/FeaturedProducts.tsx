import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../product/ProductCard';
import { products } from '../../data/products';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  // Filter featured products
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulasi loading
  }, []);

  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Efek Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/background.jpg")' }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of premium products, curated for exceptional quality and style.
          </p>
        </motion.div>

        {loading ? (
          <motion.div 
            className="text-center text-gray-500 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Loading products...
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Efek Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 group-hover:opacity-40 transition-all duration-500"></div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <ProductCard product={product} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          {/* Efek Floating di Tombol */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 bg-primary-700 hover:bg-primary-600 text-white rounded-md font-medium transition-colors"
            >
              View All Products <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;