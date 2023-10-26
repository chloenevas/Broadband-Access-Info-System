import { type } from "os";
import { REPLFunction } from "./REPLFunction";

export interface InputProps {
  commandString: string;
}

export var functionDictionary = new Map<string, REPLFunction>();
var sessionId = Math.floor((Math.random() * 100000));
var mock: Boolean = false;

  
//First giving map pre-loaded commands
functionDictionary.set("load_file", load_file)
functionDictionary.set("view", view);
functionDictionary.set("search", search);
functionDictionary.set("broadband", broadband);


async function load_file(args: Array<string>): Promise<string> {
  const fetch1 = await fetch("http://localhost:8585" + "/load?sessionID=" + sessionId + "&filePath=" + args[0]);
  const json = await fetch1.json();
  const responseType = await json.type;
  const details = await json.error_message;
  if (responseType === "success") {
    return responseType;
  }
  else {
    return details
  }
}

async function view(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:8585" + "/view?sessionID=" + sessionId);
  const json = await fetch1.json();
  const data = await json.data;
  const details = await json.details;

  if (data === undefined) {
    return details
  }
  else return data;

}

async function search(args: Array<string>): Promise<string> {
  var fetch1 = null;
  if (args.length == 1) {
     fetch1 = await fetch(
    "http://localhost:8585" + "/search?sessionID=" + sessionId + "&target=" + args[0] +"&column=&header="
  );
  }
      if (args.length == 2) { // user did not include a column specification
     fetch1 = await fetch(
    "http://localhost:8585" + "/search?sessionID=" + sessionId + "&target=" + args[0] +"&column=&header=" + args[1] 
  );
  }
      else  { // length is 4 and user included column specification

      fetch1 = await fetch(
      "http://localhost:8585" + "/search?sessionID=" + sessionId + "&target=" + args[1] +"&column=" + args[0] + "&header=" + args[2]);
  }

  const json = await fetch1.json();
  const data = await json.data;
  const details = await json.details
  
  if (data === undefined) {
    return details
  }
  else return data;
}
  
async function broadband(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:8585/broadband?state=" + args[1] + "&county=" + args[0]);
  const json = await fetch1.json();
  const data = await json.data;  
  const details = json.details;
  // console.log(typeof(data))
  if (data === undefined) {
    return details
  }
  else return data; 
}

export function addToRegistry(command: string, replFunc: REPLFunction) {
    if(functionDictionary.get(command) === undefined){
        functionDictionary.set(command, replFunc);
    }
    else {
      return command + " already exists in the registry"
  }
}

