import { signal } from "@preact/signals";
import questions from "@/data/questions.js";

export const questionsSignal = signal(questions);
export const currentQuestionIndex = signal(0);
export const correctAnswers = signal(0);
export const incorrectAnswers = signal(0);
export const GAME_STATUS = {
  NOT_STARTED: "not_started",
  PLAYING: "playing",
  PAUSED: "paused",
  FINISHED: "finished",
};

export const gameStatus = signal(GAME_STATUS.NOT_STARTED);
