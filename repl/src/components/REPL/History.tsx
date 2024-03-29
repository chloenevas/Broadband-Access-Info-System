export interface HistoryProps {
  history: (string | string[][])[];
}

/**
 * Loops through the history to return each element
 * as either a paragraph if it's a string, or an HTML table
 * if it's a list of list of strings.
 *
 * Depending on if the mode is brief or verbose, the
 * history will be formatted accordingly, allowing
 * results to be seperated at new lines.
 *  *
 * @param props - HistoryProps that contains the history list
 * @returns - element of history properly formatted
 */
var brief: boolean = true;
export function History(props: HistoryProps) {
  return (
    <div className="history" id="historyContainer">
      {props.history.map((historyItem) => {
        if (typeof historyItem === "string") {
          console.log("load");
          if (historyItem.includes("Command: ")) {
            brief = false;
          } else {
            brief = true;
          }
          return (
            <p
            //Announce newest input to screenreder
              aria-live="polite"
              aria-atomic="true" 
            >
              {historyItem}
            </p>
          );
        } else {
          if (brief) {
            return (
              <div>
                <table>
                  <tbody>
                    {historyItem.map((row, index) => (
                      <tr className="row">
                        {row.map((item) => (
                          <td
                            aria-live="polite" 
                            aria-atomic="true"
                          >
                            {item}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          } else {
            return (
              <div>
                <p title="verbose">Output:</p>
                <table>
                  <tbody>
                    {historyItem.map((row) => (
                      <tr>
                        {row.map((item) => (
                          <td
                            aria-live="polite" 
                            aria-atomic="true"
                          >
                            {item}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }
      })}
    </div>
  );
}
