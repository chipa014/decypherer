import b from "src/utils/b";
import styles from "./SubKeyboard.module.css";
import CloseButton from "../CloseButton";

interface ISubKeyboardProps {
  letters: string[];
  onClick: (letter: string) => void;
  onClose: () => void;
}

const SubKeyboard: React.FC<ISubKeyboardProps> = function ({
  letters,
  onClick,
  onClose,
}) {
  return (
    <div className={styles.container}>
      {letters.map((letter) => (
        <button
          className={b(styles, "key")}
          onClick={onClick?.bind(null, letter)}
          key={letter}
        >
          <h3 className={styles.letter}>{letter.toUpperCase()}</h3>
        </button>
      ))}
      <CloseButton onClick={onClose} />
    </div>
  );
};

export default SubKeyboard;
