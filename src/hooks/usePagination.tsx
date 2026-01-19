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
  search: string;
  totalItems: number;
  totalPages: number;
  data: T[];
  isLoading: boolean;
  error: string | null;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sortBy: string, order?: "asc" | "desc") => void;
  setSearch: (query: string) => void;

  fetchData: (
    fetcher: (params: {
      page: number;
      limit: number;
      sortBy: string;
      sortOrder: "asc" | "desc";
      search?: string;
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
  const search = searchParams.get("search") || "";

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
        search: string;
      }>,
    ) => {
      const sp = new URLSearchParams(searchParams);

      if (params.page !== undefined) sp.set("page", String(params.page));
      if (params.limit !== undefined) sp.set("limit", String(params.limit));
      if (params.sortBy !== undefined) sp.set("sortBy", params.sortBy);
      if (params.sortOrder !== undefined) sp.set("sortOrder", params.sortOrder);
      if (params.search !== undefined) sp.set("search", params.search);

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

  const setSearch = (query: string) =>
    updateSearchParams({ search: query, page: 1 });

  const fetchData = useCallback(
    async (
      fetcher: (params: {
        page: number;
        limit: number;
        sortBy: string;
        sortOrder: "asc" | "desc";
        search?: string;
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
          search: search || undefined,
        });

        setData(res.data);
        setTotalItems(res.total);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, limit, sortBy, sortOrder, search],
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
    fetchData,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    getPaginationRange,
  };
};

export default usePagination;
