import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import ProductTableSkeleton from "./skeleton/ProductTableSkeleton";

const inStockClass =
  "text-green-400 bg-green-400/10 flex-none rounded-full p-1";
const outOfStockClass =
  "text-rose-400 bg-rose-400/10 flex-none rounded-full p-1";

const DEFAULT_IMAGE = "https://via.placeholder.com/40?text=No+Image";

interface Product {
  id: string;
  title: string;
  sku?: string;
  status?: string;
  price?: number;
  featuredImage?: { url?: string } | null;
}

interface Props {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
}

const ProductTable = ({ products, loading, error }: Props) => {
  if (loading) return <ProductTableSkeleton />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!products || products.length === 0)
    return (
      <div className="text-gray-500 dark:text-gray-400">No products found.</div>
    );

  return (
    <table className="w-full mt-6 text-left whitespace-nowrap max-lg:block max-lg:overflow-x-scroll">
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
        {products.map((item) => {
          const imageUrl = item.featuredImage?.url || DEFAULT_IMAGE;
          const statusText = item.status || "Unknown";

          return (
            <tr key={item.id}>
              {/* Product */}
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="object-cover w-8 h-8 bg-gray-800 rounded-full"
                  />
                  <div className="text-sm font-medium leading-6 truncate dark:text-whiteSecondary text-blackPrimary">
                    {item.title}
                  </div>
                </div>
              </td>

              {/* SKU */}
              <td className="table-cell py-4 pl-0 pr-8">
                <div className="font-mono text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                  {item.sku || "-"}
                </div>
              </td>

              {/* Status */}
              <td className="table-cell py-4 pl-0 pr-8 text-sm leading-6">
                <div className="flex items-center justify-start gap-x-2">
                  <div
                    className={
                      statusText.toLowerCase() === "in stock"
                        ? inStockClass
                        : outOfStockClass
                    }
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="block dark:text-whiteSecondary text-blackPrimary">
                    {statusText}
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="table-cell py-4 pl-0 pr-8 text-sm font-medium leading-6 dark:text-rose-200 text-rose-600 lg:pr-20">
                {item.price != null ? `৳${item.price}` : "-"}
              </td>

              {/* Actions */}
              <td className="table-cell py-4 pl-0 pr-4 pr-6 text-sm leading-6 text-right dark:text-whiteSecondary text-blackPrimary lg:pr-8">
                <div className="flex justify-end gap-x-1">
                  <Link
                    to={`/products/${item.id}/edit`}
                    className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary hover:border-gray-400"
                  >
                    <HiOutlinePencil className="text-lg" />
                  </Link>
                  <Link
                    to={`/products/${item.id}`}
                    className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary hover:border-gray-400"
                  >
                    <HiOutlineEye className="text-lg" />
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center justify-center block w-8 h-8 border border-gray-600 cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary hover:border-gray-400"
                  >
                    <HiOutlineTrash className="text-lg" />
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;
