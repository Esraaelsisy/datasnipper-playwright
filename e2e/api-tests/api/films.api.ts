import { RequestBuilder } from "../utlis/requestBuilder";

export class FilmsApi {
  private requestHelper: RequestBuilder;
  private endpoints: Record<string, string>;

  constructor(
    requestHelper: RequestBuilder,
    endpoints: Record<string, string>
  ) {
    this.requestHelper = requestHelper;
    this.endpoints = endpoints;
  }

  async getFilmByTitle(title: string) {
    return this.requestHelper.get(this.endpoints.films, undefined, { title });
  }
}
