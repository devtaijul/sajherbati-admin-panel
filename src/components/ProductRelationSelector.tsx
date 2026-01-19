import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  featuredImage?: {
    url: string;
  } | null;
}

interface Props {
  value: Product[];
  onChange: (products: Product[]) => void;
  multiple?: boolean;
}

const DEFAULT_IMAGE = "https://via.placeholder.com/60x80?text=No+Image";

export default function ProductRelationSelector({
  value,
  onChange,
  multiple = true,
}: Props) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH (DEBOUNCED) ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/product?search=${search}&page=${page}&limit=10`,
      );
      const json = await res.json();

      setProducts(json.data || []);
      setTotal(json.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SELECT ================= */
  const toggleProduct = (product: Product) => {
    if (!multiple) {
      onChange([product]);
      return;
    }

    const exists = value.some((p) => p.id === product.id);

    if (exists) {
      onChange(value.filter((p) => p.id !== product.id));
    } else {
      onChange([...value, product]);
    }
  };

  /* ================= ORDER ================= */
  const move = (index: number, dir: "up" | "down") => {
    const updated = [...value];
    const target = dir === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= updated.length) return;

    [updated[index], updated[target]] = [updated[target], updated[index]];

    onChange(updated);
  };

  return (
    <div className="p-4 space-y-4 bg-white border rounded-xl dark:border-gray-700 dark:bg-gray-900">
      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="w-full px-3 py-2 text-sm border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />

      {/* ================= TABLE ================= */}
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
                          src={product.featuredImage?.url || DEFAULT_IMAGE}
                          alt=""
                          className="object-cover w-10 rounded h-14"
                        />
                        <span className="text-sm dark:text-gray-100">
                          {product.title}
                        </span>
                      </div>
                    </td>

                    <td className="p-2 text-right dark:text-gray-200">
                      ৳{product.price}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between text-sm dark:text-gray-200">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          type="button"
          className="px-3 py-1 border rounded disabled:opacity-40 dark:border-gray-600"
        >
          Prev
        </button>

        <span>
          Page {page} / {Math.ceil(total / 10)}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * 10 >= total}
          type="button"
          className="px-3 py-1 border rounded disabled:opacity-40 dark:border-gray-600"
        >
          Next
        </button>
      </div>

      {/* ================= SELECTED ================= */}
      {value.length > 0 && (
        <div className="p-3 border rounded-lg dark:border-gray-700">
          <p className="mb-2 text-sm font-semibold dark:text-gray-100">
            Selected Products (Ordered)
          </p>

          <ul className="space-y-2">
            {value.map((product, index) => (
              <li
                key={product.id}
                className="flex items-center justify-between px-3 py-2 border rounded dark:border-gray-700 dark:text-gray-100"
              >
                <span>
                  {index + 1}. {product.title}
                </span>

                <div className="flex gap-1">
                  <button
                    onClick={() => move(index, "up")}
                    className="px-2 py-1 text-xs bg-gray-200 rounded dark:bg-gray-700"
                    disabled={index === 0}
                    title="Move up"
                    aria-label="Move up"
                    type="button"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(index, "down")}
                    className="px-2 py-1 text-xs bg-gray-200 rounded dark:bg-gray-700"
                    disabled={index === value.length - 1}
                    title="Move down"
                    aria-label="Move down"
                    type="button"
                  >
                    ↓
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
