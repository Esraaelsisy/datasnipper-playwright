import { test, expect, ResponseHelper } from "../fixtures/requestBuilder";
import peopleData from "../data/people.data.json";

test.describe("People API Tests", () => {
  test("@TestCase1 : Verify fetching people total count", async ({
    apiManager,
  }) => {
    await test.step("Fetch all people data", async () => {
      console.log("Fetching all people data...");
      const response = await apiManager.peopleApi.getAllPeople();
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      console.log("People data fetched and response validated successfully.");

      await test.step("Validate the total count of people", async () => {
        console.log("Validating total count of people...");
        expect(responseBody.count).toEqual(peopleData.totalCount);
        console.log("Total count of people validated successfully.");
      });
    });
  });

  test(`@TestCase3 : Validate person with ID ${peopleData.people.id} with name ${peopleData.people.name} correct vehicles and speeds`, async ({
    apiManager,
  }) => {
    await test.step("Fetch person details by ID", async () => {
      console.log(`Fetching details for person ID: ${peopleData.people.id}...`);
      const response = await apiManager.peopleApi.getPersonById(
        peopleData.people.id
      );
      console.log("Person details response:", response);

      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      console.log("Person details fetched and response validated successfully.");
    });

    await test.step("Validate the person's name", async () => {
      console.log("Validating person's name...");
      const response = await apiManager.peopleApi.getPersonById(
        peopleData.people.id
      );
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      expect(responseBody.name).toBe(peopleData.people.name);
      console.log("Person's name validated successfully.");
    });

    await test.step("Extract and validate vehicle URLs", async () => {
      console.log("Extracting vehicle URLs...");
      const response = await apiManager.peopleApi.getPersonById(
        peopleData.people.id
      );
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      const vehicleUrls = responseBody.vehicles;
      console.log("Vehicle URLs extracted:", vehicleUrls);
      expect(vehicleUrls).toBeDefined();
      expect(vehicleUrls.length).toBeGreaterThan(0);
      console.log("Vehicle URLs validated successfully.");
    });

    await test.step("Fetch and validate vehicle details", async () => {
      console.log("Fetching vehicle details...");
      const response = await apiManager.peopleApi.getPersonById(
        peopleData.people.id
      );
      const responseBody =
        await ResponseHelper.validateResponseStatusAndContentType(
          response,
          200
        );
      const vehicleUrls = responseBody.vehicles;

      const vehicleDetails = await Promise.all(
        vehicleUrls.map(async (url: string) => {
          console.log(`Fetching details for vehicle URL: ${url}...`);
          const vehicleResponse =
            await apiManager.requestBuilder.getWithFixedURL(url);
          const vehicleData = await vehicleResponse.json();
          console.log("Vehicle details fetched:", vehicleData);
          return vehicleData;
        })
      );

      const vehicleMap = vehicleDetails.reduce(
        (map, vehicle) => ({
          ...map,
          [vehicle.name]: vehicle.max_atmosphering_speed,
        }),
        {}
      );
      console.log("Vehicle map constructed:", vehicleMap);

      await test.step("Validate vehicle names and speeds", async () => {
        console.log("Validating vehicle names and speeds...");
        expect(vehicleMap[peopleData.people.vehicles[0].name]).toBe("650");
        expect(vehicleMap[peopleData.people.vehicles[1].name]).toBe("360");
        console.log("Vehicle names and speeds validated successfully.");
      });
    });
  });
});