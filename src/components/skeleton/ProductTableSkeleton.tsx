const ProductTableSkeleton = () => {
  const rows = Array.from({ length: 6 }); // 6 rows skeleton

  return (
    <table className="w-full mt-6 text-left whitespace-nowrap max-lg:block max-lg:overflow-x-scroll animate-pulse">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-1/12" />
        <col className="lg:w-1/12" />
      </colgroup>
      <thead className="text-sm leading-6 border-b border-white/10 dark:text-whiteSecondary text-blackPrimary">
        <tr>
          <th className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
            Product
          </th>
          <th className="table-cell py-2 pl-0 pr-8 font-semibold">SKU</th>
          <th className="table-cell py-2 pl-0 pr-8 font-semibold">Status</th>
          <th className="table-cell py-2 pl-0 pr-8 font-semibold lg:pr-20">
            Price
          </th>
          <th className="table-cell py-2 pl-0 pr-4 font-semibold text-right sm:pr-6 lg:pr-8">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {rows.map((_, idx) => (
          <tr key={idx}>
            {/* Product */}
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-700" />
                <div className="w-32 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </div>
            </td>

            {/* SKU */}
            <td className="table-cell py-4 pl-0 pr-8">
              <div className="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            </td>

            {/* Status */}
            <td className="table-cell py-4 pl-0 pr-8">
              <div className="w-16 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            </td>

            {/* Price */}
            <td className="table-cell py-4 pl-0 pr-8">
              <div className="w-12 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            </td>

            {/* Actions */}
            <td className="flex justify-end table-cell gap-2 py-4 pl-0 pr-4 text-right">
              <div className="w-8 h-8 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="w-8 h-8 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="w-8 h-8 bg-gray-300 rounded dark:bg-gray-700" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTableSkeleton;
