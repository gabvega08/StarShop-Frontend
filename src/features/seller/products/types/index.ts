export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  stock: number;
  status: 'active' | 'draft' | 'out-of-stock';
  image: string;
  featured?: boolean;
}

export interface ProductPerformance {
  name: string;
  sold: number;
  percentage: number;
}

export interface InventoryStatus {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
}

export interface TopSellingProduct {
  name: string;
  sold: number;
  revenue: string;
  growth: string;
}

export interface InventoryAlert {
  type: 'low-stock' | 'restock' | 'out-of-stock';
  items: Array<{
    name: string;
    count: number;
    status: string;
  }>;
}

// export type ProductFilter = 'all' | 'active' | 'draft' | 'out-of-stock';

export type ProductFilter =
  | 'all'
  | 'clothing'
  | 'electronics'
  | 'accessories'
  | 'out-of-stock';

// Product status types
export type ProductStatus = 'in-stock' | 'low-stock' | 'out-of-stock';
