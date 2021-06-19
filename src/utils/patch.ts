import axiosApiInstance from "./interceptor";

const patch = async (url: string, data: {}) => {
  const response = await axiosApiInstance.patch(url, data);
  if (response.status >= 200 && response.status < 300) return response.data;
  else {
    throw new Error(response.data.message);
  }
};
export default patch;
