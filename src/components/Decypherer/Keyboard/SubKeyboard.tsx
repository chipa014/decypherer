import b from "src/utils/b";
import styles from "./SubKeyboard.module.css";

interface ISubKeyboardProps {
  letters: string[];
  onClick: (letter: string) => void;
}

const SubKeyboard: React.FC<ISubKeyboardProps> = function ({
  letters,
  onClick,
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
    </div>
  );
};

export default SubKeyboard;
