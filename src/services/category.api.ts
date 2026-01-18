import axios from "axios";
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
