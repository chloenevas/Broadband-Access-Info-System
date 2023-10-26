import "@testing-library/jest-dom";
import {functionDictionary} from "../src/components/CommandRegistry";
import { addToRegistry } from "../src/components/CommandRegistry";

async function registry_test(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:8585/registryTest?value=" + args[0]
  );
  const json = await fetch1.json();
  const responseType = await json.type;
  const result = await json.data;
  const details = await json.error_message;
  if (responseType === "success") {
    return result;
  } else {
    return details;
  }
}

async function view(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:8585" + "/view");
  const json = await fetch1.json();
  const data = await json.data;
  const details = await json.details;

  if (data === undefined) {
    return details;
  } else return data;
}

test("registers a new command", async () => {
  addToRegistry("registry_test", registry_test);

  const replFunc = functionDictionary.get("registry_test");

  expect(replFunc).toBeDefined();

  if (replFunc !== undefined) {
    return replFunc(["hey!"]).then((info: string) => {
      expect(info).toBe("hey!");
    });
  }
});

test("trying to register an already registered command", async () => {
  addToRegistry("view", view);
 expect(addToRegistry("view", view)).toBe("view already exists in the registry")
});

test("load command", async () => {

  const replFunc = functionDictionary.get("load_file");

  expect(replFunc).toBeDefined();

  // NOT WORKING RN 
  if (replFunc !== undefined) {
    return replFunc([
      "asdfadv",
    ]).then((info: string) => {
      expect(info).toBe("File not loaded");
    });
    
  }
});

test("view command", async () => {
  const replFunc = functionDictionary.get("view");

  expect(replFunc).toBeDefined();

  // FINISH
});

test("search command", async () => {
  const replFunc = functionDictionary.get("search");

  expect(replFunc).toBeDefined();

  // FINISH
});