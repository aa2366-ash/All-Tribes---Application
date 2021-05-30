import { useDispatch } from "react-redux";
import post from "./post";
const get = async (url: string) => {
  const accessToken = localStorage.getItem("accesstoken");

  const request = await fetch(process.env.REACT_APP_SERVER_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const response = await request.json();
  if (request.status >= 200 && request.status < 300) return response;
  else {
    throw new Error(response?.message);
  }
};

export default get;
