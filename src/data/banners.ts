import { Banner } from '../types';

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Summer Collection',
    subtitle: 'New Arrivals',
    description: 'Discover our latest summer styles with up to 30% off',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    buttonText: 'Shop Now',
    buttonLink: '/products/summer-collection',
  },
  {
    id: '2',
    title: 'Premium Essentials',
    subtitle: 'Timeless Pieces',
    description: 'Invest in quality pieces that last',
    image: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    buttonText: 'Explore',
    buttonLink: '/products/essentials',
  },
  {
    id: '3',
    title: 'Autumn Favorites',
    subtitle: 'Cozy & Stylish',
    description: 'Perfect pieces for the cooler months ahead',
    image: 'https://images.pexels.com/photos/2866077/pexels-photo-2866077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    buttonText: 'View Collection',
    buttonLink: '/products/autumn',
  }
];