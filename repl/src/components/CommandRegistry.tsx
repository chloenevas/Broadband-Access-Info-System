import { REPLFunction } from "./REPLFunction";

/**
 * This map will be used to contain the REPLFunctions. Each key
 * is a name of a command that the user can search for, and the values
 * are functions implementing REPLFunction. 
 */
export var functionDictionary = new Map<string, REPLFunction>();

  
//First, the map is loaded with pre-registered commands.
functionDictionary.set("load_file", load_file)
functionDictionary.set("view", view);
functionDictionary.set("search", search);
functionDictionary.set("broadband", broadband);

/**
 * This function handles the load logic. It fetches promises from the backend
 * server based on the user input, then returns the data as a promise.
 * @param args user data from the input
 * @returns promise containing load result
 */
async function load_file(args: Array<string>): Promise<string> {
  const fetch1 = await fetch("http://localhost:8585" + "/load?filePath=" + args[0]);
  const json = await fetch1.json();


  const responseType = await json.type; // awaits indication of success or failure
  const details = await json.error_message; // awaits potential error message
  const path = await json.data; //awaits file path

  //If the response was successful, return a success message instead of the error
  if (responseType === "success") { 
    return responseType + " loading given file: " + path;
  }
  else {
    return details;
  }
}

/**
 * This function handles the view logic. It fetches promises from the backend
 * server based on the user input, then returns the data as a promise.
 * @param args 
 * @returns promise containing view result
 */
async function view(args: Array<string>): Promise<string> {
  const fetch1 = await fetch(
    "http://localhost:8585" + "/view");
  const json = await fetch1.json();
  const data = await json.data;
  const details = await json.details;
  
  //If no data could be retrieved, return an error message
  if (data === undefined) {
    return details
  }
  else return data;

}

/**
 * This function handles the search logic. It fetches promises from the backend
 * server based on the user input, then returns the data as a promise.
 * @param args user data from the input
 * @returns promise containing search result
 */
async function search(args: Array<string>): Promise<string> {
  var fetch1 = null;
  if (args.length == 1) { //checks for incorrect searches to properly await the error message
     fetch1 = await fetch(
    "http://localhost:8585" + "/search?target=" + args[0] +"&column=&header="
  );
  }
      if (args.length == 2) { // user did not include a column specification
     fetch1 = await fetch(
    "http://localhost:8585" + "/search?target=" + args[0] +"&column=&header=" + args[1] 
  );
  }
      else  { // length is 4 and user included column specification

      fetch1 = await fetch(
      "http://localhost:8585" + "/search?target=" + args[1] +"&column=" + args[0] + "&header=" + args[2]);
  }

  const json = await fetch1.json();
  const data = await json.data;
  const details = await json.details
  
  if (data === undefined) {
    return details
  }
  else return data;
}
  
/**
 * This function handles the broadband logic. It fetches promises from the backend
 * server based on the user input, then returns the data as a promise.
 * @param args user data from the input
 * @returns promise containing broadband result
 */
async function broadband(args: Array<string>): Promise<string> {

  const fetch1 = await fetch(
    "http://localhost:8585/broadband?state=" + args[1] + "&county=" + args[0]);
  const json = await fetch1.json();
  const data = await json.data;  
  const details = json.details;
  
  if (data === undefined) {
    return details
  }
  else return data; 
}

/**
 * This function can be used externally to add new commands to 
 * the registry without modifying existing code
 * */

export function addToRegistry(command: string, replFunc: REPLFunction) {
    if(functionDictionary.get(command) === undefined){
        functionDictionary.set(command, replFunc);
    }
}