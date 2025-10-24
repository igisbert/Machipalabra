import { gameStatus, startGame, GAME_STATUS } from "@/store/game.js";
import styles from "./StartButtonAndTimer.module.css";

export default function StartButton() {
  // Only show the button if the game has not started

  if (gameStatus.value === GAME_STATUS.NOT_STARTED) {
    return (
      <button className={styles.startButton} onClick={() => startGame()}>
        Empezar a Jugar (Temporal)
      </button>
    );
  }
  if (gameStatus.value !== GAME_STATUS.NOT_STARTED) {
    return <div className={styles.time}>300</div>;
  }
}
