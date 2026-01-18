// *********************
// Role of the component: Rows per page component that displays the number of rows per page
// Name of the component: RowsPerPage.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <RowsPerPage />
// Input parameters: no input parameters
// Output: RowsPerPage component that displays the number of rows per page
// *********************

import { nanoid } from "nanoid";

const RowsPerPage = ({
  customLimits = [5, 10, 20, 50],
  setLimit,
  limit,
}: {
  customLimits?: number[];
  setLimit?: (limit: number) => void;
  limit?: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-lg font-normal dark:text-whiteSecondary text-blackPrimary">
        Rows per page:
      </p>
      <select
        className="w-24 h-8 pl-3 pr-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary outline-0 hover:border-gray-500"
        name="rows"
        id="rows"
        defaultValue={limit}
        value={limit}
        onChange={(e) => {
          setLimit && setLimit(Number(e.target.value));
        }}
      >
        {customLimits.map((limit) => (
          <option key={nanoid()} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    </div>
  );
};
export default RowsPerPage;
