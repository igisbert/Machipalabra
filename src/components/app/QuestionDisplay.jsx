import {
  gameStatus,
  questionsSignal,
  currentQuestionIndex,
  GAME_STATUS,
} from "@/store/game.js";
import styles from "./QuestionDisplay.module.css";

export default function QuestionDisplay() {
  if (gameStatus.value !== GAME_STATUS.PLAYING) {
    return null;
  }

  const currentQuestion = questionsSignal.value[currentQuestionIndex.value];

  return (
    <div className={styles.questionDisplay}>
      <p>{currentQuestion.pregunta.pregunta}</p>
    </div>
  );
}
