# DataSnipper Playwright E2E Testing Repository

This repository contains end-to-end (E2E) tests for the **DataSnipper** application. The tests are built using [Playwright](https://playwright.dev/) and structured to handle both **UI** and **API** testing. The project follows a modular design pattern for better scalability and maintainability.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Tests](#running-the-tests)
- [Key Features](#key-features)
- [Writing Tests](#writing-tests)
- [Contributing](#contributing)

---

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
1. Modular Structure: Separate directories for UI and API tests.
2. Page Object Model (POM): All UI elements and actions are encapsulated in `pages/`.
3. Data-Driven Tests: Test data is stored in JSON files under `data/`.
4. Utilities: Reusable helper functions under `utils/`.
5. Fixtures: Centralized setup and teardown logic in `fixtures/`.
6. Playwright Reporting: Automated HTML report generation for test runs.  