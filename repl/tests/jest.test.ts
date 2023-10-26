import "@testing-library/jest-dom";
import {functionDictionary} from "../src/components/CommandRegistry";
import { addToRegistry } from "../src/components/CommandRegistry";
import { REPLFunction } from "../src/components/REPLFunction";

async function properMock(args: Array<string>): Promise<string> {
  return args[0]
}

async function replaceMock(args: Array<string>): Promise<string> {
  return args[1];
}

it("registers a new command and uses it in handler", ()=>{
    addToRegistry("grab_first", properMock);
    const command = ["First", "item", "should", "return"]

  expect(functionDictionary.get("grab_first")).toBeDefined();
  const grabFirstFunc =  functionDictionary.get("grab_first");

  if(grabFirstFunc !== undefined){
    grabFirstFunc(command).then(info => {
      expect(info).toBe("First");
    })
  }
  

})

it("will not work for non-registered commands", () => {
  expect(functionDictionary.get("bad_command")).toBeUndefined();
  const command = ["Should", "Not", "Return"];

  const grabBadFunc = functionDictionary.get("grab_first");

   if (grabBadFunc !== undefined) {
     grabBadFunc(command).then((info) => {
       expect(info).toBeUndefined;
     });
   }
  

});

it("will not replace current registered command", () => {
  addToRegistry("grab_first",replaceMock)
  const command = ["Should", "Not", "Return", "Should"];

  expect(functionDictionary.get("grab_first")).not.toEqual(replaceMock);
  expect(functionDictionary.get("grab_first")).toEqual(properMock);

  const grabBadFunc = functionDictionary.get("grab_first");

  if (grabBadFunc !== undefined) {
    grabBadFunc(command).then((info) => {
      expect(info).toBe("Should");
      expect(info).not.toBe("First");

    });
  }
});



