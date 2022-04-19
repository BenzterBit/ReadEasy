import React from "react";
export default function SpeedInformation({
  currentSpeed,
  highlightMultipleWords,
  setHighlightMultipleWords
}) {
  const handleClick = (e) => {
    if (e.target.id === "multiWordCheckBox") {
      setHighlightMultipleWords(!highlightMultipleWords);
    }
  };
  return (
    <div id="speedAndCheckBoxesDiv">
      <span className="UIText">
        Speed{" "}
        <input
          type="text"
          id="speedInputElement"
          className="UIInput"
          size="5"
          value={currentSpeed}
        />
      </span>
      <br />
      <span className="UIText">
        <label>
          <input
            type="checkbox"
            id="multiWordCheckBox"
            defaultValue={highlightMultipleWords}
            onClick={handleClick}
          />
          Highlight multiple words
        </label>
      </span>
      <br />
      <span className="UIText">
        Average words per minute: <span id="wpmDisplay"></span>
      </span>
    </div>
  );
}
