import axios from "axios";
import { CategoryInput } from "../vite-env";
const BACKEND_URL = "http://localhost:5000/api/v1";
interface GetCategoriesParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export const getCategories = async ({
  page,
  limit,
  sortBy,
  sortOrder,
}: GetCategoriesParams) => {
  const res = await axios.get(`${BACKEND_URL}/category`, {
    params: {
      page,
      limit,
      sortBy,
      sortOrder,
    },
  });

  return res.data;
};

export const getCategoryById = async (id: string) => {
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
