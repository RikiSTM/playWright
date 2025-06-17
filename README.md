# 🎭 Playwright Automation Sample with GitLab CI/CD

This repository contains a sample implementation of **Playwright end-to-end tests** integrated with **GitLab CI/CD** pipelines.

The test suite uses the **Page Object Model (POM)** structure for better maintainability and scalability. During the CI/CD process, the web application is started locally, and Playwright launches, connects to the running instance, and performs automated assertions.

---

## 🚀 Features

- ✅ E2E testing using [Playwright](https://playwright.dev)
- ✅ Structured with **Page Object Model (POM)**
- ✅ CI/CD pipeline using **GitLab Actions**
- ✅ Web server is auto-launched in pipeline before tests
- ✅ Local server port exposed and tested inside pipeline
- ✅ Headless test execution and result output

---

## 🧪 How It Works (CI/CD)

1. GitLab CI starts the pipeline.
2. Web application is started on a local port (e.g., `http://localhost:3000`).
3. Playwright waits for the app to be available.
4. Playwright runs the tests using the POM structure.
5. Test results are printed in the CI logs (optionally saved as artifacts).


