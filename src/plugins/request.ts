import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "@/plugins/axios.ts";
const TEST_MODE = 1;

export function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  if (TEST_MODE) {
    return axios.get(url);
  } else {
    return axios.get(url, config);
  }
}
