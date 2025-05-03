import { Product } from "@/types/product"; 

export const fetchProductById = async (id: number | string): Promise<Product> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};