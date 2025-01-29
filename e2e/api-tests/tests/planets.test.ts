import { test, expect, ResponseHelper } from "../fixtures/apiManager";
import planetsData from "../data/planets.data.json";

test.describe("Planets API Tests", () => {
  test("@TestCase1 : Verify fetching planets total count", async ({
    apiManager,
  }) => {
    await test.step("Fetch all planets data", async () => {
      console.log("Fetching all planets data...");
      const response = await apiManager.planetsApi.getAllPlanets();
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      console.log("Planets data fetched and response validated successfully.");

      await test.step("Validate total planets count", async () => {
        console.log("Validating total planets count...");
        expect(responseBody.count).toEqual(planetsData.totalCount);
        console.log("Total planets count validated successfully.");
      });
    });
  });

  test(`@TestCase4 : Validate planet ${planetsData.planets.name} has correct diameter and residents`, async ({
    apiManager,
  }) => {
    let responseBody;
    await test.step("Fetch planet details by ID", async () => {
      console.log(
        `Fetching details for planet ID: ${planetsData.planets.id}...`
      );
      const response = await apiManager.planetsApi.getPlanetById(
        planetsData.planets.id
      );
      responseBody = await ResponseHelper.validateResponseStatusAndContentType(
        response,
        200
      );
      console.log(
        "Planet details fetched and response validated successfully."
      );
    });

    await test.step("Validate planet diameter", async () => {
      expect(responseBody.diameter).toBe(planetsData.planets.diameter);
      console.log("Planet diameter validated successfully.");
    });

    await test.step("Validate planet residents count", async () => {
      expect(responseBody.residents.length).toBe(1);
      console.log("Planet residents count validated successfully.");
    });

    await test.step("Fetch and validate resident details", async () => {
      console.log("Fetching resident details...");
      const residentUrl = responseBody.residents[0];
      const residentResponse = await apiManager.requestBuilder.getWithFixedURL(
        residentUrl
      );
      const residentData = await residentResponse.json();
      console.log("Resident details fetched:", residentData);

      await test.step("Validate resident name", async () => {
        console.log("Validating resident name...");
        expect(residentData.name).toBe(planetsData.planets.residents.name);
        console.log("Resident name validated successfully.");
      });
    });
  });
});
