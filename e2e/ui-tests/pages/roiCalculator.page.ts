import { Page, FrameLocator } from "@playwright/test";

export class ROICalculatorPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCalculator() {
    await this.page.goto("/roi-calculator-external-audit");
  }

  async getFrame() {
    const frameElementHandle = await this.page.waitForSelector(
      'iframe[title="External Audit - DataSnipper ROI Report"]'
    );
    const frame = await frameElementHandle.contentFrame();
    if (!frame) {
      throw new Error("Unable to find the iframe or access its content.");
    }
    return frame;
  }

  async getStartCalculatingButton() {
    const frame = await this.getFrame();
    const startCalculatingButton = frame.getByRole("button", {
      name: "keyboard_backspace Start",
    });
    await startCalculatingButton.waitFor({ state: "visible" });
    return startCalculatingButton;
  }

  async clickStartCalculating() {
    await (await this.getStartCalculatingButton()).click();
    console.log("Clicked Start Calculating button.");
  }

  async getQuestionText(question: string) {
    const frame = await this.getFrame();
    const questionText = frame.getByText(question);
    return questionText.textContent();
  }

  async answerInputQuestions(answer: string) {
    const answerInput = (await this.getFrame()).getByRole("textbox");
    await answerInput.click();
    await answerInput.fill(answer);
    await answerInput.press("Enter");
  }
  async clickOnContinueButton() {
    const continueButton = (await this.getFrame()).getByRole("button", {
      name: "Continue",
    });
    if ((await continueButton.isVisible())) {
      await continueButton.click();
    }
  }

  async answerCheckBoxQuestions(answer: string) {
    const answerCheckBox = (await this.getFrame())
      .locator("label")
      .filter({ hasText: answer })
      .first();
    await answerCheckBox.click();
  }

  async submitROIRequestInfo(
    firstName: string,
    email: string,
    companyName: string,
    hearAboutUs: string
  ) {
    const firstNameInput = (await this.getFrame()).getByPlaceholder(
      "Your name"
    );
    await firstNameInput.fill(firstName);
    const emailInput = (await this.getFrame()).getByPlaceholder(
      "you@business.com"
    );
    await emailInput.fill(email);
    const companyNameInput = (await this.getFrame()).getByPlaceholder(
      "e.g. Deloitte"
    );
    await companyNameInput.fill(companyName);
    const hearAboutUsInput = (await this.getFrame()).getByPlaceholder(
      "e.g. Linkedin"
    );
    await hearAboutUsInput.click();
    const hearAboutUsOption = (await this.getFrame())
      .getByText(hearAboutUs)
      .first();
    await hearAboutUsOption.click();
    const submitButton = (await this.getFrame()).getByRole("link", {
      name: "Submit",
    });
    await submitButton.click();
  }

  async getSuccessMessage() {
    const frame = await this.getFrame();
    const successMessage = frame.getByText(
      "Your personal ROI reportis ready to download"
    );
    await successMessage.waitFor({ state: "visible" });
    return successMessage;
  }

  async getDownloadReportButton() {
    const frame = await this.getFrame();
    const downloadReportButton = frame.getByRole("link", {
      name: "Download your ROI report",
    });
    await downloadReportButton.waitFor({ state: "visible" });
    return downloadReportButton;
  }
}
