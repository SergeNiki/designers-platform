import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: "http://31.148.203.10:25566/",
});

$api.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers!.Authorization = `Token ${localStorage.getItem(
      "token"
    )}`;
  }
  return config;
});

// $api.interceptors.response.use((config) => {
//     return config
// }, (error) => {
    
// })

export default $api;
