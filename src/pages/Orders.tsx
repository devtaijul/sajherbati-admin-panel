import { AiOutlineExport } from "react-icons/ai";
import {
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlineSearch,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { OrderTable, Pagination, Sidebar } from "../components";
import usePagination from "../hooks/usePagination";
import { getOrders } from "../services/orders.api";
import { Order } from "../vite-env";

const Orders = () => {
  const pagination = usePagination<Order>(getOrders);

  const { data, isLoading, error, setSearch, search } = pagination;

  return (
    <div className="flex h-auto border-t border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="w-full dark:bg-blackPrimary bg-whiteSecondary ">
        <div className="py-10 dark:bg-blackPrimary bg-whiteSecondary">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                All orders
              </h2>
              <p className="flex items-center text-base font-normal dark:text-whiteSecondary text-blackPrimary">
                <span>Dashboard</span>{" "}
                <HiOutlineChevronRight className="text-lg" />{" "}
                <span>All orders</span>
              </p>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button className="flex items-center justify-center w-32 py-2 text-lg duration-200 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:hover:border-gray-500 hover:border-gray-400 gap-x-2">
                <AiOutlineExport className="text-base dark:text-whiteSecondary text-blackPrimary" />
                <span className="font-medium dark:text-whiteSecondary text-blackPrimary">
                  Export
                </span>
              </button>
              <Link
                to="/orders/create-order"
                className="flex items-center justify-center w-48 py-2 text-lg duration-200 dark:bg-whiteSecondary bg-blackPrimary dark:hover:bg-white hover:bg-blackSecondary gap-x-1"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
                <span className="font-semibold dark:text-blackPrimary text-whiteSecondary">
                  Add an order
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 mt-5 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-2">
            <div className="relative">
              <HiOutlineSearch className="absolute text-lg text-gray-400 top-3 left-3" />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="h-10 bg-white border border-gray-600 w-60 dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary outline-0 indent-10 dark:focus:border-gray-500 focus:border-gray-400"
                placeholder="Search orders..."
              />
            </div>
            <div>
              <select
                className="h-10 pl-3 pr-8 border border-gray-600 cursor-pointer w-60 dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary outline-0 dark:hover:border-gray-500 hover:border-gray-400"
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
          <OrderTable loading={isLoading} error={error} orders={data} />
          <div className="flex items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8 max-sm:flex-col max-sm:pt-6 max-sm:pb-0">
            <Pagination
              customLimits={[10, 20, 50, 100]}
              pagination={pagination}
              showLimitSelector
              showPageNumbers
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;
