import b from "src/utils/b";
import styles from "./Key.module.css";

interface IKeyProps {
  digit: number;
  letters: string[];
  onClick: (digit: number) => void;
}

const Key: React.FC<IKeyProps> = function ({ digit, letters, onClick }) {
  return (
    <button
      className={b(styles, "key", `key-${digit}`)}
      onClick={onClick?.bind(null, digit)}
    >
      <h2 className={styles.digit}>{digit}</h2>
      <h3 className={styles.letters}>
        {letters.reduce((result, letter) => result + letter).toUpperCase()}
      </h3>
    </button>
  );
};

export default Key;
