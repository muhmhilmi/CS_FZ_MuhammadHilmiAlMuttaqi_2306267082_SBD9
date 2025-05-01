import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Sophia Johnson',
    title: 'Fashion Enthusiast',
    content: 'The quality of the clothes is exceptional. I\'ve been shopping here for years and have never been disappointed. The customer service is also top-notch!',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'James Januar',
    title: 'Loyal Customer',
    content: 'I love how curated the collections are. It makes shopping so much easier when you know everything is high quality and stylish. Will definitely keep coming back!',
    rating: 5,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Emma Shihab',
    title: 'Style Blogger',
    content: 'As someone who\'s always looking for unique pieces, I\'m impressed by the range of styles offered. The website is easy to navigate and my orders always arrive on time.',
    rating: 4,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "text-accent-500 fill-accent-500" : "text-gray-300"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;