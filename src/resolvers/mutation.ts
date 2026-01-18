import axios from "axios";
import { updateCategory } from "../services/category.api";
import { CategoryInput } from "../vite-env";
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
