import { Page, Locator } from "@playwright/test";

export class PricingPage {
  private packageNamesLocator: Locator;
  private bookDemoLinksLocator: Locator;
  private enterpriseCustomOCRCheckbox: Locator;

  constructor(private page: Page) {
    this.packageNamesLocator = this.page.locator(
      ".price-card-v-two .heading-5-card-pricing.title"
    );
    this.bookDemoLinksLocator = this.page.locator(
      ".button-secundary-blue.margin-top.low.w-button"
    );
    this.enterpriseCustomOCRCheckbox = this.page
      .getByText("Custom OCR Configuration")
      .locator("flex-pricing-checks-overview")
      .locator("img.image-45");
  }

  async navigateToPricingPage(): Promise<void> {
    await this.page.goto("/pricing");
  }

  async getPackageNames(): Promise<string[]> {
    const packageNames = await this.packageNamesLocator.evaluateAll(
      (elements) => elements.map((el) => el.textContent?.trim() || "")
    );
    return [...new Set(packageNames)];
  }

  async getBookDemoLinks(): Promise<string[]> {
    const bookDemoLinks = await this.bookDemoLinksLocator.evaluateAll(
      (elements) => elements.map((el) => el.getAttribute("href") || "")
    );
    return [...new Set(bookDemoLinks)];
  }

  async isCustomOCRAvailableForEnterprise(): Promise<boolean> {
    const isThirdChild = await this.enterpriseCustomOCRCheckbox.evaluate(
      (img) => {
        return img === img.parentElement?.children[2];
      }
    );
    return isThirdChild;
  }
}
