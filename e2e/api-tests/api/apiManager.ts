import { APIRequestContext } from "@playwright/test";
import { RequestBuilder } from "../utlis/requestBuilder";
import { FilmsApi } from "./films.api";
import { PlanetsApi } from "./planets.api";
import { PeopleApi } from "./people.api";
import endpoints from "../data/endpoints.json";

export class ApiManager {
  readonly requestBuilder: RequestBuilder;
  readonly filmsApi: FilmsApi;
  readonly planetsApi: PlanetsApi;
  readonly peopleApi: PeopleApi;

  constructor(request: APIRequestContext) {
    // Initialize RequestBuilder
    this.requestBuilder = new RequestBuilder(
      request,
      endpoints.baseUrl,
      endpoints
    );

    // Initialize all API classes
    this.filmsApi = new FilmsApi(this.requestBuilder, endpoints);
    this.planetsApi = new PlanetsApi(this.requestBuilder, endpoints);
    this.peopleApi = new PeopleApi(this.requestBuilder, endpoints);
  }
}
