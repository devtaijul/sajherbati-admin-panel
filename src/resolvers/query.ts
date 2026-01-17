import axios from "axios";
const BACKEND_URL = "http://localhost:5000/api/v1";

export const getFlatCategories = async () =>
  axios.get(`${BACKEND_URL}/category/flat`).then((res) => res.data);
