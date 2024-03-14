import { useState } from "react";

import Key from "./Key";
import { digitsToLetters } from "src/consts/letter-digits";
import b from "src/utils/b";

import styles from "./Keyboard.module.css";
import LetterKeys from "./LetterKeys";
import { dispatchCustomInputEvent } from "src/utils/customEvents";

const numbers = [...Array(9).keys()];

const Keyboard: React.FC = function () {
  const [subKeyboardOpened, setSubKeyboardOpened] = useState(false);
  const [selectedDigit, setSelectedDigit] = useState(1);

  const digitKeyClickHandler = (digit: number) => {
    setSubKeyboardOpened(true);
    setSelectedDigit(digit);
  };

  const letterKeyClickHandler = (letter: string) => {
    setSubKeyboardOpened(false);

    dispatchCustomInputEvent(letter.toLowerCase());
  };

  // const closeSubKeyboardHandler = () => {
  //   setSubKeyboardOpened(false);
  // };

  return (
    <div className={b(styles, "keyboard")}>
      {numbers.map((num) => {
        const displayNum = num + 1;
        return (
          <Key
            digit={displayNum}
            letters={digitsToLetters[num]}
            key={num}
            onClick={digitKeyClickHandler}
          ></Key>
        );
      })}
      {subKeyboardOpened && <div className={styles.veil} />}
      {subKeyboardOpened && (
        <LetterKeys
          letters={digitsToLetters[selectedDigit - 1]}
          onClick={letterKeyClickHandler}
        />
      )}
    </div>
  );
};

export default Keyboard;
