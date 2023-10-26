import REPL from "./REPL/REPL";

import "../styles/App.css";

/**
 * Top-level application component. Shows the program description and then
 * loads the command-line REPL component
 * @returns JSX for the App component
 */
function App() {
  return (
    <div className="App">
      <div className="App-header" data-testid="test:header-text">
        <div id="Title"> WELCOME TO MOCK! </div>
        <div>
          You can enter commands such as load_file, view, and search. The
          default mode is brief, which returns the output of your command.
        </div>
        <div>
          You can switch to verbose mode by typing "mode" in the command line.
          This will return both your input and your output. Switch back to brief
          at any point by using the "mode" command. Typing "clear" will clear
          your history and reset the mode to brief.
        </div>
        <div>To use load, enter "load_file &lt;csv-file-path&gt;"</div>
        <div>To use view, enter "view"</div>
        <div>
          To use search, enter "search
          &lt;column&gt;&lt;value&gt;&lt;true/false (has headers)&gt;"
        </div>
        <div>
          If you would like to search with no column identifier, simply omit the
          column identifier and enter only the value you'd like to search for
        </div>
        <div>
          To search the census API, enter "broadband
          &lt;county&gt;&lt;state&gt;"
        </div>
        <div>To retrieve a previous search, press the up arrow</div>
      </div>
      <REPL />
    </div>
  );
}

export default App;
