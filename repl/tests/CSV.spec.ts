import { test, expect } from "@playwright/test";
import {
  HISTORY_accessible_name,
  TEXT_input_box,
} from "../src/components/constants";
import "../src/components/data/mockedJson";
import { mainSearchDict } from "../src/components/data/mockedJson";

test.beforeEach(async ({ page }) => {
  // start backend here

  await page.goto("http://localhost:8000/");
});

test("trying to view without loading a file produces an error", async ({
  page,
}) => {
  await page.getByLabel("enter command").click();
  await page.getByLabel("enter command").fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(page.getByLabel(HISTORY_accessible_name)).toHaveText(
    "You must first load a file to view it. Try loading first."
  );
});

test("after loading a valid file, the response is success", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/income_by_race_edited.csv"
    );

  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace", { timeout: 100000 });

  await expect(page.getByLabel(HISTORY_accessible_name)).toHaveText("success");
});

test("after loading an invalid file, the response is failure", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("load_file notFilePath");

  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(page.getByLabel(HISTORY_accessible_name)).toHaveText(
    'Please check that a valid file path has been given. "notFilePath" is incorrect.'
  );
});

test("trying to view without loading a file and then loading one and calling view", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(
    page.getByText("You must first load a file to view it. Try loading first.")
  ).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await expect(page.getByText("success")).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: '"116,321.00"' })).toBeVisible();
});

test("verbose: switching to verbose mode and calling view & load", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mode");
  await page.getByRole("button").click();
  await expect(page.getByText("mode", {exact: true})).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(page.getByText("Command: view")).toBeVisible();
  await expect(
    page.getByText(
      "Output: You must first load a file to view it. Try loading first."
    )
  ).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
    await page.waitForSelector(".historySpace");

  await expect(
    page.getByText(
      "Command: load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    )
  ).toBeVisible();
  await expect(page.getByText("Output: success")).toBeVisible();
});

test("trying to search without loading a file", async ({ page }) => {
  await page.getByLabel("enter command").click();
  await page.getByLabel("enter command").fill("search Bristol true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(
    page.getByText("You must first load a file to view it. Try loading first.")
  ).toBeVisible();
});

