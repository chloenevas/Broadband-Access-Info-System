import { test, expect } from "@playwright/test";
import {
  HISTORY_accessible_name,
  TEXT_input_box,
} from "../src/components/constants";
import "../src/components/mocking/mockedJson";
import { REPLInput } from "../src/components/REPL/REPLInput";
import { mainSearchDict } from "../src/components/mocking/mockedJson";

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

test("MOCKED:after loading an invalid file, the response is failure", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/singleColumn.csv"
    );
  await page.getByRole("button").click();

  await expect(
    page.getByText(
      'Please check that a valid file path has been given. "/Users/chloenevas/Documents/CS32/repl-cnevas-kwalke19/server/src/main/java/edu/brown/cs/student/main/data/csv/singleColumn.csv" is incorrect.'
    )
  ).toBeVisible();
});

test("MOCKED: trying to view without loading a file and then loading one and calling view", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  var output = await page.evaluate(() => {
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(output).toBe("mockNo Files Have Been Parsed");

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  output = await page.evaluate(() => {
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(output).not.toBe("No Files Have Been Parsed");
});

test("verbose: switching to verbose mode and calling view & load", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mode");
  await page.getByRole("button").click();
  await expect(page.getByText("mode", { exact: true })).toBeVisible();

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

test("MOCKED: verbose, trying to search without loading a file and then loading one and calling search", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search white");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  var output = await page.evaluate(() => {
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(page.getByText("Please Load a File First!")).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
    );
  await expect(
    page.getByTitle("verbose").getByText("Output:")
  ).not.toBeVisible();

  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mode");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search white");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  output = await page.evaluate(() => {
    return document.querySelector(".historySpace")?.textContent;
  });

  await expect(page.getByTitle("verbose").getByText("Output:")).toBeVisible();

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "ri" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "white" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '" $1,058.47 "' })).toBeVisible();
  await expect(page.getByRole("cell", { name: "395773.6521" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "$1.00" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "75%" })).toBeVisible();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mode");
  await page.getByRole("button").click();
  output = await page.evaluate(() => {
    return document.querySelector(".historySpace")?.textContent;
  });
  expect(output).not.toContain("Output: mode");
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

test("MOCKED: if I search 'white' with column header 'data type', I get the correct result", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill('search "data type" white');
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "ri" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "white" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '" $1,058.47 "' })).toBeVisible();
  await expect(page.getByRole("cell", { name: "395773.6521" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "$1.00" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "75%" })).toBeVisible();
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

test("MOCKED if I load a file with a header and then view, I get the correct table", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
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

test("MOCKED: if I load a file without a header and then view, I get the correct table", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/stars.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();

  await expect(page.getByRole("row", { name: "0 Sol 0 0 0" })).toBeVisible;
  await expect(page.getByRole("row", { name: "1 282.43485 0.00449 5.36884" }))
    .toBeVisible;
  await expect(page.getByRole("row", { name: "2 43.04329 0.00285 -15.24144" }))
    .toBeVisible;
  await expect(page.getByRole("row", { name: "3 277.11358 0.02422 223.27753" }))
    .toBeVisible;
  await expect(
    page.getByRole("row", { name: "3759 96 G. Psc 7.26388 1.55643 0.68697" })
  ).toBeVisible;
  await expect(
    page.getByRole("row", {
      name: "70667 Proxima Centauri -0.47175 -0.36132 -1.15037",
    })
  ).toBeVisible;
  await expect(
    page.getByRole("row", {
      name: "71454 Rigel Kentaurus B -0.50359 -0.42128 -1.1767",
    })
  ).toBeVisible;
  await expect(
    page.getByRole("row", {
      name: "71457 Rigel Kentaurus A -0.50362 -0.42139 -1.17665",
    })
  ).toBeVisible;
  await expect(
    page.getByRole("row", {
      name: "87666 Barnard's Star -0.01729 -1.81533 0.14824",
    })
  ).toBeVisible;
  await expect(
    page.getByRole("row", { name: "118721 -2.28262 0.64697 0.20354" })
  ).toBeVisible;
});

test("I can load + view and then repeat with a different file", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(
    page.getByRole("row", {
      name: "State Data Type Average Weekly Earnings Number of Workers Earnings Disparity Employed Percent",
    })
  ).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/stars.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(page.getByRole("row", { name: "0 Sol 0 0 0" })).toBeVisible;
});

test("MOCKED: I can load + search and then repeat with a different file", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search 1 white");
  await page.getByRole("button").click();

  await expect(page.getByRole("cell", { name: "ri" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "white" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '" $1,058.47 "' })).toBeVisible();
  await expect(page.getByRole("cell", { name: "395773.6521" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "$1.00" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "75%" })).toBeVisible();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/stars.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search 2 0");
  await page.getByRole("button").click();

  await expect(page.getByRole("row", { name: "0 Sol 0 0 0" })).toBeVisible;
});

test("MOCKED: I cannot search from a different unloaded file (even if it exists in the data)", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();

  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/stars.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search White");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  const resultText = await page.evaluate(() => {
    // gets first element that matches .historySpace
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(resultText).toContain("No results were found");
});

test("MOCKED: searching for a nonexistent value produces an error", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("mock");
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
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
