const post = async <T = any>(url: string, data: {}): Promise<T> => {
  const accessToken = localStorage.getItem("accesstoken");
  const request = await fetch(process.env.REACT_APP_SERVER_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken,
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
