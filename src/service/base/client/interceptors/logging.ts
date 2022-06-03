import { AxiosInstance, AxiosStatic } from "axios";
import { InterceptorAxiosInterface } from "./interceptor.interface";

class LoggingAxiosInterceptor implements InterceptorAxiosInterface {
  register(axios: AxiosInstance | AxiosStatic) {
    axios.interceptors.request.use((request) => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[${request.method.toUpperCase()} REQUEST]: ${request?.url}`,
          request
        );
      }
      return request;
    });

    axios.interceptors.response.use((response) => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[${response.config.method.toUpperCase()} RESPONSE]: ${
            response?.request?.responseURL
          }`,
          response
        );
      }
      return response;
    });
  }
}

export default new LoggingAxiosInterceptor();
