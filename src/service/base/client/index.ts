import axios, { AxiosRequestConfig } from "axios";
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
  }: GenericRequestParams<E>) {
    if (body) {
      return await axios[method]<T>(this.buildUrl(resource), body, options);
    }

    return await axios[method]<T>(this.buildUrl(resource), options);
  }

  async getById(id: string, options: AxiosRequestConfig<any> = {}) {
    return await this.genericRequest<GetResponseData>({
      method: "get",
      resource: id,
      options,
    });
  }

  async get(resource: string, options: AxiosRequestConfig<any> = {}) {
    return await this.genericRequest<GetAllResponseData>({
      method: "get",
      resource,
      options,
    });
  }

  async post(
    resource: string,
    body: PostRequestData,
    options: AxiosRequestConfig<any> = {}
  ) {
    return await this.genericRequest<PostResponseData, PostRequestData>({
      method: "post",
      body,
      resource,
      options,
    });
  }

  async put(
    resource: string,
    body: PutRequestData,
    options: AxiosRequestConfig = {}
  ) {
    return await this.genericRequest<PutResponseData, PutRequestData>({
      method: "put",
      body,
      resource,
      options,
    });
  }

  async patch(
    resource: string,
    body: PatchRequestData,
    options: AxiosRequestConfig = {}
  ) {
    return await this.genericRequest<PatchResponseData, PatchRequestData>({
      method: "patch",
      body,
      resource,
      options,
    });
  }

  async delete(resource: string, options: AxiosRequestConfig<any> = {}) {
    return await this.genericRequest<DeleteResponseData>({
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
