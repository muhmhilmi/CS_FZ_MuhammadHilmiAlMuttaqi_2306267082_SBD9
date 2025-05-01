import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft, Heart, Star, Check, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { formatPrice } from '../utils/formatters';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'Navy', value: '#0a192f' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'White', value: '#ffffff' },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, hasItem: isInWishlist } = useWishlistStore();
  
  // Find the product by ID
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      if (id) {
        const foundProduct = products.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(0);
        } else {
          setError('Product not found');
        }
      } else {
        setError('Invalid product ID');
      }
      
      setLoading(false);
    }, 300); // Simulate API load time
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-primary-700 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            <ChevronLeft size={16} className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    
    setError('');
    
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: colors.find(c => c.value === selectedColor)?.name,
    });
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product.id);
  };
  
  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Mineworks`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              to="/products" 
              className="text-sm text-gray-600 hover:text-primary-700 inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-4 aspect-h-5 relative">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center rounded-lg"
                />
                
                {/* Image navigation arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 text-gray-800 hover:text-primary-700 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 text-gray-800 hover:text-primary-700 transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded ${
                      selectedImage === idx 
                        ? 'ring-2 ring-primary-700 ring-offset-2' 
                        : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${idx + 1}`}
                      className="w-full h-full object-cover object-center rounded"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={18} 
                      className={
                        idx < Math.floor(product.rating) 
                          ? 'text-accent-500 fill-accent-500' 
                          : idx < product.rating 
                            ? 'text-accent-500 fill-accent-500 opacity-50' 
                            : 'text-gray-300'
                      } 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.salePrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-accent-600 mr-3">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                      Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        setSelectedColor(color.value);
                        setError('');
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        color.value === selectedColor 
                          ? 'ring-2 ring-primary-700 ring-offset-2' 
                          : 'ring-1 ring-gray-200'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {color.value === selectedColor && color.value === '#ffffff' && (
                        <Check size={16} className="text-black" />
                      )}
                      {color.value === selectedColor && color.value !== '#ffffff' && (
                        <Check size={16} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button className="text-sm text-primary-700 hover:text-primary-600">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setError('');
                      }}
                      className={`py-2 font-medium text-sm rounded-md ${
                        size === selectedSize
                          ? 'bg-primary-700 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center border rounded w-32">
                  <button
                    className="px-3 py-1 border-r"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 flex-grow text-center">{quantity}</span>
                  <button
                    className="px-3 py-1 border-l"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="mb-4 flex items-start text-red-500 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0 mr-1 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-700 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className={`sm:flex-none px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center ${
                    isInWishlist(product.id)
                      ? 'bg-accent-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={`mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} 
                  />
                  {isInWishlist(product.id) ? 'Saved' : 'Add to Wishlist'}
                </button>
              </div>
              
              {/* Features */}
              {product.features && (
                <div className="mb-8">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Product details */}
              {product.details && (
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-3">Product Details</h3>
                  <div className="border-t border-gray-200">
                    {Object.entries(product.details).map(([key, value], idx) => (
                      <div 
                        key={key} 
                        className={`py-3 flex ${
                          idx < Object.entries(product.details!).length - 1 ? 'border-b border-gray-200' : ''
                        }`}
                      >
                        <span className="font-medium text-gray-900 w-1/3">{key}</span>
                        <span className="text-gray-700 w-2/3">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;