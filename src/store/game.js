import { signal, computed } from "@preact/signals";
import allQuestions from "@/data/questions.js";
import { selectRandomQuestions, checkAnswer } from "@/utils/game.js";
import { LETTER_STATUS, TIMER_SECONDS } from "@/utils/constants.js";

const initialQuestions = selectRandomQuestions(allQuestions);

export const questionsSignal = signal(initialQuestions);
export const currentQuestionIndex = signal(0);
export const time = signal(TIMER_SECONDS);

let timer;

function startTimer() {
  timer = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      stopTimer();
      markUnansweredAsIncorrect();
      gameStatus.value = GAME_STATUS.FINISHED;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function markUnansweredAsIncorrect() {
  questionsSignal.value = questionsSignal.value.map((q) => {
    if (
      q.pregunta.status === LETTER_STATUS.UNANSWERED ||
      q.pregunta.status === LETTER_STATUS.SKIPPED
    ) {
      return {
        ...q,
        pregunta: {
          ...q.pregunta,
          status: LETTER_STATUS.INCORRECT,
        },
      };
    }
    return q;
  });
}

export const correctAnswers = computed(() => {
  return questionsSignal.value.filter(
    (q) => q.pregunta.status === LETTER_STATUS.CORRECT
  ).length;
});

export const incorrectAnswers = computed(() => {
  return questionsSignal.value.filter(
    (q) => q.pregunta.status === LETTER_STATUS.INCORRECT
  ).length;
});

export const GAME_STATUS = {
  NOT_STARTED: "not_started",
  PLAYING: "playing",
  FINISHED: "finished",
};

export const gameStatus = signal(GAME_STATUS.NOT_STARTED);

// --- Private Helper Functions ---

function findNextQuestionIndex(startIndex = 0) {
  const questions = questionsSignal.value;
  const totalQuestions = questions.length;

  // Search from startIndex to the end of the array
  for (let i = startIndex; i < totalQuestions; i++) {
    const question = questions[i];
    if (
      question.pregunta.status === LETTER_STATUS.UNANSWERED ||
      question.pregunta.status === LETTER_STATUS.SKIPPED
    ) {
      return i;
    }
  }

  // Search from the beginning of the array to startIndex
  for (let i = 0; i < startIndex; i++) {
    const question = questions[i];
    if (
      question.pregunta.status === LETTER_STATUS.UNANSWERED ||
      question.pregunta.status === LETTER_STATUS.SKIPPED
    ) {
      return i;
    }
  }

  // No more questions to answer
  return -1;
}

// --- Game Logic Functions ---

export function startGame() {
  // Reset statuses
  questionsSignal.value = questionsSignal.value.map((q) => ({
    ...q,
    pregunta: { ...q.pregunta, status: LETTER_STATUS.UNANSWERED },
  }));
  currentQuestionIndex.value = 0;
  time.value = TIMER_SECONDS;
  gameStatus.value = GAME_STATUS.PLAYING;
  startTimer();
}

function processTurn(newStatus) {
  const newQuestions = [...questionsSignal.value];
  newQuestions[currentQuestionIndex.value].pregunta.status = newStatus;
  questionsSignal.value = newQuestions;

  const nextIndex = findNextQuestionIndex(currentQuestionIndex.value + 1);

  if (nextIndex === -1) {
    gameStatus.value = GAME_STATUS.FINISHED;
    stopTimer();
  } else {
    currentQuestionIndex.value = nextIndex;
  }
}

export function submitAnswer(answer) {
  const currentQuestion = questionsSignal.value[currentQuestionIndex.value];
  const correctAnswersArray = currentQuestion.pregunta.respuesta.split(",");

  if (checkAnswer(answer, correctAnswersArray)) {
    processTurn(LETTER_STATUS.CORRECT);
  } else {
    processTurn(LETTER_STATUS.INCORRECT);
  }
}

export function skipQuestion() {
  processTurn(LETTER_STATUS.SKIPPED);
}

export function resetGame() {
  // Detener el timer si está corriendo
  stopTimer();

  // Seleccionar nuevas preguntas aleatorias
  questionsSignal.value = selectRandomQuestions(allQuestions);

  // Reset de todos los signals
  currentQuestionIndex.value = 0;
  time.value = TIMER_SECONDS;
  gameStatus.value = GAME_STATUS.NOT_STARTED;
}
