import { useEffect, useState } from "react";

// import { decyphererWords } from "src/consts/decypherer-words";
import QuestionLetter from "src/components/Decypherer/Question/QuestionLetter";
// import { useSelectRandom } from "src/hooks/useSelectRandom";

import styles from "./Question.module.css";
import { lettersToDigits } from "src/consts/letter-digits";
import { oneLetterRegexp } from "src/consts/regexp";
import {
  dispatchCustomInputEvent,
  isCustomEvent,
} from "src/utils/customEvents";

interface IQuestionProps {
  word: string;
  onSuccess: () => void;
}

const Question: React.FC<IQuestionProps> = function ({ word, onSuccess }) {
  const [currentGuess, setCurrentGuess] = useState("");

  const digits = word.split("").map((letter) => {
    if (!/^[A-Za-zА-Яа-я]$/.test(letter)) {
      return null;
    }

    return lettersToDigits[letter.toLowerCase()];
  });

  const checkGuess = function (guess: string) {
    if (guess === word) {
      onSuccess();
      return "";
    }

    return guess;
  };

  const backspaceInputHandler = function () {
    setCurrentGuess((prevGuess) => {
      if (!prevGuess) {
        return prevGuess;
      }

      return prevGuess.slice(0, -1);
    });
  };

  const letterInputHandler = function (key: string) {
    setCurrentGuess((prevGuess) => {
      const newGuess = prevGuess + key.toLowerCase();
      if (newGuess.length > word.length) {
        return prevGuess;
      }

      if (newGuess.length === word.length) {
        checkGuess(newGuess);
      }

      return newGuess;
    });
  };

  const keyDownHandler = function (event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (key !== "backspace" && !oneLetterRegexp.test(key)) {
      return;
    }

    dispatchCustomInputEvent(key.toLowerCase());
  };

  const customInputHandler = function (event: Event) {
    if (!isCustomEvent(event)) {
      throw new Error(
        "customInputEvent is not of type CustomEvent: no event.detail payload"
      );
    } //A clutch to get typesafe customEvent in addEventListener

    const { input } = event.detail;

    if (input === "backspace") {
      backspaceInputHandler();

      return;
    }

    letterInputHandler(input);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("customInput", customInputHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("customInput", customInputHandler);
    };
  }, []);

  return (
    <div className={styles.container}>
      {digits.map((digit, i) => {
        if (digit === null) {
          return <div className={styles.space} />;
        }

        return (
          <QuestionLetter
            digit={digit}
            letter={currentGuess[i] ?? null}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default Question;
