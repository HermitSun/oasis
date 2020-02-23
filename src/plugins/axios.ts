import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://wensun.top:5000/api"
    : "http://localhost:3180";

const globalConfig = {
  timeout: 60 * 1000
  // 如果启用凭据，后端必须在AllowOrigin里指定源，而不能是*
  // withCredentials: true
};

const globalAxios = axios.create(globalConfig);

export default globalAxios;
