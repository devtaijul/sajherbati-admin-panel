import axios from "axios";
import { ENV } from "../config/env.config";

export const getFlatCategories = async () =>
  axios.get(`${ENV.BACKEND_URL}/category/flat`).then((res) => res.data);

export const getCategoryTree = async () =>
  axios.get(`${ENV.BACKEND_URL}/category/tree`).then((res) => res.data);

export const getProducts = async () =>
  axios.get(`${ENV.BACKEND_URL}/product`).then((res) => res.data);

export const getproductById = async (id: string) =>
  axios.get(`${ENV.BACKEND_URL}/product/${id}`).then((res) => res.data);

export const getAllOrders = async () =>
  axios.get(`${ENV.BACKEND_URL}/order`).then((res) => res.data);

export const getOrderById = async (id: string) =>
  axios.get(`${ENV.BACKEND_URL}/order/${id}`).then((res) => res.data);
