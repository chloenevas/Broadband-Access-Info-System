import { test, expect } from "@playwright/test";
import {
  TEXT_input_box,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "../src/components/constants";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("title is as expected", async ({ page }) => {
  await expect(page).toHaveTitle(/Mock/);
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("Awesome command");

  const mock_input = `Awesome command`;
  await expect(page.getByLabel(TEXT_input_box)).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await expect(page.getByRole("button")).toBeVisible();
});

test("button label is as expected", async ({ page }) => {
  await expect(page.getByRole("button")).toHaveText("Submit!");
});

