import React, { Dispatch, SetStateAction } from "react";
import { load } from "../csv/loadCSV";
import { search } from "../csv/searchCSV";
import { functionDictionary } from "../commandRegistry";
import { REPLFunction } from "../REPLFunction";

export interface InputProps {
  history: (string | string[][])[];
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;
  commandString: string;
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
   * A string that holds information about the parsed data from CSV files, or "No Files Have Been Parsed" by default.
   */
  parseData: string = "No Files Have Been Parsed";
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
      scrollHistoryToBottom();
      return;
    }

    // switch to whatever mode the user is NOT in
    if (commandString === "mode") {
      this.brief = !this.brief;
      if (this.brief == false) {
        // if verbose mode, add the user's command in verbose mode
        setHistory([...history, line]);
        scrollHistoryToBottom();
      }
    }

    var outputResult: string | string[][] = "";

    // if verbose mode, add "command: " to the input and "output: " to the result
    if (!this.brief) {
      line = "Command: " + line;
      outputResult = "Output: ";
    }

    var commands: string[] = commandString.split(" ");

    var replFunc = functionDictionary.get(commands[0]);
    var result: Promise<string>;
    if (typeof replFunc !== "undefined") {
      result = replFunc(commands);
      outputResult = outputResult + result; // set output message to success or error
    }
    if (this.brief) {
      // if brief mode, simply display output
      setHistory([...history, outputResult]);
    } else {
      // if verbose mode, display input (line) and output
      setHistory([...history, line, outputResult]);
    }
    scrollHistoryToBottom();

    setHistory([...history, line]);
    scrollHistoryToBottom();
  }

  getMode(): Boolean {
    return this.brief;
  }
}
