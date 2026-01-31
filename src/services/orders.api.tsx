import axios from "axios";
import { ENV } from "../config/env.config";

interface GetOrdersParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search?: string;
}

export const getOrders = async ({
  page,
  limit,
  sortBy,
  search,
  sortOrder,
}: GetOrdersParams) => {
  const res = await axios.get(`${ENV.BACKEND_URL}/order`, {
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
