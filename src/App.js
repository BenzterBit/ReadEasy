import "./styles.css";
import React, { useState, useEffect } from "react";
import ProgressBar from "./Components/ProgressBar/progressBar";
import Button from "./Components/Button/Button";
import ReadingArea from "./Components/ReadingArea/ReadingArea";
import SpeedInformation from "./Components/SpeedInformation/SpeedInformation";
export default function App() {
  const [readingText, setReadingText] = useState("");
  const [currentSpeed, setCurrentSpeed] = useState(235);
  const [highlightMultipleWords, setHighlightMultipleWords] = useState(false);
  const handleChange = (e) => {
    setReadingText(e.target.value);
    console.log(`this is ${readingText}`);
  };

  return (
    <div className="App">
      <ProgressBar />

      <br />
      <br />
      <div id="controlButtons">
        <Button id="goBackButton" value="&#x25c4;&#x25c4;" />
        <Button id="startStopButton" value="&#x25ba;" />
        <Button id="pauseResumeButton" value="&#x258c;&#x2590;" />
        {/* TODO: make sense of functionality of this button
        <Button id="goForwardButton" value="&#x25ba;&#x25ba;" /> */}
        <Button
          id="slowerButton"
          value="&#x25bc;"
          currentSpeed={currentSpeed}
          setCurrentSpeed={setCurrentSpeed}
        />
        <Button
          id="fasterButton"
          value="&#x25b2;"
          currentSpeed={currentSpeed}
          setCurrentSpeed={setCurrentSpeed}
        />
      </div>

      <br />
      <br />
      <ReadingArea
        onChange={handleChange}
        readingText={readingText}
        setReadingText={setReadingText}
      />
      <br />
      <br />
      <SpeedInformation
        currentSpeed={currentSpeed}
        highlightMultipleWords={highlightMultipleWords}
        setHighlightMultipleWords={setHighlightMultipleWords}
      />
    </div>
  );
}
