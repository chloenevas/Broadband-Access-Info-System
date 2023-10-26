import "@testing-library/jest-dom";
import {functionDictionary} from "../src/components/REPL/CommandRegistry";
import { addToRegistry } from "../src/components/REPL/CommandRegistry";

/**This is a basic function that implements REPLFunction to be used for proper registry. It returns
 * the first element from the array.
 * */
async function properMock(args: Array<string>): Promise<string> {
  return args[0]
}
/**This is a basic function that will be used to attempt replacing the properMock function.
 * */

async function replaceMock(args: Array<string>): Promise<string> {
  return args[1];
}

/**
 * This test checks that a new command can be successfully registered and used.
 */
it("registers a new command and uses it in handler", ()=>{
    addToRegistry("grab_first", properMock);
    const command = ["First", "item", "should", "return"]

  expect(functionDictionary.get("grab_first")).toBeDefined(); //Checks that it should be added to map
  const grabFirstFunc =  functionDictionary.get("grab_first");

  if(grabFirstFunc !== undefined){ //Promise should contain the correct data in its response
    grabFirstFunc(command).then(info => {
      expect(info).toBe("First");
    })
  }
  

})

it("will not work for non-registered commands", () => {
  expect(functionDictionary.get("bad_command")).toBeUndefined(); //Map would not have undefined command
  const command = ["Should", "Not", "Return"];

  const grabBadFunc = functionDictionary.get("grab_first");

   if (grabBadFunc !== undefined) {//Promise should not give any data for unregistered command
     grabBadFunc(command).then((info) => {
       expect(info).toBeUndefined;
     });
   }
  

});
/**
 * This test checks that a command with the same name as a previous one will not
 * replace the function of the previous
 */

it("will not replace current registered command", () => {
  addToRegistry("grab_first", replaceMock); //Attempt to register command with exact name as one already in map
  const command = ["Should", "Not", "Return", "Should"];

  //Checks that the function should still be the same
  expect(functionDictionary.get("grab_first")).not.toEqual(replaceMock);
  expect(functionDictionary.get("grab_first")).toEqual(properMock);

  const grabBadFunc = functionDictionary.get("grab_first");

  //Data should still behave as if retrieved according to first function
  if (grabBadFunc !== undefined) {
    grabBadFunc(command).then((info) => {
      expect(info).toBe("Should");
      expect(info).not.toBe("First");
    });
  }
});



