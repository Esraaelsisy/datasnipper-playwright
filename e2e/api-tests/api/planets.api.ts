import { RequestBuilder } from "../utlis/requestBuilder";

export class PlanetsApi {
  private requestBuilder: RequestBuilder;
  private endpoints: Record<string, string>;

  constructor(
    requestHelper: RequestBuilder,
    endpoints: Record<string, string>
  ) {
    this.requestBuilder = requestHelper;
    this.endpoints = endpoints;
  }

  async getPlanetById(id: number) {
    return this.requestBuilder.get(this.endpoints.planetsById, {
      planet_id: id.toString(),
    });
  }

  async getAllPlanets() {
    return this.requestBuilder.get(this.endpoints.planets);
  }
}
