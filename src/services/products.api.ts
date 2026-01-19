import axios from "axios";
const BACKEND_URL = "http://localhost:5000/api/v1";
interface GetProductsParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search?: string;
}

export const getProducts = async ({
  page,
  limit,
  sortBy,
  search,
  sortOrder,
}: GetProductsParams) => {
  const res = await axios.get(`${BACKEND_URL}/product`, {
    params: {
      page,
      limit,
      sortBy,
      sortOrder,
      search,
    },
  });

  return res.data;
};

/* export const getCategoryById = async (id: string) => {
  const res = await axios.get(`${BACKEND_URL}/category/${id}`);

  return res.data;
};

export const updateCategory = async ({
  id,
  category,
}: {
  id: string;
  category: CategoryInput;
}) => {
  const res = await axios.put(`${BACKEND_URL}/category/${id}`, category);
  return res.data;
};
 */
