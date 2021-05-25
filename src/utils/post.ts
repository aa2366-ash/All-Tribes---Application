import { Console } from "console";
import Login from "../Screens/Login/Login";

const post = async <T = any>(data: {}, url: string): Promise<T> => {
  console.log(process.env.REACT_APP_SERVER_URL, url);

  const request = await fetch(process.env.REACT_APP_SERVER_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
  const response = await request.json();
  if (request.status >= 200 && request.status < 300) return response;
  else {
    throw new Error(response?.message);
  }
};
export default post;
