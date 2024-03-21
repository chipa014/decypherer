import { lettersToDigits } from "src/consts/letter-digits";
import b from "src/utils/b";
import styles from "./QuestionLetter.module.css";

interface IQuestionLetterProps {
  digit: number;
  letter: string;
}

const QuestionLetter: React.FC<IQuestionLetterProps> = ({ digit, letter }) => {
  const isRevealed = Boolean(letter);
  const highlightColor = lettersToDigits[letter] === digit ? "blue" : "red";

  return (
    <div
      className={b(styles, "container", {
        [highlightColor]: isRevealed,
      })}
    >
      <h2 className={styles.letter}>
        {isRevealed ? letter.toUpperCase() : digit}
      </h2>
    </div>
  );
};

export default QuestionLetter;
