import { useCallback, useMemo, useState } from "react";

import Question from "src/components/Decypherer/Question/Question";
import Keyboard from "src/components/Decypherer/Keyboard/Keyboard";
import VictoryModal from "src/components/Decypherer/VictoryModal/VictoryModal";

import { decyphererWords } from "src/consts/decypherer-words";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const word = useMemo(() => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const today = Math.floor(Date.now() / millisecondsPerDay);
    const wordIndex = today % decyphererWords.length;
    return decyphererWords[wordIndex];
  }, []);

  const onShowModal = useCallback(function () {
    //Timeout helps avoid trying to rerender App while rendering Question
    //instead delaying it until the next render cycle
    setTimeout(() => {
      setShowModal(true);
    }, 0);
  }, []);

  const onHideModal = useCallback(function () {
    setShowModal(false);
  }, []);

  return (
    <>
      <VictoryModal
        onClose={onHideModal}
        shown={showModal}
        wordLength={word.length}
      />
      <div className={styles.container}>
        <Keyboard />
        <Question word={word} onSuccess={onShowModal} />
      </div>
    </>
  );
};

export default App;
