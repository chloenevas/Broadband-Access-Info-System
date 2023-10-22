import { REPLFunction } from "./REPLFunction";

export interface InputProps {
  commandString: string;
}

export var functionDictionary = new Map<string, REPLFunction>();

  
//First giving map pre-loaded commands
functionDictionary.set("load_file", load_file)
functionDictionary.set("view", view);
functionDictionary.set("search", search);
functionDictionary.set("broadband", broadband);




async function load_file(args: Array<string>): Promise<string> {
  const fetch1 = await fetch("http://localhost:4000" + "/load?filePath=" + args[1]);
    const json = await fetch1.json();
  const data = await json.type;
    return data;
}

async function view(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:4000" + "/view");
  const json = await fetch1.json();
  const data = await json.data;
  return data;

}

async function search(args: Array<string>): Promise<string> {
  var fetch1 = null;
      if (args.length == 3) { // user did not include a column specification
     fetch1 = await fetch(
    "http://localhost:4000" + "/search?target=" + args[1] +"&column=&header=" + args[2] 
  );
  }
      else { // length is 4 and user included column specification

      fetch1 = await fetch(
      "http://localhost:4000" + "/search?target=" + args[2] +"&column=" + args[1] + "&header=" + args[3]);
  }


  const json = await fetch1.json();
    const data = await json.data;
  return data;
}
  
async function broadband(args: Array<string>): Promise<string> {

  const fetch1 = await fetch(
    "http://localhost:1234/broadband?state=" + args[2] + "&county=" + args[1]);
  const json = await fetch1.json();
  console.log(json)
  const data = await json.data;
  const result = await json.result;
  const details = await json.details;
  const output: string[] = []
  output.push(result)
  return data; 
}

export function addToRegistry(command: string, replFunc: REPLFunction) {
    if(functionDictionary.get(command) === undefined){
        functionDictionary.set(command, replFunc);
    }
}