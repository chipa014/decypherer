import { IoClose } from "react-icons/io5";
import styles from "./CloseButton.module.css";

interface ICloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<ICloseButtonProps> = function ({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick} aria-label="close">
      <IoClose />
    </button>
  );
};

export default CloseButton;
