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
  const [text, settext] = useState("");
  const [textIndex, settextIndex] = useState(0);
  const [wordStart, setwordStart] = useState(0);
  const [wordUpdateTimer, setwordUpdateTimer] = useState("");
  const [timerDelay, settimerDelay] = useState("");
  const [timerDelaySlope, settimerDelaySlope] = useState("");
  const [timerDelayOffset, settimerDelayOffset] = useState("");
  const [timerDelaySlopeMulti, settimerDelaySlopeMulti] = useState(0.0);
  const [timerDelaySlopeSingle, settimerDelaySlopeSingle] = useState(0.0);
  const [isPlaying, setisPlaying] = useState(false);
  const [isPaused, setisPaused] = useState(false);
  const [timeStartPause, settimeStartPause] = useState("");
  const [timeSpentPaused, settimeSpentPaused] = useState(0);
  const [timeStartReading, settimeStartReading] = useState("");
  const [wordCount, setwordCount] = useState(0);
  const [max_word_length, setmax_word_length] = useState(13);
  const [max_padding, setmax_padding] = useState("");
  // const [max_speed, setmax_speed] = useState("");
  const [multiWordDisplay, setmultiWordDisplay] = useState(false);
  // const [x, setx] = useState("");
  // const [x, setx] = useState("");
  // const [x, setx] = useState("");
  // const [x, setx] = useState("");
  // const [x, setx] = useState("");

  const handleChange = (e) => {
    setReadingText(e.target.value);
    console.log(`this is ${readingText}`);
  };

  const stopReader = () => {
    var inputTextArea = document.getElementById("inputTextArea");
    inputTextArea.focus();
    inputTextArea.setSelectionRange(0, 0);

    setStopState();

    // Clear the displayed word.
  };

  const updateProgressBar = (progress, limit) => {
    var progressBarBaseDiv = document.getElementById("progressBarBaseDiv");
    var progressBarDiv = document.getElementById("progressBarDiv");
    var divWidth = Math.floor(
      (progress / limit) * progressBarBaseDiv.clientWidth
    );
    progressBarDiv.setAttribute("style", "width:" + divWidth + "px");
  };

  const nextWord = () => {
    var hyphenChars = "-\u2012\u2013\u2014\u2015\u2053"; // List of hyphen characters.
    var wordBreakChars = " \n\r\t\f\v" + hyphenChars;

    var firstWordFound = false; // true when the end of the first word is found.
    var firstWordEnd; // the end location of the first word.

    // Search ahead to find the next non-whitespace character.
    while (
      textIndex < text.length &&
      wordBreakChars.indexOf(text[textIndex]) > -1
    ) {
      settextIndex(textIndex + 1);
    }

    // Save the starting location of the word.
    setwordStart(textIndex);

    // Search ahead to find the end of the word.
    settextIndex(textIndex - 1);
    do {
      settextIndex(textIndex + 1);
      if (wordBreakChars.indexOf(text[textIndex]) > -1) {
        // Word break found. Was it a hyphen?
        if (hyphenChars.indexOf(text[textIndex]) > -1) {
          // On rare occasion, a hyphen will be found just after a max_word_length word (ie., "subscriptions-").
          //      If that happens, break out. Adding the hyphen will make the word > max_word_length.
          if (textIndex - wordStart >= max_word_length) {
            break;
          }

          if (multiWordDisplay && firstWordFound === false) {
            setwordCount(wordCount + 1);
            firstWordFound = true;
            firstWordEnd = textIndex + 1;
          } else {
            // Return the word with its hyphen.
            setwordCount(wordCount + 1);
            return text.substring(wordStart, textIndex - wordStart + 1);
          }
        } else {
          if (multiWordDisplay && firstWordFound === false) {
            setwordCount(wordCount + 1);
            firstWordFound = true;
            firstWordEnd = textIndex;
          } else {
            // Return the word with its hyphen.
            setwordCount(wordCount + 1);
            return text.substring(wordStart, textIndex - wordStart);
          }
        }
      }
    } while (
      textIndex < text.length &&
      textIndex - wordStart < max_word_length
    );

    // If the second word was too long, return only the first word.
    if (firstWordFound) {
      settextIndex(firstWordEnd);
      return text.substring(wordStart, textIndex - wordStart);
    }

    // Process the last word.
    if (textIndex >= text.length) {
      var returnString = text.substring(wordStart, text.length - wordStart);
      return returnString;
    }

    // The word is longer than max_word_length. Choose a subset of the current word.
    return hyphenateWord();
  };

  const hyphenateWord = () => {
    var returnString;
    var i, i2;
    var hyphenChars = "-\u2012\u2013\u2014\u2015\u2053"; // List of hyphen characters.
    var wordBreakChars = " \n\r\t\f\v" + hyphenChars;

    // Find the end of this word, or another max_word_length - 1 characters.
    var longWordEnd = textIndex + 1;
    while (
      longWordEnd < text.length &&
      longWordEnd - wordStart < max_word_length * 2 - 1 &&
      wordBreakChars.indexOf(text[longWordEnd]) === -1
    ) {
      ++longWordEnd;
    }

    // Find the middle of the long word.
    var wordMiddle = Math.floor((longWordEnd + wordStart) / 2);

    // Determine if this is a CamelCase word: Find a lowercase letter with an uppercase letter after it.
    for (i = 1; i < max_word_length - 1; ++i) {
      if (
        text[wordStart + i].toLowerCase() === text[wordStart + i] &&
        text[wordStart + i + 1].toUpperCase() === text[wordStart + i + 1]
      ) {
        // This is a CamelCase word. Hyphenate on the upper case letter.

        // Look backward and forward from the middle of the word to find a place to hyphenate.
        for (i2 = 0; wordMiddle - i2 > wordStart + 2; ++i2) {
          if (
            wordMiddle + i2 + 1 < textIndex &&
            text[wordMiddle + i2].toLowerCase() === text[wordMiddle + i2] &&
            text[wordMiddle + i2 + 1].toUpperCase() ===
              text[wordMiddle + i2 + 1]
          ) {
            settextIndex(wordMiddle + i2 + 1);
            returnString = text.substr(wordStart, textIndex - wordStart) + "-";
            return returnString;
          }

          if (
            text[wordMiddle - i2].toLowerCase() === text[wordMiddle - i2] &&
            text[wordMiddle - i2 - 1].toUpperCase() ===
              text[wordMiddle - i2 - 1]
          ) {
            settextIndex(wordMiddle - i2 - 1);
            returnString = text.substr(wordStart, textIndex - wordStart) + "-";
            return returnString;
          }
        }
      }
    }
    //TODO : make a component did mount and set consonants
    // Look backward and forward from the middle of the word to find a place to hyphenate.
    for (i = 0; wordMiddle - i > wordStart + 2; ++i) {
      // Two consonants (ie., "ts") as the place to hyphenate.
      if (
        wordMiddle + i + 1 < textIndex &&
        consonants.indexOf(text[wordMiddle + i]) > -1 &&
        consonants.indexOf(text[wordMiddle + i + 1]) > -1
      ) {
        textIndex = wordMiddle + i + 1;
        returnString = text.substr(wordStart, textIndex - wordStart) + "-";
        return returnString;
      }

      if (
        consonants.indexOf(text[wordMiddle - i]) > -1 &&
        consonants.indexOf(text[wordMiddle - i - 1]) > -1
      ) {
        textIndex = wordMiddle - i;
        returnString = text.substr(wordStart, textIndex - wordStart) + "-";
        return returnString;
      }
    }

    // No place found to hyphenate, so just split the word in half.
    textIndex = wordMiddle;
    returnString = text.substr(wordStart, textIndex - wordStart) + "-";
    return returnString;
  };

  const setStopState = (e) => {
    var pauseString = "\u258c\u2590";
    var startString = "\u25ba";

    if (wordUpdateTimer) {
      clearTimeout(wordUpdateTimer);
    }

    // Set the playing and pausing flags.
    setisPlaying(false);
    setisPaused(false);

    // Set the values to the beginning of the text.
    settextIndex(0);
    setwordStart(0);
    updateProgressBar(0, 100);

    var pauseResumeButton = document.getElementById("pauseResumeButton");
    var startStopButton = document.getElementById("startStopButton");
    // Set the text of the buttons to the stopped state.
    pauseResumeButton.value = pauseString;
    startStopButton.value = startString;
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
        <Button
          id="goForwardButton"
          value="&#x25ba;&#x25ba;"
          isPlaying={isPlaying}
          isPaused={isPaused}
          timerDelay={timerDelay}
          text={text}
          textIndex={textIndex}
          stopReader={() => stopReader()}
        />
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
