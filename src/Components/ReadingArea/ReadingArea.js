import "./ReadingArea.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
export default function ReadingArea({ readingText, setReadingText }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(readingText);
  }, [readingText]);

  const handleChange = (e) => {
    setReadingText(e.target.value);
  };

  return (
    <div id="inputTextAreaDiv">
      <textarea
        id="inputTextArea"
        className="UIInput"
        rows="8"
        placeholder="Paste the text you want to read here, set the words per minute to a
        comfortable reading rate, then click Start ( &#x25ba; ) to begin. While
        reading, Spacebar pauses and resumes, Esc stops, Up Arrow increases the
        reading speed, Down Arrow slows the reading speed, Left Arrow will go
        back a second or so toward the beginning of a sentence, and Right Arrow
        will go ahead a few seconds toward the beginning of a paragraph."
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
