import "./Button.css";
export default function Button({
  id,
  value,
  currentSpeed,
  setCurrentSpeed,
  isPlaying,
  isPaused,
  timerDelay,
  text,
  textIndex,
  stopReader
}) {
  const increaseSpeed = (inputSpeed) => {
    var max_speed = 2500;
    var speed = parseInt(inputSpeed, 10);
    speed = Math.floor(speed / 5);
    speed = Math.max(speed + 1, Math.floor(1.05 * speed));
    speed = speed * 5;
    speed = speed > max_speed ? max_speed : speed;
    return speed;
  };

  const decreaseSpeed = (inputSpeed) => {
    var min_speed = 50;
    var speed = parseInt(inputSpeed, 10);
    speed = Math.floor(speed / 5);
    speed = Math.floor(0.953 * speed);
    speed = speed * 5;
    speed = speed < min_speed ? min_speed : speed;
    inputSpeed = speed;
    return speed;
  };

  const handleClick = (e) => {
    if (e.target.id === "fasterButton") {
      setCurrentSpeed(increaseSpeed(currentSpeed));
    }
    if (e.target.id === "slowerButton") {
      setCurrentSpeed(decreaseSpeed(currentSpeed));
    }
    if (e.target.id === "goForwardButton") {
      var hyphenChars = "-\u2012\u2013\u2014\u2015\u2053"; // List of hyphen characters.
      var wordBreakChars = " \n\r\t\f\v" + hyphenChars; // List of characters that indicate the end of a word.
      var sentenceEnders = ".?!"; // List of characters that indicate the end of a sentence.
      var paragraphEnders = "\n\r"; // List of characters that indicate the end of a paragraph.

      if (isPlaying || !isPaused) {
        // Go forward approximately 5 seconds.
        var wordsPerSecond = 1000 / timerDelay;
        var goForwardLength = Math.floor(wordsPerSecond * 6 * 5); // Words per second, times an estimate of 6 characters per word, times 5.
        var index = Math.min(text.length, textIndex + goForwardLength);

        // Find the end of this paragraph.
        var searchForParagraphEnd = 2000;
        while (
          index < text.length &&
          searchForParagraphEnd-- > 0 &&
          paragraphEnders.indexOf(text[index]) === -1
        ) {
          ++index;
        }

        // If the paragraph end was not found, find the end of this sentence.
        if (searchForParagraphEnd <= 0) {
          // Find the end of this sentence.
          var searchForSentenceEnd = 1000;
          while (
            index < text.length &&
            searchForSentenceEnd-- > 0 &&
            sentenceEnders.indexOf(text[index]) === -1
          ) {
            ++index;
          }

          // Find the next white space character.
          while (
            index < text.length &&
            searchForSentenceEnd-- > 0 &&
            wordBreakChars.indexOf(text[index]) === -1
          ) {
            ++index;
          }
        }

        // Set textIndex to the new location.
        if (index >= text.length) {
          stopReader();
        } else {
          textIndex = index;
        }

        // If currently paused, display the word.
        if (isPaused) {
          // Get the next word.
          var word = nextWord();

          // Display the word.
          displayWord(word);
        }
      }
    }
  };
  return (
    <input
      type="button"
      className="controlButton"
      id={id}
      value={value}
      onClick={handleClick}
    />
  );
}
