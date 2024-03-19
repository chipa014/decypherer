import { IoBackspaceOutline } from "react-icons/io5";

import b from "src/utils/b";
import styles from "./Key.module.css";

interface IKeyProps {
  digit: number;
  letters: string[];
  onClick: (digit: number) => void;
}

interface IBackspaceKeyProps {
  onClick: () => void;
}

const Key: React.FC<IKeyProps> = function ({ digit, letters, onClick }) {
  return (
    <button className={styles.key} onClick={onClick?.bind(null, digit)}>
      <h2 className={styles.digit}>{digit}</h2>
      <h3 className={styles.letters}>
        {letters.reduce((result, letter) => result + letter).toUpperCase()}
      </h3>
    </button>
  );
};

export const BackspaceKey: React.FC<IBackspaceKeyProps> = function ({
  onClick,
}) {
  return (
    <button className={b(styles, "key", "key-backspace")} onClick={onClick}>
      <h2 className={styles.digit}>0</h2>
      <IoBackspaceOutline className={styles.icon} aria-label="Backspace" />
    </button>
  );
};

export default Key;
