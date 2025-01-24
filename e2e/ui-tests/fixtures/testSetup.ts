import { test as base, expect, Page } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
type TestFixtures = {
  pm: PageManager;
};

export const test = base.extend<TestFixtures>({
  pm: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const pageManager = new PageManager(page);
    await use(pageManager);
  },
});

export { expect };
