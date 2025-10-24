import { useSignal } from "@preact/signals";
import { gameStatus, submitAnswer, GAME_STATUS } from "@/store/game.js";
import styles from "./AnswerInput.module.css";
import SkipButton from "@/components/app/SkipButton.jsx";

export default function AnswerInput() {
  const answer = useSignal("");

  /*  if (gameStatus.value !== GAME_STATUS.PLAYING) {
    return null;
  } */

  const isDisabled = gameStatus.value !== GAME_STATUS.PLAYING;

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
    <div className={`${styles.answerForm} ${isDisabled ? "disabled" : ""}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={answer.value}
          onInput={handleInput}
          name="answer"
          placeholder="Escribe tu respuesta..."
          autoFocus
        />
        <button type="submit" className={styles.button}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-forward-icon lucide-forward"
          >
            <path d="m15 17 5-5-5-5" />
            <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
          </svg>
        </button>
      </form>
      <SkipButton />
    </div>
  );
}
