import styles from "./Letters.module.css";
import { questionsSignal, currentQuestionIndex, gameStatus, GAME_STATUS } from "@/store/game.js";

export default function Letters() {
  return (
    <div className={styles.circle}>
      {questionsSignal.value.map((question, index) => {
        const status = question.pregunta.status;
        const isCurrent = gameStatus.value === GAME_STATUS.PLAYING && index === currentQuestionIndex.value;

        const letterClasses = [
          styles.letter,
          styles[status], // e.g., styles.correct, styles.incorrect
          isCurrent ? styles.current : "",
        ].join(" ");

        return (
          <div key={question.letra} className={letterClasses}>
            {question.letra}
          </div>
        );
      })}
    </div>
  );
}
