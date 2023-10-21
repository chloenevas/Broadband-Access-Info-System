export interface HistoryProps {
  history: (string | string[][])[];
}

/**
 * Loops through the history to return each element
 * as either a paragraph if it's a string, or an HTML table
 * if it's a list of list of strings
 *
 * @param props - HistoryProps that contains the history list
 * @returns - element of history properly formatted
 */
var brief: boolean = true;
export function History(props: HistoryProps) {
  return (
    <div className="history">
      {props.history.map((historyItem) => {
        if (typeof historyItem === "string") {
          console.log("load")
          if (historyItem.includes("Command: ")) {
            brief = false;
          } else {
            brief = true;
          }
          return <p>{historyItem}</p>;
        } else {
          if (brief) {
            return (
              <div>
                <table>
                  <tbody>
                    {historyItem.map((row, index) => (
                      <tr className="row">
                        {row.map((item) => (
                          <td>{item}</td>
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
                          <td>{item}</td>
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
