import { useState } from "react";

import Key from "src/components/Decypherer/Keyboard/Key";
import SubKeyboard from "src/components/Decypherer/Keyboard/SubKeyboard";

import { digitsToLetters } from "src/consts/letter-digits";
import b from "src/utils/b";
import { dispatchCustomInputEvent } from "src/utils/customEvents";

import styles from "./Keyboard.module.css";

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
        <SubKeyboard
          letters={digitsToLetters[selectedDigit - 1]}
          onClick={letterKeyClickHandler}
        />
      )}
    </div>
  );
};

export default Keyboard;
