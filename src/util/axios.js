import axios from "axios";

axios.defaults.baseURL = "https://backend.hodaelnas.com";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept-Language"] = "ar";
axios.defaults.headers.common["x-api-key"] =
  "3f80d796-eec7-4163-91c2-991550076cbf";

export default axios;
