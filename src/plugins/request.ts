import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const TEST_MODE = 1;

export function get(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<any>> {
  if (TEST_MODE) {
    return axios.get(url);
  } else {
    return axios.get(url, config);
  }
}

export function post(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<any>> {
  if (TEST_MODE) {
    return axios.get(url);
  } else {
    return axios.get(url, config);
  }
}
