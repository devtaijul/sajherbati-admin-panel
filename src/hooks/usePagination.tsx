import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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

interface UsePaginationReturn<T> {
  currentPage: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  totalItems: number;
  totalPages: number;
  data: T[];
  isLoading: boolean;
  error: string | null;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sortBy: string, order?: "asc" | "desc") => void;

  fetchData: (
    fetcher: (params: {
      page: number;
      limit: number;
      sortBy: string;
      sortOrder: "asc" | "desc";
    }) => Promise<ApiPaginationResponse<T>>,
  ) => Promise<void>;

  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  getPaginationRange: () => number[];
}

const usePagination = <T,>({
  itemsPerPage = 10,
  defaultSortBy = "createdAt",
  defaultSortOrder = "desc",
}: UsePaginationOptions = {}): UsePaginationReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || itemsPerPage);
  const sortBy = searchParams.get("sortBy") || defaultSortBy;
  const sortOrder = (searchParams.get("sortOrder") || defaultSortOrder) as
    | "asc"
    | "desc";

  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limit),
    [totalItems, limit],
  );

  const updateSearchParams = useCallback(
    (
      params: Partial<{
        page: number;
        limit: number;
        sortBy: string;
        sortOrder: "asc" | "desc" | "newest" | "oldest";
      }>,
    ) => {
      const sp = new URLSearchParams(searchParams);

      if (params.page) sp.set("page", String(params.page));
      if (params.limit) sp.set("limit", String(params.limit));
      if (params.sortBy) sp.set("sortBy", params.sortBy);
      if (params.sortOrder) sp.set("sortOrder", params.sortOrder);

      setSearchParams(sp);
    },
    [searchParams, setSearchParams],
  );

  const setPage = (page: number) =>
    updateSearchParams({ page: Math.max(1, Math.min(page, totalPages)) });

  const setLimit = (limit: number) => updateSearchParams({ limit, page: 1 });

  const setSort = (
    sortBy: string,
    order: "asc" | "desc" | "newest" | "oldest" = "asc",
  ) => updateSearchParams({ sortBy, sortOrder: order, page: 1 });

  const fetchData = useCallback(
    async (
      fetcher: (params: {
        page: number;
        limit: number;
        sortBy: string;
        sortOrder: "asc" | "desc";
      }) => Promise<ApiPaginationResponse<T>>,
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetcher({
          page: currentPage,
          limit,
          sortBy,
          sortOrder,
        });

        setData(res.data);
        setTotalItems(res.total);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, limit, sortBy, sortOrder],
  );

  const goToNextPage = () =>
    currentPage < totalPages && setPage(currentPage + 1);
  const goToPrevPage = () => currentPage > 1 && setPage(currentPage - 1);
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

  return {
    currentPage,
    limit,
    sortBy,
    sortOrder,
    totalItems,
    totalPages,
    data,
    isLoading,
    error,
    setPage,
    setLimit,
    setSort,
    fetchData,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    getPaginationRange,
  };
};

export default usePagination;
