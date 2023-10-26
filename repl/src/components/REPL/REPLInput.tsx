import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  TEXT_input_box,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "../constants";
import { HandlerClass } from "./Handler";

/**
 * Props for history & scrolling and notification
 */
export interface InputProps {
  history: (string | string[][])[];
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;
  queryHistory: string[];
  setQueryHistory: Dispatch<SetStateAction<string[]>>;
  setNotification: Dispatch<SetStateAction<string>>;
  scrollHistoryToBottom: () => void;
}

// Create an instance of HandlerClass
var handl = new HandlerClass();

/**
 * Represents the REPL input component.
 *
 * @param {InputProps} props - The component's props including history, setHistory,
 * queryHistory, setQueryHistory, setNotification, and scrollHistoryToBottom.
 * @returns {JSX.Element} - The command line box and submit button.
 */
export function REPLInput({
  queryHistory,
  history,
  setHistory,
  setNotification,
  setQueryHistory,
  scrollHistoryToBottom,
}: InputProps) {
  const [value, setValue] = useState(""); // State for the input value
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // State for history navigation index

  // useEffect to listen for up and down arrow keys and navigate the history
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "l") {
        setValue("load_file <file path>");
      } else if (e.ctrlKey && e.key === "w") {
        setValue("view");
      } else if (e.ctrlKey && e.key === "s") {
        setValue(
          "search <search value>" +
            "<column to search in (index or name)>" +
            "<True/False: file has headers>"
        );
      } else if (e.ctrlKey && e.key === "b") {
        setValue("broadband <County Name> <State Name>");
      } else if (e.key === "ArrowUp") {
        navigateHistory("up");
      } else if (e.key === "ArrowDown") {
        navigateHistory("down");
      } else if (e.ctrlKey && e.key === "c") {
        setValue("clear");
      }
    };

    const handleScroll = (e: KeyboardEvent) => {
      const scroll = document.getElementById("scrollHistory");
      if (scroll !== null) {
        if (e.key === "u" && e.ctrlKey) {
          scroll.scrollTop -= 10;
        } else if (e.key === "d" && e.ctrlKey) {
          scroll.scrollTop += 10;
        }
      }
    };

    window.addEventListener("keydown", handleShortcut);
    window.addEventListener("keydown", handleScroll);
  }, [historyIndex, queryHistory]);

  /**
   * Navigates through the command history.
   *
   * @param {"up" | "down"} direction - The direction to navigate (up or down).
   */
  const navigateHistory = (direction: "up" | "down") => {
    console.log(
      "historyIndex:" + historyIndex + ". queryLength" + queryHistory.length
    );
    if (direction === "up" && historyIndex < queryHistory.length - 1) {
      console.log("up");
      setHistoryIndex(historyIndex + 1);
    } else if (direction === "down" && historyIndex >= 0) {
      console.log("down");
      setHistoryIndex(historyIndex - 1);
    }

    // Update the input value based on the current history item
    setValue(queryHistory[queryHistory.length - 1 - historyIndex] || "");
  };

  /**
   * Handles the form submission.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    setQueryHistory([...queryHistory, value]);
    event.preventDefault(); // Prevent the default form submission
      handl.handleInput({
        history,
        setHistory,
        commandString: value,
        scrollHistoryToBottom,
      });


    // Reset history index and input value after submitting
    setHistoryIndex(-1);
    setValue("");
  };


  return (
    <div id="inputContainer">
      <div>
        <form onSubmit={handleSubmit}>
          {" "}
          <fieldset>
            <legend>Type your command lines here!</legend>
            <ControlledInput
              value={value}
              setValue={setValue}
              ariaLabel={TEXT_input_box}
            />
          </fieldset>
          <div>
            <button
              type="submit"
              className="submitButton"
              aria-label={TEXT_try_button_accessible_name}
            >
              {TEXT_try_button_text}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
