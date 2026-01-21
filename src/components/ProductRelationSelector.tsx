import { Product } from "../vite-env";
import { useProductSearch } from "../hooks/useProductSearch";

interface Props {
  value: Product[];
  onChange: (products: Product[]) => void;
  multiple?: boolean;
}

const DEFAULT_IMAGE = "https://via.placeholder.com/40?text=No+Image";

export default function ProductRelationSelector({
  value,
  onChange,
  multiple = true,
}: Props) {
  const {
    search,
    setSearch,
    page,
    products,
    total,
    loading,
    goToNextPage,
    goToPrevPage,
  } = useProductSearch();

  /* ===== SELECT ===== */
  const toggleProduct = (product: Product) => {
    if (!multiple) {
      onChange([product]);
      return;
    }

    const exists = value.some((p) => p.id === product.id);

    onChange(
      exists ? value.filter((p) => p.id !== product.id) : [...value, product],
    );
  };

  const removeProduct = (product: Product) => {
    onChange(value.filter((p) => p.id !== product.id));
  };

  return (
    <div className="p-4 space-y-4 bg-white border rounded-xl dark:border-gray-700 dark:bg-gray-900">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />

      {/* TABLE */}
      <div className="overflow-auto border rounded-lg max-h-80 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="w-10 p-2"></th>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-right">Price</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              products.map((product) => {
                const selected = value.some((p) => p.id === product.id);
                const imageUrl = product.featuredImage?.url || DEFAULT_IMAGE;

                return (
                  <tr
                    key={product.id}
                    className={`border-t dark:border-gray-700
                    ${selected ? "bg-blue-50 dark:bg-blue-900/30" : ""}
                    hover:bg-gray-50 dark:hover:bg-gray-800`}
                  >
                    <td className="p-2 text-center">
                      <input
                        type={multiple ? "checkbox" : "radio"}
                        checked={selected}
                        onChange={() => toggleProduct(product)}
                      />
                    </td>

                    <td className="p-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl}
                          alt=""
                          className="object-cover w-10 rounded h-14"
                        />
                        <span>{product.title}</span>
                      </div>
                    </td>

                    <td className="p-2 text-right">৳{product.price}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between text-sm">
        <button
          onClick={goToPrevPage}
          disabled={page === 1}
          type="button"
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Page {page} / {Math.ceil(total / 10)}
        </span>

        <button
          onClick={goToNextPage}
          disabled={page * 10 >= total}
          type="button"
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* SELECTED */}
      {value.length > 0 && (
        <div className="p-3 border rounded-lg">
          <p className="mb-2 text-sm font-semibold">Selected Products</p>

          <ul className="space-y-2">
            {value.map((product, index) => {
              const imageUrl = product.featuredImage?.url || DEFAULT_IMAGE;

              return (
                <li
                  key={product.id}
                  className="flex items-center justify-between px-3 py-2 border rounded"
                >
                  <div className="flex items-center gap-3">
                    <span>{index + 1}.</span>
                    <img
                      src={imageUrl}
                      className="object-cover w-10 rounded h-14"
                    />
                    <span>{product.title}</span>
                  </div>

                  <button
                    onClick={() => removeProduct(product)}
                    className="px-2 py-1 text-xs bg-gray-200 rounded"
                    type="button"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
