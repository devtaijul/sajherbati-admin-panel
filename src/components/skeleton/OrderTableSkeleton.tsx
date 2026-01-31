const OrderTableSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <table className="w-full mt-6 text-left whitespace-nowrap max-lg:block max-lg:overflow-x-scroll">
      <thead className="text-sm leading-6 border-b border-white/10 dark:text-whiteSecondary text-blackPrimary">
        <tr>
          {["Customer", "Status", "Total", "Date", "Actions"].map((_, i) => (
            <th
              key={i}
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index}>
            {/* Customer */}
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700" />
                <div className="w-32 h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
              </div>
            </td>

            {/* Status */}
            <td className="py-4 pr-8">
              <div className="w-20 h-6 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
            </td>

            {/* Total */}
            <td className="py-4 pr-8">
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
            </td>

            {/* Date */}
            <td className="py-4 pr-8">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
            </td>

            {/* Actions */}
            <td className="py-4 pr-6 lg:pr-8">
              <div className="flex justify-end gap-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gray-200 border border-gray-300 rounded animate-pulse dark:border-gray-700 dark:bg-gray-800"
                  />
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTableSkeleton;
