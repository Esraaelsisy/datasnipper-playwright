import { RequestBuilder } from "../utlis/requestBuilder";

export class PlanetsApi {
  private requestHelper: RequestBuilder;
  private endpoints: Record<string, string>;

  constructor(
    requestHelper: RequestBuilder,
    endpoints: Record<string, string>
  ) {
    this.requestHelper = requestHelper;
    this.endpoints = endpoints;
  }

  async getPlanetById(id: number) {
    return this.requestHelper.get(this.endpoints.planetsById, {
      planet_id: id.toString(),
    });
  }

  async getAllPlanets() {
    return this.requestHelper.get(this.endpoints.planets);
  }
}
