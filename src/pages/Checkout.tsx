import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '../utils/formatters';

const shippingMethods = [
  { id: 'standard', title: 'Standard Shipping', description: '3-5 business days', price: 5.99 },
  { id: 'express', title: 'Express Shipping', description: '1-2 business days', price: 12.99 },
  { id: 'free', title: 'Free Shipping', description: '5-7 business days', price: 0, threshold: 100 },
];

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    shippingMethod: shippingMethods[0].id,
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    sameAsShipping: true,
  });
  
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  
  const subtotal = getTotalPrice();
  const selectedShipping = shippingMethods.find(m => m.id === formState.shippingMethod) || shippingMethods[0];
  const shippingCost = subtotal >= (selectedShipping.threshold || Infinity) ? 0 : selectedShipping.price;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.email) newErrors.email = 'Email is required';
    if (!formState.firstName) newErrors.firstName = 'First name is required';
    if (!formState.lastName) newErrors.lastName = 'Last name is required';
    if (!formState.address) newErrors.address = 'Address is required';
    if (!formState.city) newErrors.city = 'City is required';
    if (!formState.state) newErrors.state = 'State is required';
    if (!formState.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formState.phone) newErrors.phone = 'Phone number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    
    return true;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.cardName) newErrors.cardName = 'Name on card is required';
    if (!formState.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formState.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formState.cvc) newErrors.cvc = 'CVC is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    
    return true;
  };
  
  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 2 && validateStep2()) {
      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        clearCart();
        navigate('/checkout/success');
      }, 2000);
    }
  };
  
  // Check if cart is empty
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout - Mineworks</title>
        </Helmet>
        
        <div className="min-h-screen bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            
            <div className="bg-gray-50 rounded-lg py-12 px-6 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                You need to add some items to your cart before checking out.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 bg-primary-700 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Browse Products
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
        <title>Checkout - FashionHub</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/cart" 
              className="text-sm text-gray-600 hover:text-primary-700 inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Cart
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Checkout Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                {/* Checkout Progress */}
                <div className="mb-8">
                  <div className="flex items-center">
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      step >= 1 ? 'bg-primary-700 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step > 1 ? <Check size={16} /> : '1'}
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${
                      step > 1 ? 'bg-primary-700' : 'bg-gray-200'
                    }`}></div>
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      step >= 2 ? 'bg-primary-700 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step > 2 ? <Check size={16} /> : '2'}
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${
                      step > 2 ? 'bg-primary-700' : 'bg-gray-200'
                    }`}></div>
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      step >= 3 ? 'bg-primary-700 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      3
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className={step >= 1 ? 'text-primary-700 font-medium' : 'text-gray-500'}>
                      Shipping
                    </span>
                    <span className={step >= 2 ? 'text-primary-700 font-medium' : 'text-gray-500'}>
                      Payment
                    </span>
                    <span className={step >= 3 ? 'text-primary-700 font-medium' : 'text-gray-500'}>
                      Review
                    </span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Shipping Information */}
                  {step === 1 && (
                    <>
                      <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
                      
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className={`w-full rounded-md border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                            className={`w-full rounded-md border ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                            className={`w-full rounded-md border ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formState.address}
                          onChange={handleChange}
                          className={`w-full rounded-md border ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          id="apartment"
                          name="apartment"
                          value={formState.apartment}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formState.city}
                            onChange={handleChange}
                            className={`w-full rounded-md border ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                          />
                          {errors.city && (
                            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State / Province
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formState.state}
                            onChange={handleChange}
                            className={`w-full rounded-md border ${
                              errors.state ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                          />
                          {errors.state && (
                            <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP / Postal Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formState.zipCode}
                            onChange={handleChange}
                            className={`w-full rounded-md border ${
                              errors.zipCode ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                          />
                          {errors.zipCode && (
                            <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className={`w-full rounded-md border ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Method</h3>
                      
                      <div className="space-y-4 mb-6">
                        {shippingMethods.map((method) => (
                          <div 
                            key={method.id}
                            className={`border rounded-md p-4 cursor-pointer ${
                              formState.shippingMethod === method.id 
                                ? 'border-primary-500 bg-primary-50' 
                                : 'border-gray-300'
                            }`}
                            onClick={() => setFormState(prev => ({ ...prev, shippingMethod: method.id }))}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={`shipping-${method.id}`}
                                name="shippingMethod"
                                value={method.id}
                                checked={formState.shippingMethod === method.id}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-700 focus:ring-primary-500 border-gray-300"
                              />
                              <label htmlFor={`shipping-${method.id}`} className="ml-3 flex flex-1 justify-between">
                                <div>
                                  <span className="block text-sm font-medium text-gray-900">
                                    {method.title}
                                  </span>
                                  <span className="block text-sm text-gray-500 mt-1">
                                    {method.description}
                                  </span>
                                  {method.threshold && (
                                    <span className="block text-sm text-primary-700 mt-1">
                                      Free for orders over ${method.threshold}
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {method.price === 0 ? 'Free' : formatPrice(method.price)}
                                </span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="bg-primary-700 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </>
                  )}
                  
                  {/* Step 2: Payment Information */}
                  {step === 2 && (
                    <>
                      <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Information</h2>
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Payment Method</h3>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-300 flex items-center">
                          <CreditCard size={20} className="text-gray-500 mr-2" />
                          <span className="text-gray-900">Credit Card</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formState.cardName}
                          onChange={handleChange}
                          className={`w-full rounded-md border ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formState.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 1234 1234 1234"
                          className={`w-full rounded-md border ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry date (MM/YY)
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formState.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={`w-full rounded-md border ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            value={formState.cvc}
                            onChange={handleChange}
                            placeholder="123"
                            className={`w-full rounded-md border ${
                              errors.cvc ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                          />
                          {errors.cvc && (
                            <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sameAsShipping"
                            name="sameAsShipping"
                            checked={formState.sameAsShipping}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary-700 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                            Billing address is the same as shipping address
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={processing}
                          className={`${
                            processing 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-primary-700 hover:bg-primary-600'
                          } text-white px-6 py-3 rounded-md font-medium transition-colors`}
                        >
                          {processing ? 'Processing...' : 'Place Order'}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-6">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.productId} className="py-4 flex">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">
                                {formatPrice((item.salePrice || item.price) * item.quantity)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && ' | '}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end">
                            <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4 py-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="text-gray-900 font-medium">{formatPrice(subtotal)}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-gray-900 font-medium">
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax</p>
                    <p className="text-gray-900 font-medium">{formatPrice(tax)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-lg font-medium text-gray-900">{formatPrice(total)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;