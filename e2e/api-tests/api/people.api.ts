import { RequestBuilder } from "../utlis/requestBuilder";

export class PeopleApi {
  private requestBuilder: RequestBuilder;
  private endpoints: Record<string, string>;

  constructor(
    requestHelper: RequestBuilder,
    endpoints: Record<string, string>
  ) {
    this.requestBuilder = requestHelper;
    this.endpoints = endpoints;
  }

  async getPersonById(id: number) {
    return this.requestBuilder.get(this.endpoints.peopleById, {
      people_id: id.toString(),
    });
  }

  async getAllPeople() {
    return this.requestBuilder.get(this.endpoints.people);
  }
}
