import axios, { AxiosResponse } from "axios";

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const accesstoken = localStorage.getItem("accesstoken");
    config.headers = {
      Authorization: `Bearer ${accesstoken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accesstoken = await refreshAccessToken();
      localStorage.setItem("accesstoken", accesstoken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + accesstoken;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

interface IAccesstoken {
  accesstoken: string;
  message: string;
  err?: {
    message: string;
  };
}
const refreshAccessToken = async () => {
  const refreshtoken = localStorage.getItem("refreshtoken");
  const token = await axiosApiInstance.post(`api/session/token`, {
    refreshtoken,
  });
  const accesstoken = token.data.accesstoken;
  return accesstoken;
};

export default axiosApiInstance;
