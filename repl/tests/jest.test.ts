import "@testing-library/jest-dom";
import {functionDictionary} from "../src/components/CommandRegistry";
import { addToRegistry } from "../src/components/CommandRegistry";

async function properMock(args: Array<string>): Promise<string> {
  return args[0]
}

test("registers a new command", ()=>{
    addToRegistry("grab_first", properMock);

    expect(functionDictionary.get("grab_first")).toBeDefined();
    

})


