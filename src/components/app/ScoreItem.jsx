import { correctAnswers, incorrectAnswers } from "@/store/game.js";
import styles from "./ScoreItem.module.css";

export default function ScoreItem({ type }) {
  const isCorrect = type === "correct";
  const label = isCorrect ? "Aciertos" : "Fallos";
  const score = isCorrect ? correctAnswers : incorrectAnswers;

  return (
    <div className={styles.scoreItem}>
      <div className={styles.label}>
        {label}
        <span>{score.value}</span>
      </div>
    </div>
  );
}
