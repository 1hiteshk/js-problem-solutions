import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    let id = setTimeout(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearTimeout(id);
  }, [currentTime]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {String().padStart(2, currentTime.getHours())}:
      {String(currentTime.getMinutes()).padStart(2, "0")}:
      {String().padStart(2, currentTime.getSeconds())}
      &nbsp;
      {currentTime.getHours() > 12 ? "PM" : "AM"}
      <h3>
        {currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true, // ensures AM/PM
        })}
      </h3>
    </div>
  );
}
