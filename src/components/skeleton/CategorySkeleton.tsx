const CategoryListSkeleton = () => {
  // Create array of skeleton rows
  const skeletonRows = Array.from({ length: 5 }, (_, index) => index);

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
      <tbody className="divide-y divide-white/5">
        {skeletonRows.map((index) => (
          <tr key={index} className="animate-pulse">
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                {/* Skeleton image */}
                <div className="w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                <div className="text-sm font-medium leading-6 truncate">
                  {/* Skeleton text */}
                  <div className="w-32 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                </div>
              </div>
            </td>
            <td className="table-cell py-4 pl-0 pr-4 pr-8">
              <div className="flex gap-x-3">
                <div className="text-sm leading-6">
                  {/* Skeleton text */}
                  <div className="w-24 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div className="flex items-center justify-start gap-x-2">
                <div className="block">
                  {/* Skeleton text */}
                  <div className="w-16 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                </div>
              </div>
            </td>
            <td className="table-cell py-4 pl-0 pr-8 text-sm leading-6 lg:pr-20">
              {/* Skeleton text */}
              <div className="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            </td>
            <td className="table-cell py-4 pl-0 pr-4 pr-6 text-sm leading-6 text-right lg:pr-8">
              <div className="flex justify-end gap-x-1">
                {/* Skeleton action buttons */}
                <div className="flex items-center justify-center w-8 h-8 bg-gray-300 border border-gray-400 rounded dark:bg-gray-700 dark:border-gray-600"></div>
                <div className="flex items-center justify-center w-8 h-8 ml-1 bg-gray-300 border border-gray-400 rounded dark:bg-gray-700 dark:border-gray-600"></div>
                <div className="flex items-center justify-center w-8 h-8 ml-1 bg-gray-300 border border-gray-400 rounded dark:bg-gray-700 dark:border-gray-600"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryListSkeleton;
