import { test, expect, ResponseHelper } from "../fixtures/requestBuilder";
import filmsData from "../data/films.data.json";

test.describe("Films API Tests", () => {
  test(`@TestCase2 : Validate planets in ${filmsData.films.title} film`, async ({
    apiManager,
  }) => {
    await test.step("Fetch film data by title", async () => {
      console.log(`Fetching film data for title: ${filmsData.films.title}...`);
      const response = await apiManager.filmsApi.getFilmByTitle(
        filmsData.films.title
      );
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      console.log("Film data fetched and response validated successfully.");
    });

    await test.step("Extract and validate planets URLs", async () => {
      console.log("Extracting planets URLs from the response...");
      const response = await apiManager.filmsApi.getFilmByTitle(
        filmsData.films.title
      );
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      const planetsUrls = responseBody.results[0]?.planets;
      console.log("Planets URLs extracted:", planetsUrls);
      expect(planetsUrls).toBeDefined();
      expect(planetsUrls.length).toBeGreaterThan(0);
      console.log("Planets URLs validated successfully.");
    });

    await test.step("Fetch and validate planet names", async () => {
      console.log("Fetching and validating planet names...");
      const response = await apiManager.filmsApi.getFilmByTitle(
        filmsData.films.title
      );
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      const planetsUrls = responseBody.results[0]?.planets;
      const planetNames = await Promise.all(
        planetsUrls.map(async (planetUrl: string) => {
          console.log(`Fetching planet details from URL: ${planetUrl}...`);
          const planetResponse =
            await apiManager.requestBuilder.getWithFixedURL(planetUrl);
          const planetData = await planetResponse.json();
          console.log("Planet details fetched:", planetData);
          return planetData.name;
        })
      );
      console.log("Fetched planet names:", planetNames);
      expect(planetNames).toEqual(filmsData.films.planets);
      console.log("Planet names validated successfully.");
    });
  });
});