import axios from "axios";
import { BASE_URL } from "../constants";
const lang = sessionStorage.getItem("lang");
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept-Language"] = lang;
axios.defaults.headers.common["x-api-key"] =
  "3f80d796-eec7-4163-91c2-991550076cbf";

let refresh = false;
const cookies = document.cookie;
const listOfCookies = cookies.split(";");
let refreshToken = "";
listOfCookies.forEach((e) => {
  if (e.includes("refreshToken")) {
    refreshToken = e.split("=")[1];
  }
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response?.status === 401 && !refresh) {
      refresh = true;
      const res = await axios.post("/api/token/refresh/", {
        refresh: refreshToken
      });
      if (res?.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;
        return axios(err.config);
      }
    }
    refresh = false;
    return err;
  }
);

export default axios;
