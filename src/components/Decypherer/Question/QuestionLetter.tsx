import { useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { successAnimationDelay } from "src/consts/animations";
import { lettersToDigits } from "src/consts/letter-digits";
import b from "src/utils/b";
import styles from "./QuestionLetter.module.css";

interface IQuestionLetterProps {
  animateSuccess: boolean;
  digit: number;
  index: number;
  letter: string;
}

const QuestionLetter: React.FC<IQuestionLetterProps> = ({
  animateSuccess,
  digit,
  index,
  letter,
}) => {
  const letterRef = useRef(null);
  const isRevealed = Boolean(letter);

  const determineColor = useCallback(() => {
    if (animateSuccess) {
      return "green";
    }
    if (lettersToDigits[letter] === digit) {
      return "blue";
    }
    return "red";
  }, [animateSuccess, letter, digit]);

  const highlightColor = determineColor();

  return (
    <CSSTransition
      nodeRef={letterRef}
      in={animateSuccess}
      timeout={index * successAnimationDelay}
      classNames={{ ...styles }}
    >
      <div
        className={b(styles, "container", {
          [highlightColor]: isRevealed,
        })}
        ref={letterRef}
      >
        <h2 className={styles.letter}>
          {isRevealed ? letter.toUpperCase() : digit}
        </h2>
      </div>
    </CSSTransition>
  );
};

export default QuestionLetter;
