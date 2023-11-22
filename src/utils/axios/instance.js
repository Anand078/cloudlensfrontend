import axios from "axios"
import qs from "qs"

// axios instance
const instance = axios.create({
  // baseURL: `http://44.212.34.126:8080/`,
  baseURL: `http://3.82.242.14:8080`,
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false })
  },
})

// request header
instance.interceptors.request.use(
  config => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }

    return config
  },
  error => Promise.reject(error)
)

export const http = instance

export default http
