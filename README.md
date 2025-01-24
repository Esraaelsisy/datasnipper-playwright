# DataSnipper Playwright E2E Testing Repository

This repository contains end-to-end (E2E) tests for the **DataSnipper** application. The tests are built using [Playwright](https://playwright.dev/) and structured to handle both **UI** and **API** testing. The project follows a modular design patterns suach as Page Object Model and Data Driven Testing for better scalability and maintainability.


## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Tests](#running-the-tests)
- [Key Features](#key-features)
- [Test Coverage](#test-coverage)


## Project Structure

```bash
e2e/
├── api-tests/          # API test-related files
│   ├── api/            # API request classes
│   ├── data/           # Test data for API tests
│   ├── fixtures/       # API-specific fixtures
│   ├── tests/          # API test specifications
│   └── utils/          # Helper functions and utilities for API tests
├── ui-tests/           # UI test-related files
│   ├── data/           # Test data for UI tests
│   ├── fixtures/       # UI-specific fixtures
│   ├── pages/          # Page Object Models (POM) for UI tests
│   ├── specs/          # UI test specifications
│   └── utils/          # Helper functions and utilities for UI tests
├── .gitignore          # Ignored files and directories
├── package.json        # Node.js package manifest
├── package-lock.json   # Node.js dependency lock file
├── playwright.config.ts # Playwright configuration file
└── README.md           # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Playwright installed globally or in the project

### Steps to Set Up

1. Clone the repository:

   ```bash
   git clone https://github.com/Esraaelsisy/datasnipper-playwright.git
   ```

2. Navigate to the project directory:

   ```bash
   cd datasnipper-playwright
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Ensure Playwright browsers are installed:
   ```bash
   npm init playwright@latest
   ```

### Running the Tests

1. Run UI Tests

   ```bash
   npm run ui-tests
   ```

2. Run API Tests

   ```bash
   npm run api-tests
   ```

3. Run UI Tests in Headed Mode

   ```bash
   npx playwright test --headed -g ui-tests/specs --project=chromium
   ```

4. Generate Test Reports
   ```bash
   npx playwright show-report
   ```

### Key Features

1. **Modular Structure**  
   The repository is organized into distinct directories for UI and API tests, making it easy to manage and scale. Each directory has dedicated subfolders for:

   - **`data/`**: Stores test data in JSON format.
   - **`fixtures/`**: Contains setup and teardown logic for tests.
   - **`pages/`** (for UI tests): Implements the Page Object Model (POM) pattern.
   - **`tests/`**: Includes the actual test specifications.
   - **`utils/`**: Contains reusable helper functions to reduce code duplication.

2. **Page Object Model (POM)**  
   For UI tests, the POM design pattern is implemented to encapsulate all UI elements and actions into reusable classes in the `pages/` directory. This approach:

   - Promotes reusability of element locators and actions across multiple tests.
   - Simplifies maintenance by centralizing UI-related changes in one place.
   - Improves code readability by separating test logic from page interaction logic.

3. **Data-Driven Tests**  
   All test data, such as input values, expected outputs, and configurations, is stored in JSON files under the `data/` directory. This design:

   - Enables dynamic test execution with different data sets.
   - Makes the tests flexible and easy to update without modifying test logic.
   - Supports the separation of test logic and test data for better maintainability.

4. **Utilities**  
   The `utils/` directory contains reusable helper functions for common operations, such as:

   - API request builders.
   - Response validation.
   - Cookie handling.
   - Utility methods to simplify repetitive tasks in both UI and API tests.
     This promotes cleaner test files and reduces redundancy across the codebase.

5. **Fixtures**  
   Centralized fixtures provide consistent setup and teardown logic for tests. This includes:

   - Creating browser contexts and pages for UI tests.
   - Initializing API clients with base configurations for API tests.
   - Managing preconditions and cleanups like cookie handling or test environment resets.
     Fixtures improve test reliability and reduce duplication of setup logic.

6. **Playwright Reporting**  
   The repository leverages Playwright's built-in reporting capabilities to generate detailed HTML reports after test runs. Features of the reporting include:
   - A summary of passed, and failed tests.
   - Detailed trace logs, screenshots, and videos for debugging failed tests.
   - Easy navigation to identify issues in the test run.
     These reports are auto-generated and stored in the `playwright-report/` directory for later analysis.

## Test Coverage

This repository includes comprehensive test coverage for both **UI** and **API** functionalities of the DataSnipper application. Below is an overview of the covered features:

### UI Test Coverage

1. **ROI Calculator Page**:

   - Navigation to the ROI Calculator page.
   - Acceptance of cookies.
   - Validation of the "Start Calculating" button's visibility and functionality.
   - Validation of all questions on the ROI calculator, including:
     - Input-based questions.
     - Checkbox-based questions.
   - Submission of the ROI calculator request form with:
     - First Name.
     - Business Email.
     - Company Name.
     - "How did you hear about us?" selection.
   - Validation of the success message after submission.
   - Validation of the "Download ROI Report" button visibility.

2. **Pricing Page**:
   - Navigation to the Pricing page.
   - Validation of package names displayed (e.g., Basic, Professional, Enterprise).
   - Validation of "Book Demo" links for each package.
   - Validation that the Enterprise package contains "Custom OCR Configuration" and that its checkbox is positioned correctly.

### API Test Coverage

1. **Films API**:

   - Fetching film details by title.
   - Validation of planets associated with a specific film.
   - Fetching planet details and verifying planet names.

2. **People API**:

   - Fetching all people and validating the total count.
   - Fetching a person by ID and validating their:
     - Name.
     - Vehicles and associated speeds.

3. **Planets API**:
   - Fetching all planets and validating the total count.
   - Fetching a planet by ID and verifying:
     - Diameter.
     - Residents and their details (e.g., name).

---

### How to Add Coverage

1. **UI Tests**:

   - Add new test cases in the `ui-tests/specs/` directory.
   - Add corresponding page methods in the `ui-tests/pages/` directory.

2. **API Tests**:
   - Add new test cases in the `api-tests/tests/` directory.
   - Add corresponding API request logic in the `api-tests/api/` directory.
---