import { Page } from "playwright";

export class CookiesHelper {
  static async acceptPageCookies(page: Page) {
    const cookiePopup = page.locator("#hs-eu-cookie-confirmation");
    const acceptButton = page.locator("#hs-eu-confirmation-button");
    if (await cookiePopup.isVisible()) {
      await acceptButton.click();
      console.log("Cookies accepted.");
    } else {
      console.log("No cookie popup found.");
    }
  }
}