test("trying to search without loading a file and then loading one and calling search - NO COL ID", async ({
  page,
}) => {
  await page.getByLabel("enter command").click();
  await page.getByLabel(TEXT_input_box).fill("search Bristol true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(
    page.getByText("You must first load a file to view it. Try loading first.")
  ).toBeVisible();

  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search Bristol true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(page.getByRole("cell", { name: "Bristol" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"80,727.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"115,740.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"42,658.00"' })).toBeVisible();
});

test("verbose, trying to search without loading a file and then loading one and calling search - NO COL ID", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mode");
  await page.getByRole("button").click();
  await expect(page.getByText("mode", { exact: true })).toBeVisible();

  await page.getByLabel("enter command").click();
  await page.getByLabel(TEXT_input_box).fill("search Bristol true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(page.getByText("Command: search Bristol true")).toBeVisible();
  await expect(
    page.getByText(
      "Output: You must first load a file to view it. Try loading first."
    )
  ).toBeVisible();

  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search Bristol true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(page.getByRole("cell", { name: "Bristol" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"80,727.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"115,740.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"42,658.00"' })).toBeVisible();
});

test("if I search 'Bristol' with column ID, I get the correct result", async ({
  page,
}) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search 0 Bristol true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  await expect(page.getByRole("cell", { name: "Bristol" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"80,727.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"115,740.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"42,658.00"' })).toBeVisible();
});

test("if I search 'Bristol' with column name, I get the correct result", async ({
  page,
}) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search City/Town Bristol true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  
  await expect(page.getByRole("cell", { name: "Bristol" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"80,727.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"115,740.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"42,658.00"' })).toBeVisible();
});

test("if I search '95,198.00' with column header 'Median family income', I get the correct result", async ({
  page,
}) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill('search median_family_income "95,198.00" true');
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");


  
});

test("if I search '95,198.00' with column header 'city/town', I get the correct result", async ({
  page,
}) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill('search city/town "95,198.00" true');
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");

  const resultText = await page.evaluate(() => {
    // gets first element that matches .historySpace
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(resultText).toContain("No results were found");
});

test("if I search an index bigger than the number of header elements I get an error message", async ({
  page,
}) => {
  await page.getByLabel("enter command").click();
  await page
    .getByLabel("enter command")
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill('search 10 "95,198.00" true');
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  const resultText = await page.evaluate(() => {
    // gets first element that matches .historySpace
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(resultText).toContain("No results were found");
});

test("if I load a file with a header and then view, I get the correct table", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/short_testing_header.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "State Data Type Average Weekly Earnings Number of Workers Earnings Disparity Employed Percent",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: 'RI White " $1,058.47 " 395773.6521  $1.00  75%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", { name: "RI Black $770.26 30424.80376 $0.73 6%" })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Native American/American Indian $471.07 2315.505646 $0.45 0%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: 'RI Asian-Pacific Islander " $1,080.09 " 18956.71657 $1.02 4%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Hispanic/Latino $673.14 74596.18851 $0.64 14%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Multiracial $971.89 8883.049171 $0.92 2%",
    })
  ).toBeVisible();
});

test("if I load a file without a header and then view, I get the correct table", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/short_testing_no_header.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();

  await expect(
    page.getByRole("row", {
      name: "State Data Type Average Weekly Earnings Number of Workers Earnings Disparity Employed Percent",
    })
  ).not.toBeVisible();

  await expect(
    page.getByRole("row", {
      name: 'RI White " $1,058.47 " 395773.6521  $1.00  75%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", { name: "RI Black $770.26 30424.80376 $0.73 6%" })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Native American/American Indian $471.07 2315.505646 $0.45 0%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: 'RI Asian-Pacific Islander " $1,080.09 " 18956.71657 $1.02 4%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Hispanic/Latino $673.14 74596.18851 $0.64 14%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Multiracial $971.89 8883.049171 $0.92 2%",
    })
  ).toBeVisible();
});

test("if I load a file without a header and call mode, then view, I get the correct table", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/short_testing_no_header.csv"
    );
  await page.getByRole("button").click();
  await expect(
    page.getByTitle("verbose").getByText("Output:")
  ).not.toBeVisible();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mode");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();

  await expect(
    page.getByRole("row", {
      name: "State Data Type Average Weekly Earnings Number of Workers Earnings Disparity Employed Percent",
    })
  ).not.toBeVisible();

  await expect(
    page.getByRole("row", {
      name: 'RI White " $1,058.47 " 395773.6521  $1.00  75%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", { name: "RI Black $770.26 30424.80376 $0.73 6%" })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Native American/American Indian $471.07 2315.505646 $0.45 0%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: 'RI Asian-Pacific Islander " $1,080.09 " 18956.71657 $1.02 4%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Hispanic/Latino $673.14 74596.18851 $0.64 14%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Multiracial $971.89 8883.049171 $0.92 2%",
    })
  ).toBeVisible();
});

test("I can load + view and then repeat with a different file", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(
    page.getByText("You must first load a file to view it. Try loading first.")
  ).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await expect(page.getByText("success")).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  await expect(page.getByRole("cell", { name: '"116,321.00"' })).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/short_testing_no_header.csv"
    );
  await page.getByRole("button").click();
  await expect(
    page.getByTitle("verbose").getByText("Output:")
  ).not.toBeVisible();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mode");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(
    page.getByRole("row", {
      name: "State Data Type Average Weekly Earnings Number of Workers Earnings Disparity Employed Percent",
    })
  ).not.toBeVisible();

  await expect(
    page.getByRole("row", {
      name: 'RI White " $1,058.47 " 395773.6521  $1.00  75%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", { name: "RI Black $770.26 30424.80376 $0.73 6%" })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Native American/American Indian $471.07 2315.505646 $0.45 0%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: 'RI Asian-Pacific Islander " $1,080.09 " 18956.71657 $1.02 4%',
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Hispanic/Latino $673.14 74596.18851 $0.64 14%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("row", {
      name: "RI Multiracial $971.89 8883.049171 $0.92 2%",
    })
  ).toBeVisible();
});

test("I can load + search and then repeat with a different file", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search Rhode_Island true");
  await page.getByRole("button").click();

  await expect(page.getByRole("cell", { name: "Rhode Island" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"74,489.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"95,198.00"' })).toBeVisible();
  await expect(page.getByRole("cell", { name: '"39,603.00"' })).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/repl/src/components/data/singleColumn.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search this true");
  await page.getByRole("button").click();

  await expect(page.getByRole("row", { name: "this" })).toBeVisible();
});

test("I cannot search from a different unloaded file (even if it exists in the data)", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/RI_data.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search White true");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  const resultText = await page.evaluate(() => {
    // gets first element that matches .historySpace
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(resultText).toContain("No results were found");
});

test("searching for a nonexistent value produces an error", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/short_testing_header.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search happiness true");
  await page.getByRole("button").click();

  const resultText = await page.evaluate(() => {
    // gets first element that matches .historySpace
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(resultText).toContain("No results were found");
});

test("Searching a single column csv produces the expected result", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/singleColumn.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search this true");
  await page.getByRole("button").click();

  await expect(page.getByRole("cell", { name: "this" })).toBeVisible();
});
