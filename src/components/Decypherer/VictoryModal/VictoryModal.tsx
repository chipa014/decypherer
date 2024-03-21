import { CSSTransition } from "react-transition-group";
import CloseButton from "../CloseButton";
import styles from "./VictoryModal.module.css";
import { MutableRefObject, ReactElement, useRef } from "react";
import {
  closeModalAnimation,
  furtherVictoryModalDelay,
  successAnimationDelay,
} from "src/consts/animations";

interface IVictoryModalProps {
  onClose: () => void;
  shown: boolean;
  wordLength: number;
}

const VictoryModal: React.FC<IVictoryModalProps> = function ({
  onClose,
  shown,
  wordLength,
}) {
  const modalRef = useRef(null);
  const veilRef = useRef(null);
  const enterAnimationDelay =
    wordLength * successAnimationDelay + furtherVictoryModalDelay;

  const applyTransition = function (
    children: ReactElement,
    ref: MutableRefObject<null>,
    className: string
  ) {
    return (
      <CSSTransition
        nodeRef={ref}
        in={shown}
        timeout={{
          enter: enterAnimationDelay,
          exit: closeModalAnimation,
        }}
        classNames={{
          enterActive: styles[`${className}-enter-active`],
          enterDone: styles[`${className}-enter-done`],
          exit: styles[`${className}-exit`],
          exitActive: styles[`${className}-exit-active`],
        }}
        mountOnEnter
        unmountOnExit
      >
        {children}
      </CSSTransition>
    );
  };

  return (
    <>
      {applyTransition(
        <div className={styles.veil} onClick={onClose} ref={veilRef} />,
        veilRef,
        "veil"
      )}
      {applyTransition(
        <div className={styles.modal} ref={modalRef}>
          <p className={styles.text}>Victory!</p>
          <CloseButton onClick={onClose} />
        </div>,
        modalRef,
        "modal"
      )}
    </>
  );
};

export default VictoryModal;
