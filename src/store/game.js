import { signal } from "@preact/signals";
import allQuestions from "@/data/questions.js";
import { selectRandomQuestions, checkAnswer } from "@/utils/game.js";

const gameQuestions = selectRandomQuestions(allQuestions);

export const questionsSignal = signal(gameQuestions);
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

// --- Game Logic Functions ---

export function startGame() {
  gameStatus.value = GAME_STATUS.PLAYING;
  currentQuestionIndex.value = 0;
  correctAnswers.value = 0;
  incorrectAnswers.value = 0;
}

export function submitAnswer(answer) {
  const currentQuestion = questionsSignal.value[currentQuestionIndex.value];
  const correctAnswersArray = currentQuestion.pregunta.respuesta.split(',');

  if (checkAnswer(answer, correctAnswersArray)) {
    correctAnswers.value++;
  } else {
    incorrectAnswers.value++;
  }

  if (currentQuestionIndex.value >= questionsSignal.value.length - 1) {
    gameStatus.value = GAME_STATUS.FINISHED;
  } else {
    currentQuestionIndex.value++;
  }
}
