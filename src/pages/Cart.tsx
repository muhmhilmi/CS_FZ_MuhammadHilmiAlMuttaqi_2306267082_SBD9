import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '../utils/formatters';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const navigate = useNavigate();
  
  const totalPrice = getTotalPrice();
  const shippingEstimate = totalPrice > 100 ? 0 : 10.99;
  const taxEstimate = totalPrice * 0.08; // 8% tax
  const orderTotal = totalPrice + shippingEstimate + taxEstimate;
  
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Your Cart - Mineworks</title>
        </Helmet>
        
        <div className="min-h-screen bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
            
            <div className="bg-gray-50 rounded-lg py-12 px-6 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 bg-primary-700 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Your Cart - FashionHub</title>
      </Helmet>
      
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <Link 
              to="/products" 
              className="text-sm text-gray-600 hover:text-primary-700 inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" /> Continue Shopping
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.productId} className="p-6">
                      <div className="flex items-center">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                <Link to={`/product/${item.productId}`}>{item.name}</Link>
                              </h3>
                              <div className="mt-1 flex text-sm">
                                {item.color && (
                                  <p className="text-gray-500">{item.color}</p>
                                )}
                                {item.color && item.size && (
                                  <span className="mx-1 text-gray-500">•</span>
                                )}
                                {item.size && (
                                  <p className="text-gray-500">Size: {item.size}</p>
                                )}
                              </div>
                              
                              <div className="mt-1">
                                {item.salePrice ? (
                                  <div className="flex items-center">
                                    <span className="text-accent-600 font-medium">
                                      {formatPrice(item.salePrice)}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                      {formatPrice(item.price)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-gray-900 font-medium">
                                    {formatPrice(item.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          <div className="mt-4 flex items-center">
                            <div className="flex items-center border rounded">
                              <button
                                className="px-3 py-1 border-r"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    updateQuantity(item.productId, item.quantity - 1);
                                  }
                                }}
                              >
                                -
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                className="px-3 py-1 border-l"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            
                            <div className="ml-auto text-right">
                              <p className="text-base font-medium text-gray-900">
                                {formatPrice((item.salePrice || item.price) * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="text-gray-900 font-medium">{formatPrice(totalPrice)}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping estimate</p>
                    <p className="text-gray-900 font-medium">
                      {shippingEstimate === 0 ? 'Free' : formatPrice(shippingEstimate)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax estimate</p>
                    <p className="text-gray-900 font-medium">{formatPrice(taxEstimate)}</p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Order total</p>
                    <p className="text-lg font-medium text-gray-900">{formatPrice(orderTotal)}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-primary-700 hover:bg-primary-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Checkout
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <Link 
                    to="/products" 
                    className="text-sm text-primary-700 hover:text-primary-600"
                  >
                    Continue Shopping
                  </Link>
                </div>
                
                <div className="mt-8 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-1">• Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-1">• Free 30-day returns</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-1">• Secure payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;