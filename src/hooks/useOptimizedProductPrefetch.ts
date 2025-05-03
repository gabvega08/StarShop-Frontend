import { useCallback, startTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api/products";
import { useRouter } from "next/navigation";

export function useOptimizedProductPrefetch(productId: number | string) {
    const queryClient = useQueryClient();
    const router = useRouter();
  
    const prefetchProduct = useCallback(() => {
      startTransition(() => {
        queryClient.prefetchQuery({
          queryKey: ["product", productId],
          queryFn: () => fetchProductById(productId),
        });
  
        const img = new Image();
        img.src = `/assets/products/${productId}.webp`;
  
        router.prefetch(`/product/${productId}`);
      });
    }, [productId, queryClient, router]);
  
    return { prefetchProduct };
  }
  