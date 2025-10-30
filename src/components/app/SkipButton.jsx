import { gameStatus, skipQuestion, GAME_STATUS } from "@/store/game.js";
import styles from "./SkipButton.module.css";

export default function SkipButton() {
  return (
    <button className={styles.skipButton} onClick={() => skipQuestion()}>
      ¡Machipalabra!
    </button>
  );
}
