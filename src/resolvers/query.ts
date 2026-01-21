import axios from "axios";
const BACKEND_URL = "http://localhost:5000/api/v1";

export const getFlatCategories = async () =>
  axios.get(`${BACKEND_URL}/category/flat`).then((res) => res.data);

export const getCategoryTree = async () =>
  axios.get(`${BACKEND_URL}/category/tree`).then((res) => res.data);

export const getProducts = async () =>
  axios.get(`${BACKEND_URL}/product`).then((res) => res.data);

export const getproductById = async (id: string) =>
  axios.get(`${BACKEND_URL}/product/${id}`).then((res) => res.data);
