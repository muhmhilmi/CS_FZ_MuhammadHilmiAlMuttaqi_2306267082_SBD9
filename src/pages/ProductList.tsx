import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Filter, ArrowUpDown, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { Product, Category, SortOption } from '../types';

const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const ProductList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  
  // Price range filter
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  
  // Active filters
  const [activeFilters, setActiveFilters] = useState<{
    category: string | null;
    price: [number, number];
  }>({
    category: category || null,
    price: [0, 300],
  });

  // Update current category when route param changes
  useEffect(() => {
    if (category) {
      const matchedCategory = categories.find(c => c.slug === category);
      setCurrentCategory(matchedCategory || null);
      setActiveFilters(prev => ({ ...prev, category: category }));
    } else {
      setCurrentCategory(null);
      setActiveFilters(prev => ({ ...prev, category: null }));
    }
  }, [category]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (activeFilters.category) {
      result = result.filter(product => product.category === activeFilters.category);
    }
    
    // Filter by price range
    result = result.filter(
      product => {
        const productPrice = product.salePrice || product.price;
        return productPrice >= activeFilters.price[0] && productPrice <= activeFilters.price[1];
      }
    );
    
    // Sort products
    switch (selectedSort) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
    }
    
    setFilteredProducts(result);
  }, [activeFilters, selectedSort]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    setActiveFilters(prev => ({ ...prev, price: priceRange }));
  };

  const resetFilters = () => {
    setPriceRange([0, 300]);
    setActiveFilters({
      category: category || null,
      price: [0, 300],
    });
    setSelectedSort('newest');
  };

  return (
    <>
      <Helmet>
        <title>
          {currentCategory ? `${currentCategory.name} - Mineworks` : 'All Products - Mineworks'}
        </title>
        <meta 
          name="description" 
          content={
            currentCategory 
              ? `Shop our selection of ${currentCategory.name.toLowerCase()}. ${currentCategory.description}`
              : 'Browse our complete collection of premium clothing and accessories.'
          }
        />
      </Helmet>

      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Category Header */}
          {currentCategory && (
            <div className="mb-8">
              <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                <img
                  src={currentCategory.featuredImage}
                  alt={currentCategory.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentCategory.name}</h1>
                  <p className="text-gray-200 max-w-2xl">{currentCategory.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Page Title (for all products page) */}
          {!currentCategory && (
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our complete collection of premium clothing and accessories
              </p>
            </div>
          )}

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center text-gray-700 font-medium"
            >
              <Filter size={20} className="mr-2" /> Filters
            </button>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <div>
                  <label htmlFor="price-min" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="price-min"
                    min={0}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="price-max" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    id="price-max"
                    min={priceRange[0]}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <button
                  onClick={applyPriceFilter}
                  className="mt-5 bg-primary-700 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="mt-5 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown size={20} className="text-gray-500" />
              <select
                value={selectedSort}
                onChange={handleSortChange}
                className="border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(activeFilters.price[0] > 0 || activeFilters.price[1] < 300) && (
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="text-sm font-medium text-gray-700">Active Filters:</div>
              {(activeFilters.price[0] > 0 || activeFilters.price[1] < 300) && (
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  Price: ${activeFilters.price[0]} - ${activeFilters.price[1]}
                  <button
                    onClick={() => setActiveFilters(prev => ({ ...prev, price: [0, 300] }))}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Filters Modal */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button onClick={() => setIsMobileFiltersOpen(false)}>
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="mobile-price-min" className="block text-sm text-gray-600 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        id="mobile-price-min"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile-price-max" className="block text-sm text-gray-600 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        id="mobile-price-max"
                        min={priceRange[0]}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      applyPriceFilter();
                      setIsMobileFiltersOpen(false);
                    }}
                    className="flex-1 bg-primary-700 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={() => {
                      resetFilters();
                      setIsMobileFiltersOpen(false);
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">
                Try adjusting your filters to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;