import { useSignal } from "@preact/signals";
import { gameStatus, submitAnswer, GAME_STATUS } from "@/store/game.js";
import styles from "./AnswerInput.module.css";

export default function AnswerInput() {
  const answer = useSignal("");

  if (gameStatus.value !== GAME_STATUS.PLAYING) {
    return null;
  }

  const handleInput = (e) => {
    answer.value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.value.trim() === "") return;
    submitAnswer(answer.value);
    answer.value = "";
  };

  return (
    <form className={styles.answerForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.answerInput}
        value={answer.value}
        onInput={handleInput}
        placeholder="Escribe tu respuesta..."
        autoFocus
      />
      <button type="submit" className={styles.submitButton}>
        Enviar
      </button>
    </form>
  );
}
