import React, { Dispatch, SetStateAction } from "react";
import { functionDictionary } from "../CommandRegistry";


export interface InputProps {
  history: (string | string[][])[]; //contains results of different commands and any corresponding labels
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>; 
  commandString: string; //user input
  scrollHistoryToBottom: () => void;
}
/**
 * HandlerClass is responsible for handling user input commands in a REPL (Read-Eval-Print Loop) environment.
 * It can parse, execute, and provide command history in both brief and verbose modes.
 */
export class HandlerClass {
  /**
   * A boolean flag that represents whether the application is in brief mode (true) or verbose mode (false).
   */
  brief: Boolean = true;
  /**
   * Creates an instance of the HandlerClass.
   */
  constructor() {}


  /**
   * Handles the user's input command and manages the application's behavior based on the command.
   * @param history - An array of strings or string arrays representing the command history.
   * @param setHistory - A function to set the command history state.
   * @param commandString - The user's input command string.
   * @param scrollHistoryToBottom - A function to scroll the history to the bottom.
   */
  handleInput({
    history,
    setHistory,
    commandString,
    scrollHistoryToBottom,
  }: InputProps) {
    var line: string = commandString; // input value from user

    // clear history & reset to brief
    if (commandString === "clear") {
      setHistory([]);
      this.brief = true;
      return;
    }

    // switch to whatever mode the user is NOT in
    if (commandString === "mode") {
      this.brief = !this.brief;
      if (this.brief == false) {
        // if verbose mode, add the user's command in verbose mode
        setHistory([...history, line + ": verbose"]);        
      } else{
        setHistory([...history, line + ": brief"]);        
      }
      scrollHistoryToBottom();
    }

    var outputResult: string | string[][] = "";

    // if verbose mode, add "command: " to the input and "output: " to the result
    if (!this.brief) {
      line = "Command: " + line;
      outputResult = "Output: ";
    }

    var commands: string[] = commandString.split(" ");
    var replFunc = functionDictionary.get(commands[0]);
    
    //If the given command is not registered, indicate this on screen to user
    if (replFunc === undefined && commands[0] !== "mode" && commands[0] !== "clear") {
      if (this.brief) {
        setHistory([...history, "\"" + commands[0] + "\"" + " is not a valid input"]);
        scrollHistoryToBottom();
      } else {
        setHistory([...history, line, outputResult + "\"" + commands[0] + "\"" + " is not a valid input"]);
        scrollHistoryToBottom();
      }
    }

      //Removes command name prior to checking registry
      var commandValues = commands.shift();
      if(Array.isArray(commandValues)){
        commands = commandValues;
      }

  
      var result: Promise<void>;
      if (typeof replFunc !== "undefined") {
        //Locates the command in the registery map, then obtains its data
        result = replFunc(commands).then((info: string) => {
            if (this.brief) {
              // if brief mode, simply display output
              setHistory([...history, info]);
              scrollHistoryToBottom();
            } else {
              // if verbose mode, display input (line) and output
              setHistory([...history, line, outputResult, info]);
              scrollHistoryToBottom();
          }
        });


      } 

  
  }
}
