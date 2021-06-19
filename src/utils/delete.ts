import axiosApiInstance from "./interceptor";

const deletereq = async (url: string) => {
  const accessToken = localStorage.getItem("accesstoken");
  const response = await axiosApiInstance.delete(url);
  if (response.status >= 200 && response.status < 300) return response.data;
  else {
    throw new Error(response.data.message);
  }
};
export default deletereq;
