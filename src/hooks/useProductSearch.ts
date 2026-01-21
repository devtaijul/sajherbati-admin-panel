import { useEffect, useState, useCallback } from "react";
import { Product } from "../vite-env";

interface UseProductSearchOptions {
  limit?: number;
  debounceMs?: number;
}

interface ApiResponse {
  data: Product[];
  total: number;
}

export const useProductSearch = ({
  limit = 10,
  debounceMs = 600,
}: UseProductSearchOptions = {}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `http://localhost:5000/api/v1/product?search=${search}&page=${page}&limit=${limit}`,
      );

      const json: ApiResponse = await res.json();

      setProducts(json.data || []);
      setTotal(json.total || 0);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  /* ===== DEBOUNCED FETCH ===== */
  useEffect(() => {
    const timer = setTimeout(fetchProducts, debounceMs);
    return () => clearTimeout(timer);
  }, [fetchProducts, debounceMs]);

  /* ===== DERIVED ===== */
  const totalPages = Math.ceil(total / limit);

  const goToNextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return {
    search,
    setSearch,

    page,
    setPage,

    products,
    total,
    totalPages,

    loading,
    error,

    goToNextPage,
    goToPrevPage,
    refetch: fetchProducts,
  };
};
