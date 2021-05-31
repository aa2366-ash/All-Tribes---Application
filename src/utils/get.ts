import axiosApiInstance from "./interceptor";

const get = async (url: string) => {
  const accessToken = localStorage.getItem("accesstoken");

  const response = await axiosApiInstance.get(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  if (response.status >= 200 && response.status < 300) return response.data;
  else {
    throw new Error(response.data.message);
  }
};

export default get;
