import { AxiosInstance, AxiosStatic } from "axios";

export interface InterceptorAxiosInterface {
  register(axios: AxiosInstance | AxiosStatic): void;
}
