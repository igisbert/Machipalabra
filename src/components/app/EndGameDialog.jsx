import { useEffect, useRef } from "preact/hooks";
import styles from "./EndGameDialog.module.css";
import { gameStatus, GAME_STATUS, resetGame } from "@/store/game.js";
import { throwConfetti } from "@/utils/confetti";
import ScoreItem from "./ScoreItem";
import Button from "./Button";

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

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <dialog ref={dialogRef} class={styles.dialog}>
      <h1>¡Juego terminado!</h1>
      <div className={styles.score}>
        <ScoreItem type="correct" />
        <ScoreItem type="incorrect" />
      </div>
      <div className={styles.actions}>
        <Button onClick={handleReset} label="Volver a jugar" />
        <Button onClick={handleShare} label="Compartir" />
      </div>
    </dialog>
  );
}
