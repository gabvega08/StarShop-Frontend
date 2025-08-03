import {
  Product,
  ProductPerformance,
  TopSellingProduct,
  InventoryAlert,
} from '../types';

export const MOCK_PRODUCT_PERFORMANCE: ProductPerformance[] = [
  { name: 'Premium Hoodie', sold: 24, percentage: 85 },
  { name: 'Urban Sneakers', sold: 18, percentage: 72 },
  { name: 'Graphic T-Shirt', sold: 12, percentage: 58 },
];

export const MOCK_INVENTORY_STATUS = {
  total: 156,
  active: 14,
  lowStock: 8,
  outOfStock: 6,
  inStock: 2,
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Hoodie',
    category: 'Clothing',
    price: 85,
    currency: 'XLM',
    stock: 24,
    rating: 4.8,
    reviewCount: 24,
    status: 'active',
    image: '/placeholder.svg?height=300&width=300',
    featured: true,
  },
  {
    id: '2',
    name: 'Urban Sneakers',
    category: 'Footwear',
    price: 120,
    currency: 'XLM',
    stock: 12,
    rating: 4.5,
    reviewCount: 12,
    status: 'active',
    image: '/placeholder.svg?height=300&width=300',
    featured: true,
  },
  {
    id: '3',
    name: 'Graphic T-Shirt',
    category: 'Clothing',
    price: 35,
    currency: 'XLM',
    stock: 42,
    rating: 4.2,
    reviewCount: 42,
    status: 'active',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: '4',
    name: 'Minimalist Watch',
    category: 'Accessories',
    price: 95,
    currency: 'XLM',
    stock: 8,
    rating: 4.7,
    reviewCount: 8,
    status: 'active',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: '5',
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 65,
    currency: 'XLM',
    stock: 0,
    rating: 4.6,
    reviewCount: 0,
    status: 'out-of-stock',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: '6',
    name: 'Summer Collection Shirt',
    category: 'Clothing',
    price: 45,
    currency: 'XLM',
    stock: 0,
    rating: 0,
    reviewCount: 0,
    status: 'draft',
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: '7',
    name: 'Designer Sunglasses',
    category: 'Accessories',
    price: 75,
    currency: 'XLM',
    stock: 5,
    rating: 4.9,
    reviewCount: 5,
    status: 'active',
    image: '/placeholder.svg?height=300&width=300',
    featured: true,
  },
  {
    id: '8',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    price: 110,
    currency: 'XLM',
    stock: 15,
    rating: 4.4,
    reviewCount: 15,
    status: 'active',
    image: '/placeholder.svg?height=300&width=300',
  },
];

export const MOCK_TOP_SELLING: TopSellingProduct[] = [
  {
    name: 'Premium Hoodie (Black)',
    sold: 24,
    revenue: '2,040 XLM',
    growth: '+15%',
  },
  {
    name: 'Urban Sneakers (Gray)',
    sold: 18,
    revenue: '2,160 XLM',
    growth: '+8%',
  },
  {
    name: 'Graphic T-Shirt (White)',
    sold: 12,
    revenue: '420 XLM',
    growth: '+5%',
  },
];

export const MOCK_INVENTORY_ALERTS: InventoryAlert[] = [
  {
    type: 'low-stock',
    items: [
      { name: 'Designer Sunglasses', count: 5, status: 'left' },
      { name: 'Minimalist Watch', count: 8, status: 'left' },
    ],
  },
  {
    type: 'restock',
    items: [],
  },
  {
    type: 'out-of-stock',
    items: [
      { name: 'Leather Wallet', count: 0, status: 'Out of stock' },
      { name: 'Summer Collection Shirt', count: 0, status: 'Out of stock' },
    ],
  },
];

export const PRODUCT_FILTERS = [
  { key: 'all' as const, label: 'All Products', count: 8 },
  { key: 'active' as const, label: 'Active', count: 6 },
  { key: 'draft' as const, label: 'Draft', count: 1 },
  { key: 'out-of-stock' as const, label: 'Out of Stock', count: 1 },
];

export const PRODUCT_CATEGORIES = [
  'All Categories',
  'Clothing',
  'Footwear',
  'Accessories',
  'Electronics',
];

export const PRICE_RANGES = [
  'All Prices',
  'Under 50 XLM',
  '50-100 XLM',
  'Over 100 XLM',
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'stock', label: 'Stock Level' },
];
