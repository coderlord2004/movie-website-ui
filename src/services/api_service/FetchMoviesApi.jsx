const buildURLWithParams = (baseUrl, queryParams) => {
  let url = new URL(baseUrl);
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, queryParams[key]),
  );
  return url.toString();
};
const fetchApi = (url, option = {}) => {
  return fetch(url, option)
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Can't fetch the data!");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
export const fetchApiWithParams = (baseUrl, params) => {
  const url = buildURLWithParams(baseUrl, params);
  return fetchApi(url);
};
export const fetchApiWithOptions = (url, options) => {
  return fetchApi(url, options);
};
