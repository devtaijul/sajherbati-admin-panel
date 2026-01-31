import axios from "axios";
import { updateCategory } from "../services/category.api";
import { CategoryInput } from "../vite-env";
import { OrderUpdateInput, ProductSchema } from "../utils/validation";
import { ENV } from "../config/env.config";

export const createCategoryMutation = async ({
  category,
}: {
  category: CategoryInput & { featuredImageId: string };
}) => axios.post(`${ENV.BACKEND_URL}/category`, category);

export const updateCategoryMutation = async ({
  id,
  category,
}: {
  id: string;
  category: CategoryInput;
}) => {
  return updateCategory({ id, category });
};

// PRODUCT: MUTATIONS
export const createProductMutation = async ({
  product,
}: {
  product: ProductSchema & {
    featuredImageId: string;
    galleryImageIds: string[];
  };
}) => axios.post(`${ENV.BACKEND_URL}/product`, product);

export const updateProductMutation = async ({
  id,
  product,
}: {
  id: string;
  product: ProductSchema;
}) => axios.put(`${ENV.BACKEND_URL}/product/${id}`, product);

export const deleteProductMutation = async (id: string) =>
  await axios.delete(`${ENV.BACKEND_URL}/product/${id}`);

export const updateOrderMutation = async ({
  id,
  order,
}: {
  id: string;
  order: OrderUpdateInput;
}) =>
  await axios.put(`${ENV.BACKEND_URL}/order/${id}`, order, {
    headers: {
      "Content-Type": "application/json",
    },
  });
