import axios, { AxiosRequestConfig } from "axios";

const isProd: boolean = process.env.NODE_ENV === "production";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/";

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

if (!isProd) {
  axios.interceptors.request.use((request) => {
    console.log(
      `[${request.method.toUpperCase()} REQUEST]: ${request?.url}`,
      request
    );
    return request;
  });

  axios.interceptors.response.use((response) => {
    console.log(
      `[${response.config.method.toUpperCase()} RESPONSE]: ${
        response?.request?.responseURL
      }`,
      response
    );
    return response;
  });
}

// axios.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (err) => {
//     if (err?.response?.status === 401) {
//       Router.reload();
//     }
//     handleConnectionError();
//     if (!isProd) {
//       return err;
//     }
//   }
// );

const getURL = (resource: string) => {
  return new URL(resource, BASE_URL).toString();
};

export const get = async <T>(
  resource: string,
  options: AxiosRequestConfig<any> = {}
) => {
  return await axios.get<T>(getURL(resource), options);
};

export const post = async <T>(
  resource: string,
  body: any,
  options: AxiosRequestConfig<any> = {}
) => {
  return await axios.post<T>(getURL(resource), body, options);
};

export const patch = async <T>(
  resource: string,
  body: any,
  options: AxiosRequestConfig<any> = {}
) => {
  return await axios.patch<T>(getURL(resource), body, options);
};

export const deleteReq = async <T>(
  resource: string,
  options: AxiosRequestConfig<any> = {}
) => {
  return await axios.delete<T>(getURL(resource), options);
};

export const sseRequest = (
  resource: string,
  eventSourceInitDict?: EventSourceInit
): EventSource => {
  return new EventSource(getURL(resource), eventSourceInitDict);
};
