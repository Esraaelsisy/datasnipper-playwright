import { test as baseTest, expect } from "@playwright/test";
import { ApiManager } from "../api/apiManager";
import { ResponseHelper } from "../utlis/responseHelper";

type ApiFixtures = {
  apiManager: ApiManager;
};

export const test = baseTest.extend<ApiFixtures>({
  apiManager: async ({ request }, use) => {
    const apiManager = new ApiManager(request);
    await use(apiManager);
  },
});

export { expect, ResponseHelper };
