import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import interceptors from "./interceptors";
const isProd: boolean = process.env.NODE_ENV === "production";

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

if (!isProd) {
  interceptors.LoggingAxiosInterceptorInstance.register(axios);
}

type GenericRequestParams<E> = {
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
  body?: E;
  options?: AxiosRequestConfig<any>;
  resource: string;
};

export abstract class Client<
  GetResponseData,
  GetAllResponseData,
  PostResponseData,
  PutResponseData,
  PatchResponseData,
  DeleteResponseData,
  PostRequestData,
  PutRequestData,
  PatchRequestData
> {
  protected baseResource: string;

  constructor(baseResource: string) {
    this.baseResource = `api/${baseResource}`;
  }

  protected buildUrl(resource: string) {
    return new URL(
      `${this.baseResource}/${resource}`,
      "http://localhost:5000/api"
    ).toString();
  }

  protected async genericRequest<T, E = null>({
    method,
    body,
    options = {},
    resource,
  }: GenericRequestParams<E>): Promise<AxiosResponse<T>> {
    let result = null;
    console.log(axios.defaults.headers.common.Authorization);
    try {
      if (body) {
        result = await axios[method]<T>(this.buildUrl(resource), body, options);
        return result;
      }

      result = await axios[method]<T>(this.buildUrl(resource), options);
    } catch (error) {
      const response = error.response as T;

      result = response;
    }
    return result;
  }

  async getById<T extends GetResponseData>(
    id: string,
    options: AxiosRequestConfig<any> = {}
  ) {
    return await this.genericRequest<T>({
      method: "get",
      resource: id,
      options,
    });
  }

  async get<T extends GetAllResponseData>(
    resource: string,
    options: AxiosRequestConfig<any> = {}
  ) {
    return await this.genericRequest<T>({
      method: "get",
      resource,
      options,
    });
  }

  async post<T extends PostResponseData, E extends PostRequestData>(
    resource: string,
    body: E,
    options: AxiosRequestConfig<any> = {}
  ) {
    return await this.genericRequest<T, E>({
      method: "post",
      body,
      resource,
      options,
    });
  }

  async put<T extends PutResponseData, E extends PutRequestData>(
    resource: string,
    body: E,
    options: AxiosRequestConfig = {}
  ) {
    return await this.genericRequest<T, E>({
      method: "put",
      body,
      resource,
      options,
    });
  }

  async patch<T extends PatchResponseData, E extends PatchRequestData>(
    resource: string,
    body: E,
    options: AxiosRequestConfig = {}
  ) {
    return await this.genericRequest<T, E>({
      method: "patch",
      body,
      resource,
      options,
    });
  }

  async delete<T extends DeleteResponseData>(
    resource: string,
    options: AxiosRequestConfig<any> = {}
  ) {
    return await this.genericRequest<T>({
      method: "delete",
      resource,
      options,
    });
  }

  sseRequest(
    resource: string,
    eventSourceInitDict?: EventSourceInit
  ): EventSource {
    return new EventSource(this.buildUrl(resource), eventSourceInitDict);
  }
}

export abstract class AdminClientAbs<
  GetResponseData,
  GetAllResponseData,
  PostResponseData,
  PutResponseData,
  PatchResponseData,
  DeleteResponseData,
  PostRequestData,
  PutRequestData,
  PatchRequestData
> extends Client<
  GetResponseData,
  GetAllResponseData,
  PostResponseData,
  PutResponseData,
  PatchResponseData,
  DeleteResponseData,
  PostRequestData,
  PutRequestData,
  PatchRequestData
> {
  protected genericRequest<T, E = null>({
    method,
    body,
    options = {
      headers: {},
    },
    resource,
  }: GenericRequestParams<E>): Promise<AxiosResponse<T, any>> {
    return super.genericRequest({
      method,
      body,
      options: {
        ...options,
      },
      resource,
    });
  }
}
