import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "@/plugins/axios.ts";

const TEST_MODE = process.env.NODE_ENV !== "production";

function splitUrl(url: string): string {
  const urlPart = url.split("/");
  if (urlPart.length < 4) {
    return url;
  } else {
    let tmp = "/" + urlPart[1] + "/";
    for (let i = 2; i < urlPart.length; i++) {
      tmp += urlPart[i];
    }
    return tmp;
  }
}

export function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const jsonServerUrl = splitUrl(url);
  if (TEST_MODE) {
    return axios.get(jsonServerUrl);
  } else {
    return axios.get(jsonServerUrl, config);
  }
}
