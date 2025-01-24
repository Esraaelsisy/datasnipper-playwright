import { Page } from "@playwright/test";
import { PricingPage } from "./pricing.page";
import { ROICalculatorPage } from "./roiCalculator.page";

export class PageManager {
  private page: Page;
  pricingPage: PricingPage;
  roiCalculatorPage: ROICalculatorPage;

  constructor(page: Page) {
    this.page = page;
    this.pricingPage = new PricingPage(this.page);
    this.roiCalculatorPage = new ROICalculatorPage(this.page);
  }
}
