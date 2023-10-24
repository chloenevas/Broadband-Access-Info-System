import { useState, useRef, useEffect } from "react";
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


  // const scroll = document.getElementById("scrollHistory");
  // if (scroll !== null) {
  //   useEffect(() => {
  //     const handleScroll = (e: KeyboardEvent) => {
  //       if (e.key === "u" && e.ctrlKey) {
  //         scroll.scrollTop -= 50;
  //       } else if (e.key === "d" && e.ctrlKey) {
  //         scroll.scrollTop += 50;
  //       }
  //     };

  //     window.addEventListener("keydown", handleScroll);
  //   }, []);
  // }


  return (
    <div className="repl">
      <div className="historySpace" ref={historySpaceRef} id="scrollHistory">
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
