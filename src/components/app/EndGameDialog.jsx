import { useEffect, useRef } from "preact/hooks";
import styles from "./EndGameDialog.module.css";
import { gameStatus, GAME_STATUS, resetGame } from "@/store/game.js";
import { throwConfetti } from "@/utils/confetti";
import ScoreItem from "./ScoreItem";

export default function EndGameDialog() {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (gameStatus.value === GAME_STATUS.FINISHED) {
      throwConfetti();
      setTimeout(() => dialog.showModal(), 2000);
    } else {
      dialog.close();
    }
  }, [gameStatus.value]);

  function handleReset() {
    resetGame();
  }

  return (
    <dialog ref={dialogRef} class={styles.dialog}>
      <h1>¡Juego terminado!</h1>
      <div className={styles.score}>
        <ScoreItem type="correct" />
        <ScoreItem type="incorrect" />
      </div>
      <a href="/">Volver al inicio</a>
      <button onClick={handleReset}>Reset</button>
    </dialog>
  );
}
