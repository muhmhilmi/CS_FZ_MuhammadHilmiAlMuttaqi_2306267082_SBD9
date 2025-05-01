import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collections } from '../../data/collections';
import { ArrowRight } from 'lucide-react';

const Collections: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Curated Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our thoughtfully curated collections designed for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={collection.link} className="block h-full">
                <div className="relative h-[300px] overflow-hidden rounded-lg">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                    <p className="text-gray-200 mb-4">{collection.description}</p>
                    <span className="inline-flex items-center text-sm font-medium">
                      Explore Collection <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;