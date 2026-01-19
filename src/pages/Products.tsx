import {
  Pagination,
  ProductTable,
  RowsPerPage,
  Sidebar,
  WhiteButton,
} from "../components";
import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AiOutlineExport } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";
import usePagination from "../hooks/usePagination";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products.api";
import useDebounce from "../hooks/useDebounce";

const Products = () => {
  const pagination = usePagination<any>();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const {
    data,
    isLoading,
    error,
    currentPage,
    totalPages,
    search,
    setSearch,
    fetchData,
    goToNextPage,
    goToPrevPage,
  } = pagination;

  // Fetch data on page, sort, or search change
  useEffect(() => {
    fetchData(getProducts);
  }, [currentPage, fetchData, search]);

  // Update pagination search when debounced input changes
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div className="flex h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="w-full dark:bg-blackPrimary bg-whiteSecondary ">
        <div className="py-10 dark:bg-blackPrimary bg-whiteSecondary">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                All products
              </h2>
              <p className="flex items-center text-base font-normal dark:text-whiteSecondary text-blackPrimary">
                <span>Dashboard</span>{" "}
                <HiOutlineChevronRight className="text-lg" />{" "}
                <span>All products</span>
              </p>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button className="flex items-center justify-center w-32 py-2 text-lg duration-200 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary hover:border-gray-500 gap-x-2">
                <AiOutlineExport className="text-base dark:text-whiteSecondary text-blackPrimary" />
                <span className="font-medium dark:text-whiteSecondary text-blackPrimary">
                  Export
                </span>
              </button>
              <WhiteButton
                link="/products/create-product"
                text="Add a product"
                textSize="lg"
                py="2"
                width="48"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 mt-5 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-2">
            <div className="relative">
              <HiOutlineSearch className="absolute text-lg text-gray-400 top-3 left-3" />
              <input
                type="text"
                className="h-10 bg-white border border-gray-600 w-60 dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary outline-0 indent-10 focus:border-gray-500"
                placeholder="Search products..."
                name="search"
                id="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div>
              <select
                className="h-10 pl-3 pr-8 border border-gray-600 cursor-pointer w-60 dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary outline-0 hover:border-gray-500"
                name="sort"
                id="sort"
              >
                <option value="default">Sort by</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <ProductTable products={data} loading={isLoading} error={error} />
          <div className="flex items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8 max-sm:flex-col max-sm:pt-6 max-sm:pb-0">
            <Pagination
              pagination={pagination}
              showPageNumbers={true}
              showLimitSelector={true}
              customLimits={[10, 20, 50, 100]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
