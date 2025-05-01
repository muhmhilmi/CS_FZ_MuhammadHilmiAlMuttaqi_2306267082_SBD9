import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

const Wishlist: React.FC = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter products to only those in the wishlist
    const filteredProducts = products.filter(product => 
      items.some(item => item.productId === product.id)
    );
    setWishlistProducts(filteredProducts);
  }, [items]);
  
  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId);
  };
  
  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      quantity: 1,
    });
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist - Mineworks</title>
      </Helmet>
      
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
          
          {wishlistProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg py-12 px-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Heart size={32} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">
                Save your favorite items so you can come back to them later.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 bg-primary-700 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wishlistProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-20 w-20 flex-shrink-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="h-20 w-20 object-cover object-center rounded"
                            />
                          </div>
                          <div className="ml-4">
                            <Link 
                              to={`/product/${product.id}`} 
                              className="text-base font-medium text-gray-900 hover:text-primary-700"
                            >
                              {product.name}
                            </Link>
                            <div className="text-sm text-gray-500 mt-1">
                              Category: {product.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.salePrice ? (
                          <div>
                            <span className="text-accent-600 font-medium">
                              {formatPrice(product.salePrice)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className={`p-2 rounded ${
                              product.stock > 0 
                                ? 'text-primary-700 hover:bg-primary-50' 
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                            title="Add to Cart"
                          >
                            <ShoppingBag size={18} />
                          </button>
                          <button
                            onClick={() => handleRemoveFromWishlist(product.id)}
                            className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded"
                            title="Remove from Wishlist"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;