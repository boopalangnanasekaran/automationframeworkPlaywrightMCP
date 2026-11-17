# Robust Playwright TypeScript Framework

A maintainable Playwright framework for Chromium and Firefox using Page Object Model, custom fixtures, structured logging, environment configuration, and failure artifacts.

## Setup

```bash
npm install
npm run install:browsers
cp .env.example .env
```

## Commands

- `npm test` — run all configured projects
- `npm run test:chromium` — run Chromium tests
- `npm run test:firefox` — run Firefox tests
- `npm run test:headed` — run headed tests
- `npm run test:parallel` — run with four workers
- `npm run test:debug` — open Playwright debugger
- `npm run test:ui` — open Playwright UI mode
- `npm run report` — view HTML report
- `npm run typecheck` — validate TypeScript
- `npm run lint` — run lint checks
- `npm run format` — format source files

## Structure

- `specs/` — executable test specifications
- `pages/` — Page Object Model classes
- `utils/` — reusable logger, locator, and test-data helpers
- `fixtures/` — shared Playwright fixtures
- `testdata/` — JSON test data
- `tests/` — general test-support files
- `results/html-report/` — HTML report
- `results/test-artifacts/` — traces, screenshots, and videos
- `results/junit-results.xml` — JUnit report

## Failure Handling

The configuration captures screenshots and videos only when tests fail, and retains traces. Logs include test titles, action steps, failure URLs, and original errors.

## Example Test

The OrangeHRM example logs in as Admin, opens PIM, creates a randomly named employee, and verifies that the employee's name is visible. Override credentials and base URL with `.env` variables.
