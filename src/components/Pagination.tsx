// *********************
// Role of the component: Pagination component that displays the page numbers and navigation buttons
// Name of the component: Pagination.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Pagination />
// Input parameters: no input parameters
// Output: Pagination component that displays the page numbers and navigation buttons
// *********************

import RowsPerPage from "./RowsPerPage";
interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    setPage: (page: number) => void;
    getPaginationRange: () => number[];
    limit?: number;
    setLimit?: (limit: number) => void;
    goToFirstPage?: () => void;
    goToLastPage?: () => void;
  };
  showPageNumbers?: boolean;
  showLimitSelector?: boolean;
  customLimits?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  showPageNumbers = true,
  showLimitSelector = false,
  customLimits = [5, 10, 20, 50],
}) => {
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setPage,
    getPaginationRange,
    goToFirstPage,
    setLimit,
    limit,
    goToLastPage,
  } = pagination;

  const pageNumbers = getPaginationRange();

  return (
    <>
      {showLimitSelector && setLimit && limit && (
        <RowsPerPage
          customLimits={customLimits}
          setLimit={setLimit}
          limit={limit}
        />
      )}
      <div className="flex items-center gap-2">
        {goToFirstPage && (
          <button
            className="px-3 py-1 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            &laquo;
          </button>
        )}

        <button
          className="px-3 py-1 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Prev
        </button>

        {showPageNumbers &&
          pageNumbers.map((number, index) =>
            number === -1 ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 dark:text-whiteSecondary text-blackPrimary"
              >
                ...
              </span>
            ) : (
              <button
                key={number}
                className={`border border-gray-600 py-1 px-3 min-w-[40px] hover:border-gray-500 ${
                  currentPage === number
                    ? "dark:bg-whiteSecondary bg-blackPrimary dark:text-blackPrimary text-whiteSecondary"
                    : "dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary"
                }`}
                onClick={() => setPage(number)}
                aria-label={`Page ${number}`}
                aria-current={currentPage === number ? "page" : undefined}
              >
                {number}
              </button>
            ),
          )}

        <button
          className="px-3 py-1 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Next page"
        >
          Next
        </button>

        {goToLastPage && (
          <button
            className="px-3 py-1 border border-gray-600 dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goToLastPage}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Last page"
          >
            &raquo;
          </button>
        )}
      </div>

      <div className="text-sm dark:text-whiteSecondary text-blackPrimary">
        Page {currentPage} of {totalPages || 1}
      </div>
    </>
  );
};

export default Pagination;
