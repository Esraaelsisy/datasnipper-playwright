import { Page } from "@playwright/test";

export class PricingPage {
  constructor(private page: Page) {}

  async navigateToPricingPage() {
    await this.page.goto("/pricing");
  }

  async getPackageNames(): Promise<string[]> {
    const packageNames = await this.page
      .locator(".price-card-v-two .heading-5-card-pricing.title")
      .evaluateAll((elements) =>
        elements.map((el) => el.textContent?.trim() || "")
      );
    return [...new Set(packageNames)];
  }

  async getBookDemoLinks(): Promise<string[]> {
    return await this.page
      .locator(".button-secundary-blue.margin-top.low.w-button")
      .evaluateAll((elements) =>
        elements.map((el) => el.getAttribute("href") || "")
      );
  }

  async isCustomOCRAvailableForEnterprise(): Promise<boolean> {
    const enterpriseCheckbox = this.page
      .getByText("Custom OCR Configuration")
      .locator("flex-pricing-checks-overview")
      .locator("img.image-45");
    await enterpriseCheckbox.waitFor({ state: "visible" });
    const isThirdChild = await enterpriseCheckbox.evaluate((img) => {
      return img === img.parentElement?.children[2];
    });
    return isThirdChild;
  }
}
