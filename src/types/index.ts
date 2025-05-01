export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number;
    description: string;
    features?: string[];
    details?: Record<string, string>;
    images: string[];
    category: string;
    tags: string[];
    stock: number;
    rating: number;
    reviewCount: number;
    isFeatured?: boolean;
    isNew?: boolean;
  }
  
  export interface CartItem {
    productId: string;
    name: string;
    price: number;
    salePrice?: number;
    image: string;
    quantity: number;
    size?: string;
    color?: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    featuredImage?: string;
    parentId?: string;
  }
  
  export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    productId: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
  }
  
  export interface WishlistItem {
    productId: string;
  }
  
  export interface Banner {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    image: string;
    buttonText?: string;
    buttonLink?: string;
  }
  
  export interface Collection {
    id: string;
    name: string;
    description?: string;
    image: string;
    link: string;
  }
  
  export interface FilterOption {
    value: string;
    label: string;
    count?: number;
  }
  
  export interface SortOption {
    value: string;
    label: string;
  }