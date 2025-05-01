import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a newsletter service
    setSubscribed(true);
  };

  return (
    <section className="py-16 bg-primary-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-lg text-primary-200 mb-8">
            Subscribe to our newsletter for exclusive offers, style tips, and first access to new collections.
          </p>

          {subscribed ? (
            <div className="bg-primary-600 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-2">Thank You for Subscribing!</h3>
              <p>
                You've been added to our newsletter list. Get ready for style insights and exclusive offers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 text-gray-900"
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                Subscribe <Send size={16} className="ml-2" />
              </button>
            </form>
          )}
          
          <p className="mt-4 text-sm text-primary-300">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;