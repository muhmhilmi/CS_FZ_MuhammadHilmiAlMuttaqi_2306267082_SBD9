import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice } from '../../utils/formatters';

const CartSidebar: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeCart}
      />
      
      {/* Cart sidebar */}
      <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-slide-up">
        <div className="px-4 py-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">Your Cart</h2>
          <button onClick={closeCart} className="p-1 text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-sm text-center mb-6">Add some products to your cart and they will appear here</p>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/products');
                }}
                className="px-6 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.productId} className="py-4 flex">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product/${item.productId}`} onClick={closeCart}>
                            {item.name}
                          </Link>
                        </h3>
                        <p className="ml-4">
                          {item.salePrice ? (
                            <>
                              <span className="text-accent-600">{formatPrice(item.salePrice)}</span>
                              <span className="ml-2 line-through text-sm text-gray-500">
                                {formatPrice(item.price)}
                              </span>
                            </>
                          ) : (
                            formatPrice(item.price)
                          )}
                        </p>
                      </div>
                      {item.size && <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>}
                      {item.color && <p className="mt-1 text-sm text-gray-500">Color: {item.color}</p>}
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
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

                      <button
                        type="button"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary-700 text-white py-3 px-4 rounded-md hover:bg-primary-600 transition-colors"
            >
              Checkout
            </button>
            <div className="mt-4 flex justify-center">
              <button
                onClick={closeCart}
                className="text-sm text-primary-700 hover:text-primary-600"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;