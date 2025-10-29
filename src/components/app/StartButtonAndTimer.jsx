import { useRef } from "preact/hooks";
import { gameStatus, startGame, GAME_STATUS, time } from "@/store/game.js";
import { formatTime } from "@/utils/game";
import styles from "./StartButtonAndTimer.module.css";
import { throwConfetti } from "@/utils/confetti";

export default function StartButton() {
  const buttonRef = useRef(null);
  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.add(styles.buttonExitAnimation);
      buttonRef.current.disabled = true;
    }
  };

  const handleAnimationEnd = () => {
    startGame();
  };

  if (gameStatus.value === GAME_STATUS.FINISHED) {
    throwConfetti();
  }

  if (gameStatus.value === GAME_STATUS.NOT_STARTED) {
    return (
      <button
        className={styles.startButton}
        onClick={handleClick}
        ref={buttonRef}
        onAnimationEnd={handleAnimationEnd}
      >
        ¡Jugar!
      </button>
    );
  }
  if (gameStatus.value !== GAME_STATUS.NOT_STARTED) {
    return <div className={styles.time}>{formatTime(time.value)}</div>;
  }
}
