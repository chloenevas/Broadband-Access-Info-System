import { useState, useRef } from "react";
import { History } from "./History";
import { REPLInput } from "./REPLInput";

/**
 * Shows the history and then the command line
 * @returns JSX for the REPL component
 */
export default function REPL() {
  const [history, setHistory] = useState<(string | string[][])[]>([]);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [notification, setNotif] = useState("");
  const historySpaceRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="repl">
      <div className="historySpace" ref={historySpaceRef}>
        <History history={history} />
      </div>
      <hr></hr>
      <REPLInput
        setNotification={setNotif}
        history={history}
        setHistory={setHistory}
        queryHistory={queryHistory}
        setQueryHistory={setQueryHistory}
        scrollHistoryToBottom={() => {
          setTimeout(() => {
            if (historySpaceRef.current) {
              historySpaceRef.current.scrollTop =
                historySpaceRef.current.scrollHeight;
            }
          }, 0);
        }}
      />
      {notification}
    </div>
  );
}
