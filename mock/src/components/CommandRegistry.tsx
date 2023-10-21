import { REPLFunction } from "./REPLFunction";

export interface InputProps {
  commandString: string;
}

export const functionDictionary = new Map<string, REPLFunction>();



export function commandRegistry(props: InputProps) {
}

  
//First giving map pre-loaded commands
functionDictionary.set("load_file", load_file)
functionDictionary.set("view", view);
functionDictionary.set("search", search);




async function load_file(args: Array<string>): Promise<string> {
    const fetch1 = await fetch("http://localhost:4000" + "/load?filePath=" + args[1]);
    const json = await fetch1.json();
    return json
}

async function view(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:4000" + "/view");
  const json = await fetch1.json();
  return json;
}

async function search(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:4000" + "/search?target=" + args[2] +"&column=" + args[1] + "&header=" + args[3] 
  );
  const json = await fetch1.json();
  return json;
}

export function addToRegistry(command: string, replFunc: REPLFunction) {
    if(functionDictionary.get(command) === undefined){
        functionDictionary.set(command, replFunc);
    }
}