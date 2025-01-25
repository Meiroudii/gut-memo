import axios from "axios"
import { ACCESS_TOKEN } from "./constants"
console.info("%c I am api.js", "font-size: 2rem;");

const apiURL = "/choreo-apis/gut-memo/backend/v1"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
