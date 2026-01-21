import axios from "axios";
import { updateCategory } from "../services/category.api";
import { CategoryInput } from "../vite-env";
import { ProductSchema } from "../utils/validation";
const BACKEND_URL = "http://localhost:5000/api/v1";

export const createCategoryMutation = async ({
  category,
}: {
  category: CategoryInput & { featuredImageId: string };
}) => axios.post(`${BACKEND_URL}/category`, category);

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
}) => axios.post(`${BACKEND_URL}/product`, product);

export const updateProductMutation = async ({
  id,
  product,
}: {
  id: string;
  product: ProductSchema;
}) => axios.put(`${BACKEND_URL}/product/${id}`, product);

export const deleteProductMutation = async (id: string) =>
  await axios.delete(`${BACKEND_URL}/product/${id}`);
