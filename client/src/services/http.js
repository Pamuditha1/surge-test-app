import axios from "axios";
import { toast } from "react-toastify";

let headers = {
  Authorization: "",
};
let token = localStorage.getItem("token");

if (token) {
  headers["auth-token"] = token;
}

const authInstance = axios.create({
  headers,
});

authInstance.interceptors.response.use(null, (error) => {
  const expextedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error.response.status === 401) {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }

  if (!error.response || !expextedError) {
    console.error("API Error : ", error);
    toast.error("An unexpexted error occured.");
  }

  return Promise.reject(error);
});

const http = {
  get: authInstance.get,
  post: authInstance.post,
  put: authInstance.put,
  delete: authInstance.delete,
};
export default http;
