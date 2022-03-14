import { useState } from "react";

// Hook handles transitions between Appointment component modes
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop()
      setHistory(history);
    }
    setHistory((prev) => [...prev, newMode]);
    setMode(newMode);
  };

  function back() {
    let historyArray = history

    if (historyArray.length > 1) {
      historyArray.pop()
      setHistory(historyArray)
      setMode(history[history.length - 1])
    }
  }

return { mode, transition, back };
}