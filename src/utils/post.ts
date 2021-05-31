import axiosApiInstance from "./interceptor";

const post = async (url: string, data: {}) => {
  const accessToken = localStorage.getItem("accesstoken");
  console.log(data);
  const response = await axiosApiInstance.post(url, data);
  if (response.status >= 200 && response.status < 300) return response.data;
  else {
    throw new Error(response.data.message);
  }
};
export default post;
