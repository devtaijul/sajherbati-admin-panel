// *********************
// Role of the component: The component that displays categories table on the admin category page
// Name of the component: CategoryTable.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryTable />
// Input parameters: No input parameters
// Output: table with categories
// *********************

import { Suspense } from "react";
import { CategoryWithParent } from "../vite-env";
import { CategoryTableRow } from "./CategoryTableRow";
import CategoryListSkeleton from "./skeleton/CategorySkeleton";

const CategoryTable = ({
  loading,
  data,
  error,
  refetch,
}: {
  loading: boolean | null;
  data: CategoryWithParent[];
  error: string | null;
  refetch: () => void;
}) => {
  if (loading) {
    return <CategoryListSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <table className="w-full mt-6 text-left whitespace-nowrap max-lg:block max-lg:overflow-x-scroll">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-1/12" />
        <col className="lg:w-1/12" />
      </colgroup>
      <thead className="text-sm leading-6 border-b dark:border-white/10 border-black/10 dark:text-whiteSecondary text-blackPrimary">
        <tr>
          <th
            scope="col"
            className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
          >
            Category
          </th>
          <th scope="col" className="table-cell py-2 pl-0 pr-8 font-semibold">
            Slug
          </th>
          <th scope="col" className="table-cell py-2 pl-0 pr-8 font-semibold">
            Number of products
          </th>
          <th
            scope="col"
            className="table-cell py-2 pl-0 pr-8 font-semibold lg:pr-20"
          >
            Parent category
          </th>
          <th
            scope="col"
            className="table-cell py-2 pl-0 pr-4 font-semibold text-right sm:pr-6 lg:pr-8"
          >
            Actions
          </th>
        </tr>
      </thead>
      <Suspense fallback={<CategoryListSkeleton />}>
        <tbody className="divide-y divide-white/5">
          {data.map((item) => (
            <CategoryTableRow item={item} key={item.id} refetch={refetch} />
          ))}
        </tbody>
      </Suspense>
    </table>
  );
};
export default CategoryTable;
