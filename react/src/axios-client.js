import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api"
  // baseURL: `${import.meta.env.VITE_BASE_URL}/api`
})

export default axiosClient;
