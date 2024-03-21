import { useCallback, useEffect, useMemo, useState } from "react";

import QuestionLetter from "src/components/Decypherer/Question/QuestionLetter";

import { lettersToDigits } from "src/consts/letter-digits";
import { oneLetterRegexp } from "src/consts/regexp";
import b from "src/utils/b";
import {
  dispatchCustomInputEvent,
  isCustomEvent,
} from "src/utils/customEvents";
import styles from "./Question.module.css";

interface IQuestionProps {
  word: string;
  onSuccess: () => void;
}

const Question: React.FC<IQuestionProps> = function ({ word, onSuccess }) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessStatus, setGuessStatus] = useState<"none" | "right" | "wrong">(
    "none"
  );

  const digits = useMemo(
    () =>
      word.split("").map((letter) => {
        if (!/^[A-Za-zА-Яа-я]$/.test(letter)) {
          return null;
        }

        return lettersToDigits[letter.toLowerCase()];
      }),
    [word]
  );

  const checkGuess = useCallback(
    function (guess: string) {
      if (guess === word) {
        onSuccess();
        setGuessStatus("right");
        document.removeEventListener("keydown", keyDownHandler);
        document.removeEventListener("customInput", customInputHandler);
        return;
      }

      setGuessStatus("wrong");

      return;
    },
    [word, onSuccess]
  );

  const backspaceInputHandler = useCallback(function () {
    setCurrentGuess((prevGuess) => {
      if (!prevGuess) {
        return prevGuess;
      }

      if (prevGuess.length === word.length) {
        setGuessStatus("none");
      }

      return prevGuess.slice(0, -1);
    });
  }, []);

  const letterInputHandler = useCallback(
    function (key: string) {
      setCurrentGuess((prevGuess) => {
        const newGuess = prevGuess + key.toLowerCase();
        if (newGuess.length > word.length) {
          return prevGuess;
        }

        if (newGuess.length === word.length) {
          checkGuess(newGuess);
          return newGuess;
        }

        setGuessStatus("none");

        return newGuess;
      });
    },
    [checkGuess, word]
  );

  const keyDownHandler = useCallback(function (event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (key !== "backspace" && !oneLetterRegexp.test(key)) {
      return;
    }

    dispatchCustomInputEvent(key.toLowerCase());
  }, []);

  const customInputHandler = useCallback(
    function (event: Event) {
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
    },
    [backspaceInputHandler, letterInputHandler]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("customInput", customInputHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("customInput", customInputHandler);
    };
  }, [keyDownHandler, customInputHandler]);

  return (
    <div
      className={b(
        styles,
        "container",
        guessStatus === "wrong" ? "wrong-answer" : ""
      )}
    >
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
