import axios from "axios";

const apiRequester = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiRequester.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiRequester;
