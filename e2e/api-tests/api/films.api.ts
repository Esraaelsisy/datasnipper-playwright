import { RequestBuilder } from "../utlis/requestBuilder";

export class FilmsApi {
  private requestBuilder: RequestBuilder;
  private endpoints: Record<string, string>;

  constructor(
    requestHelper: RequestBuilder,
    endpoints: Record<string, string>
  ) {
    this.requestBuilder = requestHelper;
    this.endpoints = endpoints;
  }

  async getFilmByTitle(title: string) {
    return this.requestBuilder.get(this.endpoints.films, undefined, { title });
  }
}
