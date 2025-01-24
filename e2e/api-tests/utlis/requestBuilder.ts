import { APIRequestContext } from "@playwright/test";

export class RequestBuilder {
  private endpoints: Record<string, string>;

  constructor(
    private request: APIRequestContext,
    private baseUrl: string,
    endpoints: Record<string, string>
  ) {
    this.endpoints = endpoints;
  }

  private replacePathParams(
    endpoint: string,
    params: Record<string, string> = {}
  ): string {
    return Object.entries(params).reduce(
      (url, [key, value]) => url.replace(`{${key}}`, encodeURIComponent(value)),
      endpoint
    );
  }

  private buildQueryParams(queryParams?: Record<string, string>): string {
    if (!queryParams || Object.keys(queryParams).length === 0) return "";
    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return `?${queryString}`;
  }

  private constructUrl(
    endpoint: string,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, string>
  ): string {
    const urlPath = this.replacePathParams(endpoint, pathParams || {});
    const queryString = this.buildQueryParams(queryParams);
    return `${this.baseUrl}${urlPath}${queryString}`;
  }

  private async sendRequest(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    options: {
      pathParams?: Record<string, string>;
      queryParams?: Record<string, string>;
      body?: any;
      headers?: Record<string, string>;
    } = {}
  ): Promise<any> {
    const { pathParams, queryParams, body, headers } = options;
    const fullUrl = this.constructUrl(endpoint, pathParams, queryParams);

    this.logRequest(method, fullUrl, headers, body);

    const response = await this.request[
      method.toLowerCase() as keyof APIRequestContext
    ](fullUrl, {
      headers,
      data: body, 
    });

    return response;
  }

  async get(
    endpoint: string,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, string>
  ): Promise<any> {
    return this.sendRequest("GET", endpoint, { pathParams, queryParams });
  }

  async getWithFixedURL(fullURL: string): Promise<any> {
    this.logRequest("GET", fullURL);
    const response = await this.request.get(fullURL);
    return response;
  }

  async post(
    endpoint: string,
    body: any,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, string>
  ): Promise<any> {
    return this.sendRequest("POST", endpoint, {
      pathParams,
      queryParams,
      body,
    });
  }

  private logRequest(
    method: string,
    url: string,
    headers?: Record<string, string>,
    body?: any
  ): void {
    console.log(`\n${method} Request:\n- URL: ${url}`);
    if (headers) {
      console.log(`- Headers: ${JSON.stringify(headers, null, 2)}`);
    }
    if (body) {
      console.log(`- Body: ${JSON.stringify(body, null, 2)}`);
    }
  }
}
