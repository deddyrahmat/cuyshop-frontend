import axios, { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import dataHandler from "./dataHandler";
import errorHandler from "./errorHandler";

const Axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER as string,
});

Axios.interceptors.response.use(
  (response: AxiosResponse) => dataHandler(response),
  (error: AxiosError) => {
    errorHandler(error);
    // Menandai error tanpa menggunakan Promise.reject
    return { error };
  }
);

export const setAuthToken = (token: string | null): void => {
  if (token) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common.Authorization;
  }
};

export default Axios;
