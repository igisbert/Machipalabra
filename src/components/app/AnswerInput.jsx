import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { gameStatus, submitAnswer, skipQuestion, GAME_STATUS } from "@/store/game.js";
import styles from "./AnswerInput.module.css";
import Button from "@/components/app/Button.jsx";

export default function AnswerInput() {
  const answer = useSignal("");
  const inputRef = useRef(null);

  const isDisabled = gameStatus.value !== GAME_STATUS.PLAYING;

  const handleInput = (e) => {
    answer.value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.value.trim() === "") return;
    submitAnswer(answer.value);
    answer.value = "";
    inputRef.current?.focus();
  };

  const handleSkip = () => {
    skipQuestion();
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.answerForm} ${isDisabled ? "disabled" : ""}`}>
      <form onSubmit={handleSubmit}>
        <label className={styles.inputContainer}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={answer.value}
            onInput={handleInput}
            name="answer"
            autoComplete="off"
            placeholder="Escribe tu respuesta..."
            autoFocus={gameStatus.value === GAME_STATUS.PLAYING}
          />
        </label>
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
          >
            <path d="m15 17 5-5-5-5" />
            <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
          </svg>
        </button>
      </form>
      <Button onClick={handleSkip} label="¡Machipalabra!" />
    </div>
  );
}
