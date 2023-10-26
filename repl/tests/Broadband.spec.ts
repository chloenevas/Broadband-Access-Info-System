import "../src/components/CommandRegistry";
import { test, expect } from "@playwright/test";
import "../src/components/mocking/mockedJson";


test.beforeEach(async ({ page }) => {
  // start backend here

  await page.goto("http://localhost:8000/");
});

test("testing broadband with providence", async ({ page }) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill("broadband Providence+County Rhode+Island");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "85.4" })).toBeVisible();
});

test("MOCKED: testing broadband with new york", async ({ page }) => {
  await page.getByLabel("enter command").click();
  await page.getByLabel("enter command").fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill("broadband New+York+County New+York");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "83.9" })).toBeVisible();
});

test("testing broadband with invalid county/state", async ({ page }) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill("broadband Old+Mint+County Old+Mint");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(
    page.getByText("unexpected: API connection not success status null")
  ).toBeVisible();
});

test("testing broadband with no county or state entered", async ({ page }) => {
  await page.getByLabel("enter command").click();
  await page.getByLabel("enter command").fill("broadband");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(
    page.getByText("unexpected: API connection not success status null")
  ).toBeVisible();
});

test("testing broadband after testing load and then testing view", async ({ page }) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(page.getByText("success")).toBeVisible();

 await page.getByLabel("enter command").click();
 await page
   .getByLabel("enter command")
   .fill(
     "broadband Providence+County Rhode+Island"
   );
 await page.getByRole("button").click();
 await page.waitForSelector(".historySpace");
await expect(page.getByRole("cell", { name: "85.4" })).toBeVisible();

  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "view"
    );
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(page.getByRole("cell", { name: '"115,740.00"' })).toBeVisible();  
});
