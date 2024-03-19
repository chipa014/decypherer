import CloseButton from "../CloseButton";
import styles from "./VictoryModal.module.css";

interface IVictoryModalProps {
  onClose: () => void;
}

const VictoryModal: React.FC<IVictoryModalProps> = function ({ onClose }) {
  return (
    <>
      <div className={styles.veil} onClick={onClose} />
      <div className={styles.modal}>
        <p className={styles.text}>Victory!</p>
        <CloseButton onClick={onClose} />
      </div>
    </>
  );
};

export default VictoryModal;
