import { test, expect } from "../fixtures/testSetup";
import pricingData from "../data/pricingPage.data.json";

test.describe("Pricing Page Tests", () => {
  test("@TestCase1 : Validate package options and Book Demo links Direction", async ({
    pm,
  }) => {
    await test.step("Navigate to the Pricing Page", async () => {
      console.log("Navigating to the Pricing Page...");
      await pm.pricingPage.navigateToPricingPage();
      console.log("Successfully navigated to the Pricing Page.");
    });

    await test.step("Validate the package names", async () => {
      console.log("Fetching and validating package names...");
      const packageNames = await pm.pricingPage.getPackageNames();
      console.log("Package names fetched:", packageNames);
      expect(packageNames).toEqual(pricingData.packages);
      console.log("Package names validated successfully.");
    });

    await test.step("Validate the Book Demo links", async () => {
      console.log("Fetching and validating Book Demo links...");
      const bookDemoLinks = await pm.pricingPage.getBookDemoLinks();
      console.log("Book Demo links fetched:", bookDemoLinks);
      expect(bookDemoLinks).toEqual(pricingData.bookDemoLinks);
      console.log("Book Demo links validated successfully.");
    });
  });

  test("@TestCase1 : Validate Enterprise package contains Custom OCR Configuration", async ({
    pm,
  }) => {
    const pricingPage = pm.pricingPage;

    await test.step("Navigate to the Pricing Page", async () => {
      console.log("Navigating to the Pricing Page...");
      await pricingPage.navigateToPricingPage();
      console.log("Successfully navigated to the Pricing Page.");
    });

    await test.step("Validate Custom OCR Configuration for the Enterprise plan", async () => {
      console.log(
        "Checking if Custom OCR Configuration is available for the Enterprise plan..."
      );

      expect(pricingPage.isCustomOCRAvailableForEnterprise()).toBeTruthy();
      console.log("Custom OCR Configuration validated successfully.");
    });
  });
});
