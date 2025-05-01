import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import Collections from '../components/home/Collections';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mineworks | Premium Clothing Marketplace</title>
        <meta 
          name="description" 
          content="Discover premium fashion from top brands and independent designers. Shop the latest trends with confidence."
        />
      </Helmet>

      <div className="min-h-screen">
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <NewArrivals />
        <Collections />
        <Testimonials />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;