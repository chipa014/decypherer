import { useCallback, useMemo, useState } from "react";

import Question from "src/components/Decypherer/Question/Question";
import Keyboard from "src/components/Decypherer/KeyboardCheatSheet/Keyboard";

import styles from "./App.module.css";
import VictoryModal from "./components/Decypherer/VictoryModal/VictoryModal";
import { decyphererWords } from "./consts/decypherer-words";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const word = useMemo(() => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const today = Math.floor(Date.now() / millisecondsPerDay);
    const wordIndex = today % decyphererWords.length;
    return decyphererWords[wordIndex];
  }, []);

  const onShowModal = useCallback(function () {
    setShowModal(true);
  }, []);

  const onHideModal = function () {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <VictoryModal onClose={onHideModal} />}
      <div className={styles.container}>
        <Keyboard />
        <Question word={word} onSuccess={onShowModal} />
      </div>
    </>
  );
};

export default App;
