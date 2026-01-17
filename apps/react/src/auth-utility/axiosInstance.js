import axios from "axios";
import { getAuthToken } from "./authStorage";

let setApiLoading;

//creating this to create a bridge between axios and react. Axios is outside of react state,
//cannot use react hook useAuth to get the setLoading from the context and update it. So, need
//this binder which willbe called once when the app initialise and allows axios to use the context
//variable to store loading state for API calls.
export const bindLoading = (setLoading) => (setApiLoading = setLoading);

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(
  (config) => {
    setApiLoading?.(true);
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    setApiLoading?.(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    setApiLoading?.(false);
    return response;
  },
  (error) => {
    setApiLoading?.(false);
    return Promise.reject(error);
  }
);

export default api;
