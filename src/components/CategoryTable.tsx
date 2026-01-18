// *********************
// Role of the component: The component that displays categories table on the admin category page
// Name of the component: CategoryTable.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryTable />
// Input parameters: No input parameters
// Output: table with categories
// *********************

import { nanoid } from "nanoid";
import { Suspense } from "react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { CategoryWithParent } from "../vite-env";
import CategoryListSkeleton from "./skeleton/CategorySkeleton";
import { PAGES } from "../config/pages.config";

const CategoryTable = ({
  loading,
  data,
  error,
}: {
  loading: boolean | null;
  data: CategoryWithParent[];
  error: string | null;
}) => {
  console.log("data", data);

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
            <tr key={nanoid()}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  {/*  <img
                    src={item.category.imageUrl}
                    alt=""
                    className="w-8 h-8 bg-gray-800 rounded-full"
                  /> */}
                  <div className="text-sm font-medium leading-6 truncate dark:text-whiteSecondary text-blackPrimary">
                    {item.title}
                  </div>
                </div>
              </td>
              <td className="table-cell py-4 pl-0 pr-4 pr-8">
                <div className="flex gap-x-3">
                  <div className="text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                    {item.slug}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-start gap-x-2">
                  <div className="block dark:text-whiteSecondary text-blackPrimary">
                    {17}
                  </div>
                </div>
              </td>
              <td className="table-cell py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary lg:pr-20">
                {item?.parentId ? item?.parent?.title : "/"}
              </td>
              <td className="table-cell py-4 pl-0 pr-4 pr-6 text-sm leading-6 text-right dark:text-whiteSecondary text-blackPrimary lg:pr-8">
                <div className="flex justify-end gap-x-1">
                  <Link
                    to={PAGES.CATEGORY.EDIT(item.id)}
                    className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlinePencil className="text-lg" />
                  </Link>
                  <Link
                    to={PAGES.CATEGORY.EDIT(item.id)}
                    className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlineEye className="text-lg" />
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlineTrash className="text-lg" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Suspense>
    </table>
  );
};
export default CategoryTable;
