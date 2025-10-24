import { signal, computed } from "@preact/signals";
import allQuestions from "@/data/questions.js";
import { selectRandomQuestions, checkAnswer } from "@/utils/game.js";
import { LETTER_STATUS } from "@/utils/constants.js";

const initialQuestions = selectRandomQuestions(allQuestions);

export const questionsSignal = signal(initialQuestions);
export const currentQuestionIndex = signal(0);

export const correctAnswers = computed(() => {
  return questionsSignal.value.filter(q => q.pregunta.status === LETTER_STATUS.CORRECT).length;
});

export const incorrectAnswers = computed(() => {
  return questionsSignal.value.filter(q => q.pregunta.status === LETTER_STATUS.INCORRECT).length;
});

export const GAME_STATUS = {
  NOT_STARTED: "not_started",
  PLAYING: "playing",
  FINISHED: "finished",
};

export const gameStatus = signal(GAME_STATUS.NOT_STARTED);

// --- Private Helper Functions ---

function findNextQuestionIndex(startIndex = 0) {
  // First pass: look for unanswered questions
  const firstPass = questionsSignal.value.findIndex((q, i) => i >= startIndex && q.pregunta.status === LETTER_STATUS.UNANSWERED);
  if (firstPass !== -1) return firstPass;

  // Second pass: look for skipped questions from the beginning
  const secondPass = questionsSignal.value.findIndex(q => q.pregunta.status === LETTER_STATUS.SKIPPED);
  if (secondPass !== -1) return secondPass;

  // No more questions to answer
  return -1;
}

// --- Game Logic Functions ---

export function startGame() {
  // Reset statuses
  questionsSignal.value = questionsSignal.value.map(q => ({ ...q, pregunta: { ...q.pregunta, status: LETTER_STATUS.UNANSWERED } }));
  currentQuestionIndex.value = 0;
  gameStatus.value = GAME_STATUS.PLAYING;
}

function processTurn(newStatus) {
  const newQuestions = [...questionsSignal.value];
  newQuestions[currentQuestionIndex.value].pregunta.status = newStatus;
  questionsSignal.value = newQuestions;

  const nextIndex = findNextQuestionIndex(currentQuestionIndex.value + 1);

  if (nextIndex === -1) {
    gameStatus.value = GAME_STATUS.FINISHED;
  } else {
    currentQuestionIndex.value = nextIndex;
  }
}

export function submitAnswer(answer) {
  const currentQuestion = questionsSignal.value[currentQuestionIndex.value];
  const correctAnswersArray = currentQuestion.pregunta.respuesta.split(',');

  if (checkAnswer(answer, correctAnswersArray)) {
    processTurn(LETTER_STATUS.CORRECT);
  } else {
    processTurn(LETTER_STATUS.INCORRECT);
  }
}

export function skipQuestion() {
  processTurn(LETTER_STATUS.SKIPPED);
}
