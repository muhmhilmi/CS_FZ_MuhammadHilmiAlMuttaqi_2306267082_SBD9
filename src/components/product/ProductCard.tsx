import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, hasItem: isInWishlist } = useWishlistStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      quantity: 1,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToWishlist(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
        
        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleAddToWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isInWishlist(product.id) ? 'bg-accent-500 text-white' : 'bg-white text-gray-700 hover:bg-accent-500 hover:text-white'
            } transition-colors shadow-md`}
          >
            <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-primary-700 hover:text-white transition-colors shadow-md"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        
        {/* Tags */}
        {(product.isNew || product.salePrice) && (
          <div className="absolute top-2 left-2 space-y-1">
            {product.isNew && (
              <span className="inline-block bg-accent-500 text-white px-2 py-1 text-xs font-medium rounded">
                New
              </span>
            )}
            {product.salePrice && (
              <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                Sale
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">{product.name}</h3>
        
        <div className="mt-1 flex items-center">
          {product.salePrice ? (
            <>
              <span className="text-sm font-medium text-accent-600">
                {formatPrice(product.salePrice)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;