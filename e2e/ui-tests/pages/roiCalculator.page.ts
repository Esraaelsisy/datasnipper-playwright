import { Page, Locator, FrameLocator } from "@playwright/test";

export class ROICalculatorPage {
  readonly page: Page;
  private frameSelector: string;
  private startCalculatingButtonName: string;
  private continueButtonName: string;
  private firstNamePlaceholder: string;
  private emailPlaceholder: string;
  private companyNamePlaceholder: string;
  private hearAboutUsPlaceholder: string;
  private successMessageText: string;
  private downloadReportButtonText: string;

  constructor(page: Page) {
    this.page = page;
    this.frameSelector =
      'iframe[title="External Audit - DataSnipper ROI Report"]';
    this.startCalculatingButtonName = "keyboard_backspace Start";
    this.continueButtonName = "Continue";
    this.firstNamePlaceholder = "Your name";
    this.emailPlaceholder = "you@business.com";
    this.companyNamePlaceholder = "e.g. Deloitte";
    this.hearAboutUsPlaceholder = "e.g. Linkedin";
    this.successMessageText = "Your personal ROI report is ready to download";
    this.downloadReportButtonText = "Download your ROI report";
  }

  private async getFrame(): Promise<FrameLocator> {
    const frame = this.page.frameLocator(this.frameSelector);
    if (!frame) {
      throw new Error("Unable to find the iframe or access its content.");
    }
    return frame;
  }

  async navigateToCalculator(): Promise<void> {
    await this.page.goto("/roi-calculator-external-audit");
  }

  async getStartCalculatingButton(): Promise<Locator> {
    const frame = await this.getFrame();
    const startCalculatingButton = frame.getByRole("button", {
      name: this.startCalculatingButtonName,
    });
    await startCalculatingButton.waitFor({ state: "visible" });
    return startCalculatingButton;
  }

  async clickStartCalculating(): Promise<void> {
    const startButton = await this.getStartCalculatingButton();
    await startButton.click();
  }

  async getQuestionText(question: string): Promise<string | null> {
    const frame = await this.getFrame();
    const questionText = frame.getByText(question);
    return questionText.textContent();
  }

  async answerInputQuestions(answer: string): Promise<void> {
    const frame = await this.getFrame();
    const answerInput = frame.getByRole("textbox");
    await answerInput.click();
    await answerInput.fill(answer);
    await answerInput.press("Enter");
  }

  async clickOnContinueButton(): Promise<void> {
    const frame = await this.getFrame();
    const continueButton = frame.getByRole("button", {
      name: this.continueButtonName,
    });
    if (await continueButton.isVisible()) {
      await continueButton.click();
    }
  }

  async answerCheckBoxQuestions(answer: string): Promise<void> {
    const frame = await this.getFrame();
    const checkBox = frame.locator("label").filter({ hasText: answer }).first();
    await checkBox.click();
  }

  async submitROIRequestInfo(
    firstName: string,
    email: string,
    companyName: string,
    hearAboutUs: string
  ): Promise<void> {
    const frame = await this.getFrame();

    const firstNameInput = frame.getByPlaceholder(this.firstNamePlaceholder);
    const emailInput = frame.getByPlaceholder(this.emailPlaceholder);
    const companyNameInput = frame.getByPlaceholder(
      this.companyNamePlaceholder
    );
    const hearAboutUsInput = frame.getByPlaceholder(
      this.hearAboutUsPlaceholder
    );

    await firstNameInput.fill(firstName);
    await emailInput.fill(email);
    await companyNameInput.fill(companyName);
    await hearAboutUsInput.click();

    const hearAboutUsOption = frame.getByText(hearAboutUs).first();
    await hearAboutUsOption.click();

    const submitButton = frame.getByRole("link", { name: "Submit" });
    await submitButton.click();
  }

  async getSuccessMessage(): Promise<Locator> {
    const frame = await this.getFrame();
    const successMessage = frame.getByText(this.successMessageText);
    await successMessage.waitFor({ state: "visible" });
    return successMessage;
  }

  async getDownloadReportButton(): Promise<Locator> {
    const frame = await this.getFrame();
    const downloadReportButton = frame.getByRole("link", {
      name: this.downloadReportButtonText,
    });
    await downloadReportButton.waitFor({ state: "visible" });
    return downloadReportButton;
  }
}
