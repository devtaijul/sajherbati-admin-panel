import axios from "axios";
import { ENV } from "../config/env.config";

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
  const res = await axios.get(`${ENV.BACKEND_URL}/product`, {
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
  const res = await axios.get(`${ENV.BACKEND_URL}/category/${id}`);

  return res.data;
};

export const updateCategory = async ({
  id,
  category,
}: {
  id: string;
  category: CategoryInput;
}) => {
  const res = await axios.put(`${ENV.BACKEND_URL}/category/${id}`, category);
  return res.data;
};
 */
