import { test, expect } from "../fixtures/testSetup";
import roiData from "../data/roiCalculatorPage.data.json";
import { CookiesHelper } from "../utils/cookiesHelper";

test.describe("ROI Calculator Page Tests", () => {
  test("@TestCase2 : Validate Start Calculating button and first question", async ({
    pm,
  }) => {
    await test.step("Navigate to ROI Calculator Page", async () => {
      await pm.roiCalculatorPage.navigateToCalculator();
    });

    await test.step("Accept page cookies", async () => {
      await CookiesHelper.acceptPageCookies(pm.roiCalculatorPage.page);
    });

    await test.step("Validate the Start Calculating button is visible", async () => {
      expect(
        await pm.roiCalculatorPage.getStartCalculatingButton()
      ).toBeVisible();
    });

    await test.step("Click the Start Calculating button", async () => {
      await pm.roiCalculatorPage.clickStartCalculating();
    });

    await test.step("Validate the first question text", async () => {
      const firstQuestion = await pm.roiCalculatorPage.getQuestionText(
        roiData.questions.firstQuestion
      );
      expect(firstQuestion).toBe(roiData.questions.firstQuestion);
    });
  });

  test("@TestCase3 : Validate Answering the ROI calculator questions", async ({
    pm,
  }) => {
    await test.step("Navigate to ROI Calculator Page", async () => {
      await pm.roiCalculatorPage.navigateToCalculator();
    });

    await test.step("Accept page cookies", async () => {
      await CookiesHelper.acceptPageCookies(pm.roiCalculatorPage.page);
    });

    await test.step("Validate the Start Calculating button is visible", async () => {
      expect(
        await pm.roiCalculatorPage.getStartCalculatingButton()
      ).toBeVisible();
    });

    await test.step("Click the Start Calculating button", async () => {
      await pm.roiCalculatorPage.clickStartCalculating();
    });

    await test.step("Validate and answer the first question", async () => {
      console.log(`Validating question 1: ${roiData.questions.firstQuestion}`);
      const firstQuestion = await pm.roiCalculatorPage.getQuestionText(
        roiData.questions.firstQuestion
      );
      expect(firstQuestion).toBe(roiData.questions.firstQuestion);

      console.log(`Answering question 1: ${roiData.answers.firstAnswer}`);
      await pm.roiCalculatorPage.answerInputQuestions(
        roiData.answers.firstAnswer
      );
      pm.roiCalculatorPage.clickOnContinueButton();
    });

    await test.step("Validate and answer the second question", async () => {
      console.log(`Validating question 2: ${roiData.questions.secondQuestion}`);
      const secondQuestion = await pm.roiCalculatorPage.getQuestionText(
        roiData.questions.secondQuestion
      );
      expect(secondQuestion).toBe(roiData.questions.secondQuestion);

      console.log(`Answering question 2: ${roiData.answers.secondAnswer}`);
      await pm.roiCalculatorPage.answerInputQuestions(
        roiData.answers.secondAnswer
      );
    });

    // Dynamically handle questions 3 to 7
    const questionsAndAnswers = [
      {
        question: roiData.questions.thirdQuestion,
        answer: roiData.answers.thirdAnswer,
      },
      {
        question: roiData.questions.fourthQuestion,
        answer: roiData.answers.fourthAnswer,
      },
      {
        question: roiData.questions.fifthQuestion,
        answer: roiData.answers.fifthAnswer,
      },
      {
        question: roiData.questions.sixthQuestion,
        answer: roiData.answers.sixthAnswer,
      },
      {
        question: roiData.questions.seventhQuestion,
        answer: roiData.answers.seventhAnswer,
      },
    ];

    for (let i = 0; i < questionsAndAnswers.length; i++) {
      await test.step(`Validate and answer question ${i + 3}`, async () => {
        const currentQuestionText = questionsAndAnswers[i].question;
        const currentAnswer = questionsAndAnswers[i].answer;

        await test.step(`Validate question ${i + 3}`, async () => {
          console.log(`Validating question ${i + 3}: ${currentQuestionText}`);
          const currentQuestion = await pm.roiCalculatorPage.getQuestionText(
            currentQuestionText
          );
          expect(currentQuestion).toBe(currentQuestionText);
          console.log(`Question ${i + 3} validated successfully.`);
        });

        await test.step(`Answer question ${i + 3}`, async () => {
          console.log(`Answering question ${i + 3} with: ${currentAnswer}`);
          await pm.roiCalculatorPage.answerCheckBoxQuestions(currentAnswer);
          console.log(`Question ${i + 3} answered successfully.`);
        });
      });
    }
  });

  test("@TestCase4 : Validate Submitting a ROI calculator request", async ({
    pm,
  }) => {
    await test.step("Navigate to ROI Calculator Page", async () => {
      await pm.roiCalculatorPage.navigateToCalculator();
    });

    await test.step("Accept page cookies", async () => {
      await CookiesHelper.acceptPageCookies(pm.roiCalculatorPage.page);
    });

    await test.step("Validate the Start Calculating button is visible", async () => {
      expect(
        await pm.roiCalculatorPage.getStartCalculatingButton()
      ).toBeVisible();
    });

    await test.step("Click the Start Calculating button", async () => {
      await pm.roiCalculatorPage.clickStartCalculating();
    });

    await test.step("Validate and answer the first question", async () => {
      console.log(`Validating question 1: ${roiData.questions.firstQuestion}`);
      const firstQuestion = await pm.roiCalculatorPage.getQuestionText(
        roiData.questions.firstQuestion
      );
      expect(firstQuestion).toBe(roiData.questions.firstQuestion);

      console.log(`Answering question 1: ${roiData.answers.firstAnswer}`);
      await pm.roiCalculatorPage.answerInputQuestions(
        roiData.answers.firstAnswer
      );
      pm.roiCalculatorPage.clickOnContinueButton();
    });

    await test.step("Validate and answer the second question", async () => {
      console.log(`Validating question 2: ${roiData.questions.secondQuestion}`);
      const secondQuestion = await pm.roiCalculatorPage.getQuestionText(
        roiData.questions.secondQuestion
      );
      expect(secondQuestion).toBe(roiData.questions.secondQuestion);

      console.log(`Answering question 2: ${roiData.answers.secondAnswer}`);
      await pm.roiCalculatorPage.answerInputQuestions(
        roiData.answers.secondAnswer
      );
    });

    // Dynamically handle questions 3 to 7
    const questionsAndAnswers = [
      {
        question: roiData.questions.thirdQuestion,
        answer: roiData.answers.thirdAnswer,
      },
      {
        question: roiData.questions.fourthQuestion,
        answer: roiData.answers.fourthAnswer,
      },
      {
        question: roiData.questions.fifthQuestion,
        answer: roiData.answers.fifthAnswer,
      },
      {
        question: roiData.questions.sixthQuestion,
        answer: roiData.answers.sixthAnswer,
      },
      {
        question: roiData.questions.seventhQuestion,
        answer: roiData.answers.seventhAnswer,
      },
    ];

    for (let i = 0; i < questionsAndAnswers.length; i++) {
      await test.step(`Validate and answer question ${i + 3}`, async () => {
        const currentQuestionText = questionsAndAnswers[i].question;
        const currentAnswer = questionsAndAnswers[i].answer;

        await test.step(`Validate question ${i + 3}`, async () => {
          console.log(`Validating question ${i + 3}: ${currentQuestionText}`);
          const currentQuestion = await pm.roiCalculatorPage.getQuestionText(
            currentQuestionText
          );
          expect(currentQuestion).toBe(currentQuestionText);
          console.log(`Question ${i + 3} validated successfully.`);
        });

        await test.step(`Answer question ${i + 3}`, async () => {
          console.log(`Answering question ${i + 3} with: ${currentAnswer}`);
          await pm.roiCalculatorPage.answerCheckBoxQuestions(currentAnswer);
          console.log(`Question ${i + 3} answered successfully.`);
        });
      });
    }

    await test.step("Submit the ROI calculator request", async () => {
      console.log("Starting to submit ROI calculator request.");
      await pm.roiCalculatorPage.submitROIRequestInfo(
        roiData.submitInfo.firstName,
        roiData.submitInfo.businessEmail,
        roiData.submitInfo.companyName,
        roiData.submitInfo.hearAboutUs
      );
      console.log(
        `Submitted ROI request with: First Name = ${roiData.submitInfo.firstName}, Business Email = ${roiData.submitInfo.businessEmail}, Company Name = ${roiData.submitInfo.companyName}, How did you hear about us = ${roiData.submitInfo.hearAboutUs}`
      );
    });
    
    await test.step("Validate the ROI calculator request submission", async () => {
      console.log("Validating ROI calculator request submission.");
      const successMessage = await pm.roiCalculatorPage.getSuccessMessage();
      await expect(successMessage).toBeVisible();
      console.log("ROI calculator request submission validated successfully.");
    });
    
    await test.step("Validate ROI report downloading", async () => {
      console.log("Checking if ROI report download button is visible.");
      const downloadReportButton =
        await pm.roiCalculatorPage.getDownloadReportButton();
      await expect(downloadReportButton).toBeVisible();
      console.log("ROI report download button is visible and validated successfully.");
    });
  });
});
