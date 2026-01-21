import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/* ================= TYPES ================= */

interface UsePaginationOptions {
  itemsPerPage?: number;
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
}

interface ApiPaginationResponse<T> {
  success: boolean;
  data: T[];
  total: number;
}

interface FetcherParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search?: string;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search: string;

  totalItems: number;
  totalPages: number;
  data: T[];
  isLoading: boolean;
  error: string | null;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sortBy: string, order?: "asc" | "desc") => void;
  setSearch: (search: string) => void;

  refetch: () => Promise<void>;

  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  getPaginationRange: () => number[];
}

/* ================= HOOK ================= */

const usePagination = <T,>(
  fetcher: (params: FetcherParams) => Promise<ApiPaginationResponse<T>>,
  {
    itemsPerPage = 10,
    defaultSortBy = "createdAt",
    defaultSortOrder = "desc",
  }: UsePaginationOptions = {},
): UsePaginationReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ===== URL STATE ===== */

  const currentPage = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || itemsPerPage);
  const sortBy = searchParams.get("sortBy") || defaultSortBy;
  const sortOrder = (searchParams.get("sortOrder") || defaultSortOrder) as
    | "asc"
    | "desc";
  const search = searchParams.get("search") || "";

  /* ===== DATA STATE ===== */

  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ===== DERIVED ===== */

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / limit));
  }, [totalItems, limit]);

  /* ===== URL UPDATE HELPER ===== */

  const updateSearchParams = useCallback(
    (
      params: Partial<{
        page: number;
        limit: number;
        sortBy: string;
        sortOrder: "asc" | "desc";
        search: string;
      }>,
    ) => {
      const sp = new URLSearchParams(searchParams);

      if (params.page !== undefined) sp.set("page", String(params.page));
      if (params.limit !== undefined) sp.set("limit", String(params.limit));
      if (params.sortBy) sp.set("sortBy", params.sortBy);
      if (params.sortOrder) sp.set("sortOrder", params.sortOrder);
      if (params.search !== undefined) sp.set("search", params.search);

      setSearchParams(sp);
    },
    [searchParams, setSearchParams],
  );

  /* ===== SETTERS ===== */

  const setPage = (page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    updateSearchParams({ page: safePage });
  };

  const setLimit = (limit: number) => {
    updateSearchParams({ limit, page: 1 });
  };

  const setSort = (sortBy: string, order: "asc" | "desc" = "asc") => {
    updateSearchParams({
      sortBy,
      sortOrder: order,
      page: 1,
    });
  };

  const setSearch = (value: string) => {
    updateSearchParams({
      search: value,
      page: 1,
    });
  };

  /* ===== FETCH LOGIC ===== */

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetcher({
        page: currentPage,
        limit,
        sortBy,
        sortOrder,
        search,
      });

      setData(res.data);
      setTotalItems(res.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, currentPage, limit, sortBy, sortOrder, search]);

  /* ===== AUTO REFETCH ===== */

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ===== PAGINATION HELPERS ===== */

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => setPage(1);
  const goToLastPage = () => setPage(totalPages);

  const getPaginationRange = () => {
    const delta = 2;
    const pages: number[] = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  /* ===== RETURN ===== */

  return {
    currentPage,
    limit,
    sortBy,
    sortOrder,
    search,

    totalItems,
    totalPages,
    data,
    isLoading,
    error,

    setPage,
    setLimit,
    setSort,
    setSearch,

    refetch: fetchData,

    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    getPaginationRange,
  };
};

export default usePagination;
