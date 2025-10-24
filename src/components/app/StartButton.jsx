import { gameStatus, startGame, GAME_STATUS } from "@/store/game.js";
import styles from "./StartButton.module.css";

export default function StartButton() {
  // Only show the button if the game has not started
  if (gameStatus.value !== GAME_STATUS.NOT_STARTED) {
    return null;
  }

  return (
    <button className={styles.startButton} onClick={() => startGame()}>
      Empezar a Jugar (Temporal)
    </button>
  );
}
