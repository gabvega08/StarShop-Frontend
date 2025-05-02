export type ProductStatus =
  | "All Products"
  | "Active"
  | "Draft"
  | "Out of Stock";
export type SortOption =
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Rating";
export type ViewMode = "grid" | "list";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  status: string[];
  image: string;
}

export interface FilterChip {
  type: "Category" | "Price" | "Status";
  value: string;
}

export type TopSellingProductProps = {
  id: number;
  image: string;
  name: string;
  color: string;
  sold: number;
  inStock: string;
  revenue: string;
  growthPercentage: number;
};
