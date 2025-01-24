import { RequestBuilder } from "../utlis/requestBuilder";

export class PeopleApi {
  private requestHelper: RequestBuilder;
  private endpoints: Record<string, string>;

  constructor(
    requestHelper: RequestBuilder,
    endpoints: Record<string, string>
  ) {
    this.requestHelper = requestHelper;
    this.endpoints = endpoints;
  }

  async getPersonById(id: number) {
    return this.requestHelper.get(this.endpoints.peopleById, {
      people_id: id.toString(),
    });
  }

  async getAllPeople() {
    return this.requestHelper.get("/people/");
  }
}
