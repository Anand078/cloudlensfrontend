import axios from "./instance";
// import qs from "qs";
// const { REACT_APP_SERVER_BASE_URL } = process.env;

function apiRequest(props) {
  const { url, init, option, config } = props;
  if (init.method === "POST") {
    return axios.post(url, option, config);
  }
  if (init.method === "PATCH") {
    return axios.patch(url, option);
  }
  if (init.method === "DELETE") {
    return axios.delete(url, option);
  }
  if (init.method === "PUT") {
    return axios.put(url, option);
  }
  return axios.get(url, option );
}

const request = {
  get: (url, option) =>
    apiRequest({
      url,
      init: {
        method: "GET",
      },
      option,
    }),

  delete: (url, option) =>
    apiRequest({
      url,
      init: {
        method: "DELETE",
      },
      option,
    }),

  post: (url, option, config) =>
    apiRequest({
      url,
      init: {
        method: "POST",
      },
      option,
      config,
    }),
  patch: (url, option) =>
    apiRequest({
      url,
      init: {
        method: "PATCH",
      },
      option,
    }),
  put: (url, option) =>
    apiRequest({
      url,
      init: {
        method: "PUT",
      },
      option,
    }),
};

export default request;
